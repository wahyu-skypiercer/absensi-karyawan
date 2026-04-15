<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('user');

        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'role' => ['required', 'in:admin,karyawan'],
            'is_active' => ['nullable', 'boolean'],
        ];

        if ($this->isMethod('POST')) {
            $rules['email'][] = 'unique:users,email';
            $rules['password'] = ['required', 'string', 'min:6'];
        }

        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules['email'][] = Rule::unique('users', 'email')->ignore($userId);
            $rules['password'] = ['nullable', 'string', 'min:6'];
        }

        return $rules;
    }
}