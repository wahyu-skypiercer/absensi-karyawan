<?php

namespace App\Http\Controllers;

use App\Http\Requests\IzinRequest;
use App\Models\Absensi;
use App\Models\Izin;
use Carbon\Carbon;
use Illuminate\Http\Request;

class IzinController extends Controller
{
    // Admin: list all izin
    public function index(Request $request)
    {
        $query = Izin::with('karyawan.user');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $izins = $query->orderBy('created_at', 'desc')->get()->map(function ($i) {
            return [
                'id' => $i->id,
                'nama' => $i->karyawan->user->name ?? '-',
                'nip' => $i->karyawan->nip ?? '-',
                'tipe' => $i->tipe,
                'tanggal' => $i->tanggal->format('Y-m-d'),
                'alasan' => $i->alasan,
                'status' => $i->status,
            ];
        });

        $filterStatus = $request->status;

        return view('admin.izin', compact('izins', 'filterStatus'));
    }

    public function approve($id)
    {
        $izin = Izin::findOrFail($id);
        $izin->update(['status' => 'disetujui']);

        // Create absensi record with status 'izin' for that date
        $existing = Absensi::where('karyawan_id', $izin->karyawan_id)
            ->whereDate('tanggal', $izin->tanggal)
            ->first();

        if (!$existing) {
            $karyawan = $izin->karyawan;
            Absensi::create([
                'karyawan_id' => $izin->karyawan_id,
                'shift_id' => $karyawan->shift_id,
                'tanggal' => $izin->tanggal,
                'status' => 'izin',
            ]);
        }

        return redirect()->route('admin.izin.index')->with('success', 'Izin disetujui.');
    }

    public function reject($id)
    {
        $izin = Izin::findOrFail($id);
        $izin->update(['status' => 'ditolak']);

        return redirect()->route('admin.izin.index')->with('success', 'Izin ditolak.');
    }

    // Karyawan: list own izin
    public function karyawanIndex()
    {
        $user = auth()->user();
        $karyawan = $user->karyawan;

        $izins = [];
        if ($karyawan) {
            $izins = Izin::where('karyawan_id', $karyawan->id)
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($i) {
                    return [
                        'id' => $i->id,
                        'tipe' => $i->tipe,
                        'tanggal' => $i->tanggal->format('Y-m-d'),
                        'alasan' => $i->alasan,
                        'status' => $i->status,
                    ];
                });
        }

        return view('karyawan.izin', compact('izins'));
    }

    public function karyawanStore(IzinRequest $request)
    {
        $user = auth()->user();
        $karyawan = $user->karyawan;

        if (!$karyawan) {
            return back()->withErrors(['error' => 'Data karyawan tidak ditemukan.']);
        }

        // Check if already submitted for that date
        $existing = Izin::where('karyawan_id', $karyawan->id)
            ->whereDate('tanggal', $request->tanggal)
            ->first();

        if ($existing) {
            return back()->withErrors(['error' => 'Anda sudah mengajukan izin untuk tanggal tersebut.']);
        }

        Izin::create([
            'karyawan_id' => $karyawan->id,
            'tipe' => $request->tipe,
            'tanggal' => $request->tanggal,
            'alasan' => $request->alasan,
        ]);

        return back()->with('success', 'Pengajuan izin berhasil dikirim.');
    }
}