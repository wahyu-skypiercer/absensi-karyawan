@extends('layouts.app')

@section('title', 'Laporan - Absensi Karyawan')

@push('scripts')
<script>
    window.__PAGE__ = 'admin-laporan';
    window.__DATA__ = {
        absensis: @json($data),
        filters: @json($filters),
        shifts: @json($shifts),
        summary: @json($summary),
        filterUrl: @json(route('admin.laporan.index'))
    };
</script>
@endpush