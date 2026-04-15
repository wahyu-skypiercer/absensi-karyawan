<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Login - Absensi Karyawan</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-gray-100 min-h-screen">
    <div id="app"></div>

    <script>
        window.__PAGE__ = 'login';
        window.__DATA__ = {
            errors: @json($errors->toArray()),
            oldEmail: @json(old('email', '')),
            csrfToken: @json(csrf_token()),
            loginUrl: @json(route('login.process'))
        };
    </script>
</body>
</html>