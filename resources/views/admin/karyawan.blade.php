@extends('layouts.app')

@section('title', 'Master Karyawan - Absensi Karyawan')

@push('scripts')
<script>
    window.__PAGE__ = 'admin-karyawan';
    window.__DATA__ = {
        karyawans: @json($data),
        shifts: @json($shifts),
        csrfToken: @json(csrf_token()),
        storeUrl: @json(route('admin.karyawan.store')),
        updateUrlBase: @json(url('/dashboard/admin/karyawan')),
        deleteUrlBase: @json(url('/dashboard/admin/karyawan'))
    };
</script>
@endpush