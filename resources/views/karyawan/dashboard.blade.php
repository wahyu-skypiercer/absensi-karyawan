@extends('layouts.app')

@section('title', 'Dashboard Karyawan - Absensi Karyawan')

@push('scripts')
<script>
    window.__PAGE__ = 'karyawan-dashboard';
    window.__DATA__ = {
        ...@json($data),
        csrfToken: @json(csrf_token()),
        absenMasukUrl: @json(route('karyawan.absen.masuk')),
        absenPulangUrl: @json(route('karyawan.absen.pulang'))
    };
</script>
@endpush