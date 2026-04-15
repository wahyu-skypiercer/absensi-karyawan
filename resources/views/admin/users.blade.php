@extends('layouts.app')

@section('title', 'Manajemen Akun - Absensi Karyawan')

@push('scripts')
<script>
    window.__PAGE__ = 'admin-users';
    window.__DATA__ = {
        users: @json($users),
        csrfToken: @json(csrf_token()),
        storeUrl: @json(route('admin.users.store')),
        updateUrlBase: @json(url('/dashboard/admin/users')),
        deleteUrlBase: @json(url('/dashboard/admin/users'))
    };
</script>
@endpush