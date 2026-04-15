@extends('layouts.app')

@section('title', 'Manajemen Shift - Absensi Karyawan')

@push('scripts')
<script>
    window.__PAGE__ = 'admin-shift';
    window.__DATA__ = {
        shifts: @json($shifts),
        csrfToken: @json(csrf_token()),
        storeUrl: @json(route('admin.shift.store')),
        updateUrlBase: @json(url('/dashboard/admin/shift')),
        deleteUrlBase: @json(url('/dashboard/admin/shift'))
    };
</script>
@endpush