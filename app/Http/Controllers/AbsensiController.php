<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Karyawan;
use App\Models\Shift;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AbsensiController extends Controller
{
    public function index(Request $request)
    {
        $query = Absensi::with('karyawan.user', 'shift');

        if ($request->filled('tanggal_dari')) {
            $query->whereDate('tanggal', '>=', $request->tanggal_dari);
        }

        if ($request->filled('tanggal_sampai')) {
            $query->whereDate('tanggal', '<=', $request->tanggal_sampai);
        }

        if ($request->filled('karyawan_id')) {
            $query->where('karyawan_id', $request->karyawan_id);
        }

        if ($request->filled('shift_id')) {
            $query->where('shift_id', $request->shift_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $absensis = $query->orderBy('tanggal', 'desc')->orderBy('created_at', 'desc')->get();

        $data = $absensis->map(function ($a) {
            return [
                'id' => $a->id,
                'nama' => $a->karyawan->user->name ?? '-',
                'nip' => $a->karyawan->nip ?? '-',
                'shift' => $a->shift->nama_shift ?? '-',
                'tanggal' => $a->tanggal->format('Y-m-d'),
                'jam_masuk' => $a->jam_masuk,
                'jam_pulang' => $a->jam_pulang,
                'status' => $a->status,
            ];
        });

        $karyawans = Karyawan::with('user')->get()->map(function ($k) {
            return ['id' => $k->id, 'name' => $k->user->name];
        });

        $shifts = Shift::all()->map(function ($s) {
            return ['id' => $s->id, 'nama_shift' => $s->nama_shift];
        });

        // Belum absen hari ini
        $today = Carbon::today();
        $sudahAbsenIds = Absensi::whereDate('tanggal', $today)->pluck('karyawan_id')->toArray();
        $belumAbsen = Karyawan::with('user', 'shift')
            ->whereNotIn('id', $sudahAbsenIds)
            ->get()
            ->map(function ($k) {
                return [
                    'nama' => $k->user->name,
                    'nip' => $k->nip,
                    'shift' => $k->shift->nama_shift ?? '-',
                ];
            });

        $filters = [
            'tanggal_dari' => $request->tanggal_dari,
            'tanggal_sampai' => $request->tanggal_sampai,
            'karyawan_id' => $request->karyawan_id,
            'shift_id' => $request->shift_id,
            'status' => $request->status,
        ];

        return view('admin.absensi', compact('data', 'karyawans', 'shifts', 'belumAbsen', 'filters'));
    }

    public function absenMasuk(Request $request)
    {
        $user = auth()->user();
        $karyawan = $user->karyawan;

        if (!$karyawan) {
            return back()->withErrors(['error' => 'Data karyawan tidak ditemukan.']);
        }

        $today = Carbon::today();
        $now = Carbon::now();

        $existing = Absensi::where('karyawan_id', $karyawan->id)
            ->whereDate('tanggal', $today)
            ->first();

        if ($existing) {
            return back()->withErrors(['error' => 'Anda sudah melakukan absen masuk hari ini.']);
        }

        // Check shift time - if past 30 min after shift start, mark as alpha
        $shift = $karyawan->shift;
        $status = 'hadir';

        if ($shift) {
            $shiftMasuk = Carbon::createFromFormat('H:i:s', $shift->jam_masuk);
            $batasAlpha = $shiftMasuk->copy()->addMinutes(30);

            if ($now->greaterThan($batasAlpha)) {
                // Alpha - cannot attend
                Absensi::create([
                    'karyawan_id' => $karyawan->id,
                    'shift_id' => $shift->id,
                    'tanggal' => $today,
                    'status' => 'alpha',
                ]);
                return back()->withErrors(['error' => 'ANDA TERLAMBAT (ALPHA). Anda tidak bisa absen karena sudah melewati batas waktu shift.']);
            }

            if ($now->greaterThan($shiftMasuk)) {
                $status = 'telat';
            }
        }

        Absensi::create([
            'karyawan_id' => $karyawan->id,
            'shift_id' => $shift ? $shift->id : null,
            'tanggal' => $today,
            'jam_masuk' => $now->format('H:i:s'),
            'status' => $status,
        ]);

        return back()->with('success', 'Absen masuk berhasil dicatat. Status: ' . ucfirst($status));
    }

    public function absenPulang(Request $request)
    {
        $user = auth()->user();
        $karyawan = $user->karyawan;

        if (!$karyawan) {
            return back()->withErrors(['error' => 'Data karyawan tidak ditemukan.']);
        }

        $today = Carbon::today();
        $now = Carbon::now();

        $absensi = Absensi::where('karyawan_id', $karyawan->id)
            ->whereDate('tanggal', $today)
            ->first();

        if (!$absensi) {
            return back()->withErrors(['error' => 'Anda belum melakukan absen masuk hari ini.']);
        }

        if ($absensi->status === 'alpha') {
            return back()->withErrors(['error' => 'Anda tidak bisa absen pulang karena status ALPHA.']);
        }

        if ($absensi->jam_pulang) {
            return back()->withErrors(['error' => 'Anda sudah melakukan absen pulang hari ini.']);
        }

        $absensi->update([
            'jam_pulang' => $now->format('H:i:s'),
        ]);

        return back()->with('success', 'Absen pulang berhasil dicatat.');
    }
}