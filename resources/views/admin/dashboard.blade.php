@extends('layouts.app')

@section('title', 'Dashboard Admin - Absensi Karyawan')

@push('scripts')
<script>
    window.__PAGE__ = 'admin-dashboard';
    window.__DATA__ = @json($data);
</script>
@endpush