<?php

namespace Database\Seeders;

use App\Models\Karyawan;
use App\Models\Shift;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Shifts
        $shiftPagi = Shift::create([
            'nama_shift' => 'Pagi',
            'jam_masuk' => '08:00:00',
            'jam_pulang' => '16:00:00',
        ]);

        $shiftSiang = Shift::create([
            'nama_shift' => 'Siang',
            'jam_masuk' => '13:00:00',
            'jam_pulang' => '21:00:00',
        ]);

        $shiftMalam = Shift::create([
            'nama_shift' => 'Malam',
            'jam_masuk' => '21:00:00',
            'jam_pulang' => '05:00:00',
        ]);

        // Admin
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        // Karyawan 1
        $userBudi = User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'karyawan',
            'is_active' => true,
        ]);

        Karyawan::create([
            'user_id' => $userBudi->id,
            'shift_id' => $shiftPagi->id,
            'nip' => 'KRY-001',
            'jabatan' => 'Staff IT',
            'departemen' => 'IT',
            'no_telepon' => '081234567890',
            'alamat' => 'Jl. Merdeka No. 10, Jakarta',
        ]);

        // Karyawan 2
        $userSiti = User::create([
            'name' => 'Siti Rahayu',
            'email' => 'siti@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'karyawan',
            'is_active' => true,
        ]);

        Karyawan::create([
            'user_id' => $userSiti->id,
            'shift_id' => $shiftSiang->id,
            'nip' => 'KRY-002',
            'jabatan' => 'Staff HRD',
            'departemen' => 'HRD',
            'no_telepon' => '081298765432',
            'alamat' => 'Jl. Sudirman No. 25, Jakarta',
        ]);
    }
}