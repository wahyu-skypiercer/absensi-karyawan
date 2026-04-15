<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IzinRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tipe' => ['required', 'in:izin,cuti'],
            'tanggal' => ['required', 'date'],
            'alasan' => ['required', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'tipe.required' => 'Tipe izin wajib dipilih.',
            'tipe.in' => 'Tipe harus izin atau cuti.',
            'tanggal.required' => 'Tanggal wajib diisi.',
            'alasan.required' => 'Alasan wajib diisi.',
        ];
    }
}