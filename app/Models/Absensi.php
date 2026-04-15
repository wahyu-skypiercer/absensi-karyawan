<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Absensi extends Model
{
    protected $table = 'absensis';

    protected $fillable = [
        'karyawan_id',
        'shift_id',
        'tanggal',
        'jam_masuk',
        'jam_pulang',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'tanggal' => 'date',
        ];
    }

    public function karyawan()
    {
        return $this->belongsTo(Karyawan::class);
    }

    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }
}