<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Karyawan extends Model
{
    protected $fillable = [
        'user_id',
        'shift_id',
        'nip',
        'jabatan',
        'departemen',
        'no_telepon',
        'alamat',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }

    public function absensis()
    {
        return $this->hasMany(Absensi::class);
    }

    public function izins()
    {
        return $this->hasMany(Izin::class);
    }
}