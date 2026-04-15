<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShiftRequest;
use App\Models\Shift;
use Illuminate\Http\Request;

class ShiftController extends Controller
{
    public function index()
    {
        $shifts = Shift::withCount('karyawans')->orderBy('created_at', 'desc')->get()->map(function ($s) {
            return [
                'id' => $s->id,
                'nama_shift' => $s->nama_shift,
                'jam_masuk' => $s->jam_masuk,
                'jam_pulang' => $s->jam_pulang,
                'jumlah_karyawan' => $s->karyawans_count,
            ];
        });

        return view('admin.shift', compact('shifts'));
    }

    public function store(ShiftRequest $request)
    {
        Shift::create([
            'nama_shift' => $request->nama_shift,
            'jam_masuk' => $request->jam_masuk,
            'jam_pulang' => $request->jam_pulang,
        ]);

        return redirect()->route('admin.shift.index')->with('success', 'Shift berhasil ditambahkan.');
    }

    public function update(ShiftRequest $request, $id)
    {
        $shift = Shift::findOrFail($id);
        $shift->update([
            'nama_shift' => $request->nama_shift,
            'jam_masuk' => $request->jam_masuk,
            'jam_pulang' => $request->jam_pulang,
        ]);

        return redirect()->route('admin.shift.index')->with('success', 'Shift berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $shift = Shift::findOrFail($id);

        if ($shift->karyawans()->count() > 0) {
            return back()->withErrors(['error' => 'Shift masih digunakan oleh karyawan.']);
        }

        $shift->delete();

        return redirect()->route('admin.shift.index')->with('success', 'Shift berhasil dihapus.');
    }
}