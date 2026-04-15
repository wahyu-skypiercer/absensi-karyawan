<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Shift;
use Carbon\Carbon;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    public function index(Request $request)
    {
        $tipe = $request->get('tipe', 'harian');
        $tanggal = $request->get('tanggal', Carbon::today()->format('Y-m-d'));
        $bulan = $request->get('bulan', Carbon::today()->format('Y-m'));
        $shiftId = $request->get('shift_id');

        $query = Absensi::with('karyawan.user', 'shift');

        if ($tipe === 'harian') {
            $query->whereDate('tanggal', $tanggal);
        } elseif ($tipe === 'bulanan') {
            $startOfMonth = Carbon::parse($bulan . '-01')->startOfMonth();
            $endOfMonth = Carbon::parse($bulan . '-01')->endOfMonth();
            $query->whereBetween('tanggal', [$startOfMonth, $endOfMonth]);
        }

        if ($shiftId) {
            $query->where('shift_id', $shiftId);
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

        $shifts = Shift::all()->map(function ($s) {
            return ['id' => $s->id, 'nama_shift' => $s->nama_shift];
        });

        $filters = [
            'tipe' => $tipe,
            'tanggal' => $tanggal,
            'bulan' => $bulan,
            'shift_id' => $shiftId,
        ];

        // Summary
        $summary = [
            'total' => $absensis->count(),
            'hadir' => $absensis->where('status', 'hadir')->count(),
            'telat' => $absensis->where('status', 'telat')->count(),
            'alpha' => $absensis->where('status', 'alpha')->count(),
            'izin' => $absensis->where('status', 'izin')->count(),
        ];

        $isPrint = $request->boolean('print');

        if ($isPrint) {
            return view('admin.laporan-print', compact('data', 'filters', 'summary'));
        }

        return view('admin.laporan', compact('data', 'filters', 'shifts', 'summary'));
    }
}