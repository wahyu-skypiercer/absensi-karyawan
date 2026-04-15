<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    protected $fillable = [
        'nama_shift',
        'jam_masuk',
        'jam_pulang',
    ];

    public function karyawans()
    {
        return $this->hasMany(Karyawan::class);
    }

    public function absensis()
    {
        return $this->hasMany(Absensi::class);
    }
}