<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Izin;
use App\Models\Karyawan;
use App\Models\Shift;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function admin()
    {
        $today = Carbon::today();

        $totalKaryawan = Karyawan::count();
        $absensiHariIni = Absensi::whereDate('tanggal', $today)->get();
        $totalAbsensiHariIni = $absensiHariIni->count();
        $hadirHariIni = $absensiHariIni->where('status', 'hadir')->count();
        $telatHariIni = $absensiHariIni->where('status', 'telat')->count();
        $alphaHariIni = $absensiHariIni->where('status', 'alpha')->count();
        $izinHariIni = $absensiHariIni->where('status', 'izin')->count();

        // Pie chart data
        $pieData = [
            'hadir' => $hadirHariIni,
            'telat' => $telatHariIni,
            'alpha' => $alphaHariIni,
            'izin' => $izinHariIni,
        ];

        // Bar chart - 7 hari terakhir
        $barData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $dayAbsensi = Absensi::whereDate('tanggal', $date)->get();
            $barData[] = [
                'tanggal' => $date->format('d/m'),
                'hadir' => $dayAbsensi->where('status', 'hadir')->count(),
                'telat' => $dayAbsensi->where('status', 'telat')->count(),
                'alpha' => $dayAbsensi->where('status', 'alpha')->count(),
                'izin' => $dayAbsensi->where('status', 'izin')->count(),
            ];
        }

        // Per shift chart
        $shifts = Shift::withCount('karyawans')->get();
        $shiftData = $shifts->map(function ($shift) use ($today) {
            $hadirShift = Absensi::where('shift_id', $shift->id)
                ->whereDate('tanggal', $today)
                ->whereIn('status', ['hadir', 'telat'])
                ->count();
            return [
                'nama' => $shift->nama_shift,
                'total_karyawan' => $shift->karyawans_count,
                'hadir' => $hadirShift,
            ];
        });

        // Absensi terbaru
        $absensiTerbaru = Absensi::with('karyawan.user', 'shift')
            ->whereDate('tanggal', $today)
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($a) {
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

        // Pending izin count
        $pendingIzin = Izin::where('status', 'pending')->count();

        $data = [
            'totalKaryawan' => $totalKaryawan,
            'totalAbsensiHariIni' => $totalAbsensiHariIni,
            'hadirHariIni' => $hadirHariIni,
            'telatHariIni' => $telatHariIni,
            'alphaHariIni' => $alphaHariIni,
            'izinHariIni' => $izinHariIni,
            'pieData' => $pieData,
            'barData' => $barData,
            'shiftData' => $shiftData,
            'absensiTerbaru' => $absensiTerbaru,
            'pendingIzin' => $pendingIzin,
        ];

        return view('admin.dashboard', compact('data'));
    }

    public function karyawan()
    {
        $user = auth()->user();
        $karyawan = $user->karyawan;

        $absensiHariIni = null;
        $shiftHariIni = null;

        if ($karyawan) {
            $absensiHariIni = Absensi::where('karyawan_id', $karyawan->id)
                ->whereDate('tanggal', Carbon::today())
                ->first();

            if ($karyawan->shift) {
                $shiftHariIni = [
                    'nama' => $karyawan->shift->nama_shift,
                    'jam_masuk' => $karyawan->shift->jam_masuk,
                    'jam_pulang' => $karyawan->shift->jam_pulang,
                ];
            }
        }

        // Check if alpha (past shift time and no absensi)
        $isAlpha = false;
        if ($karyawan && $karyawan->shift && !$absensiHariIni) {
            $now = Carbon::now();
            $shiftMasuk = Carbon::createFromFormat('H:i:s', $karyawan->shift->jam_masuk);
            if ($now->greaterThan($shiftMasuk->copy()->addMinutes(30))) {
                $isAlpha = true;
            }
        }

        $data = [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'karyawan' => $karyawan ? [
                'nip' => $karyawan->nip,
                'jabatan' => $karyawan->jabatan,
                'departemen' => $karyawan->departemen,
                'no_telepon' => $karyawan->no_telepon,
                'alamat' => $karyawan->alamat,
            ] : null,
            'shiftHariIni' => $shiftHariIni,
            'absensiHariIni' => $absensiHariIni ? [
                'tanggal' => $absensiHariIni->tanggal->format('Y-m-d'),
                'jam_masuk' => $absensiHariIni->jam_masuk,
                'jam_pulang' => $absensiHariIni->jam_pulang,
                'status' => $absensiHariIni->status,
            ] : null,
            'isAlpha' => $isAlpha,
        ];

        return view('karyawan.dashboard', compact('data'));
    }
}