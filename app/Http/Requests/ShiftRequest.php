<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShiftRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama_shift' => ['required', 'string', 'max:255'],
            'jam_masuk' => ['required', 'date_format:H:i'],
            'jam_pulang' => ['required', 'date_format:H:i'],
        ];
    }

    public function messages(): array
    {
        return [
            'nama_shift.required' => 'Nama shift wajib diisi.',
            'jam_masuk.required' => 'Jam masuk wajib diisi.',
            'jam_masuk.date_format' => 'Format jam masuk harus HH:MM.',
            'jam_pulang.required' => 'Jam pulang wajib diisi.',
            'jam_pulang.date_format' => 'Format jam pulang harus HH:MM.',
        ];
    }
}