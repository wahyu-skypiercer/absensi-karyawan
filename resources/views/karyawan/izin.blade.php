@extends('layouts.app')

@section('title', 'Izin & Cuti - Absensi Karyawan')

@push('scripts')
<script>
    window.__PAGE__ = 'karyawan-izin';
    window.__DATA__ = {
        izins: @json($izins),
        csrfToken: @json(csrf_token()),
        storeUrl: @json(route('karyawan.izin.store'))
    };
</script>
@endpush