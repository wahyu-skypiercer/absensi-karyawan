@extends('layouts.app')

@section('title', 'Data Absensi - Absensi Karyawan')

@push('scripts')
<script>
    window.__PAGE__ = 'admin-absensi';
    window.__DATA__ = {
        absensis: @json($data),
        karyawans: @json($karyawans),
        shifts: @json($shifts),
        belumAbsen: @json($belumAbsen),
        filters: @json($filters),
        filterUrl: @json(route('admin.absensi.index'))
    };
</script>
@endpush