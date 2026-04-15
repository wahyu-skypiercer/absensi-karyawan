@extends('layouts.app')

@section('title', 'Izin & Cuti - Absensi Karyawan')

@push('scripts')
<script>
    window.__PAGE__ = 'admin-izin';
    window.__DATA__ = {
        izins: @json($izins),
        filterStatus: @json($filterStatus),
        csrfToken: @json(csrf_token()),
        filterUrl: @json(route('admin.izin.index')),
        approveUrlBase: @json(url('/dashboard/admin/izin')),
        rejectUrlBase: @json(url('/dashboard/admin/izin'))
    };
</script>
@endpush