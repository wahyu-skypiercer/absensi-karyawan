<?php

namespace App\Http\Controllers;

use App\Http\Requests\KaryawanRequest;
use App\Models\Karyawan;
use App\Models\Shift;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class KaryawanController extends Controller
{
    public function index()
    {
        $karyawans = Karyawan::with('user', 'shift')->orderBy('created_at', 'desc')->get();

        $data = $karyawans->map(function ($k) {
            return [
                'id' => $k->id,
                'name' => $k->user->name,
                'email' => $k->user->email,
                'nip' => $k->nip,
                'jabatan' => $k->jabatan,
                'departemen' => $k->departemen,
                'no_telepon' => $k->no_telepon,
                'alamat' => $k->alamat,
                'shift_id' => $k->shift_id,
                'shift_nama' => $k->shift->nama_shift ?? '-',
            ];
        });

        $shifts = Shift::all()->map(function ($s) {
            return ['id' => $s->id, 'nama_shift' => $s->nama_shift];
        });

        return view('admin.karyawan', compact('data', 'shifts'));
    }

    public function store(KaryawanRequest $request)
    {
        DB::beginTransaction();

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'karyawan',
            ]);

            Karyawan::create([
                'user_id' => $user->id,
                'shift_id' => $request->shift_id,
                'nip' => $request->nip,
                'jabatan' => $request->jabatan,
                'departemen' => $request->departemen,
                'no_telepon' => $request->no_telepon,
                'alamat' => $request->alamat,
            ]);

            DB::commit();

            return redirect()->route('admin.karyawan.index')
                ->with('success', 'Karyawan berhasil ditambahkan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal menambahkan karyawan: ' . $e->getMessage()])->withInput();
        }
    }

    public function update(KaryawanRequest $request, $id)
    {
        DB::beginTransaction();

        try {
            $karyawan = Karyawan::findOrFail($id);
            $user = $karyawan->user;

            $userData = [
                'name' => $request->name,
                'email' => $request->email,
            ];

            if ($request->filled('password')) {
                $userData['password'] = Hash::make($request->password);
            }

            $user->update($userData);

            $karyawan->update([
                'shift_id' => $request->shift_id,
                'nip' => $request->nip,
                'jabatan' => $request->jabatan,
                'departemen' => $request->departemen,
                'no_telepon' => $request->no_telepon,
                'alamat' => $request->alamat,
            ]);

            DB::commit();

            return redirect()->route('admin.karyawan.index')
                ->with('success', 'Data karyawan berhasil diperbarui.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal memperbarui data: ' . $e->getMessage()])->withInput();
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();

        try {
            $karyawan = Karyawan::findOrFail($id);
            $user = $karyawan->user;

            $karyawan->delete();
            $user->delete();

            DB::commit();

            return redirect()->route('admin.karyawan.index')
                ->with('success', 'Karyawan berhasil dihapus.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal menghapus karyawan: ' . $e->getMessage()]);
        }
    }
}