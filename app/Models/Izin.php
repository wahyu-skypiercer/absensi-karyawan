<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Izin extends Model
{
    protected $table = 'izins';

    protected $fillable = [
        'karyawan_id',
        'tipe',
        'tanggal',
        'alasan',
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
}