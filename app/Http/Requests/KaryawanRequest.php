<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class KaryawanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $karyawanId = $this->route('karyawan');

        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'nip' => ['required', 'string', 'max:50'],
            'jabatan' => ['nullable', 'string', 'max:255'],
            'departemen' => ['nullable', 'string', 'max:255'],
            'no_telepon' => ['nullable', 'string', 'max:20'],
            'alamat' => ['nullable', 'string'],
            'shift_id' => ['nullable', 'exists:shifts,id'],
        ];

        if ($this->isMethod('POST')) {
            $rules['email'][] = 'unique:users,email';
            $rules['nip'][] = 'unique:karyawans,nip';
            $rules['password'] = ['required', 'string', 'min:6'];
        }

        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $karyawan = \App\Models\Karyawan::findOrFail($karyawanId);
            $rules['email'][] = Rule::unique('users', 'email')->ignore($karyawan->user_id);
            $rules['nip'][] = Rule::unique('karyawans', 'nip')->ignore($karyawanId);
            $rules['password'] = ['nullable', 'string', 'min:6'];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.unique' => 'Email sudah digunakan.',
            'nip.required' => 'NIP wajib diisi.',
            'nip.unique' => 'NIP sudah digunakan.',
            'password.required' => 'Password wajib diisi.',
            'password.min' => 'Password minimal 6 karakter.',
        ];
    }
}