<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Absensi Karyawan')</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-gray-100 min-h-screen">
    @auth
    <nav class="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
        <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <span class="text-xl font-bold text-blue-600">📋 Absensi</span>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="text-sm text-gray-600">
                        {{ auth()->user()->name }}
                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium {{ auth()->user()->isAdmin() ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800' }}">
                            {{ ucfirst(auth()->user()->role) }}
                        </span>
                    </span>
                    <form method="POST" action="{{ route('logout') }}" class="inline">
                        @csrf
                        <button type="submit" class="text-sm text-red-600 hover:text-red-800 font-medium">
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </nav>

    <div class="flex pt-16">
        <!-- Sidebar -->
        <aside class="w-64 bg-white shadow-sm min-h-screen border-r border-gray-200 fixed top-16 left-0 bottom-0 overflow-y-auto z-20">
            <nav class="mt-4 px-4">
                @if(auth()->user()->isAdmin())
                    <p class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Menu Utama</p>
                    <a href="{{ route('admin.dashboard') }}"
                       class="flex items-center px-4 py-3 mb-1 rounded-lg text-sm font-medium {{ request()->routeIs('admin.dashboard') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50' }}">
                        📊 Dashboard
                    </a>

                    <p class="px-4 py-2 mt-3 text-xs font-semibold text-gray-400 uppercase">Manajemen</p>
                    <a href="{{ route('admin.users.index') }}"
                       class="flex items-center px-4 py-3 mb-1 rounded-lg text-sm font-medium {{ request()->routeIs('admin.users.*') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50' }}">
                        🔑 Akun
                    </a>
                    <a href="{{ route('admin.karyawan.index') }}"
                       class="flex items-center px-4 py-3 mb-1 rounded-lg text-sm font-medium {{ request()->routeIs('admin.karyawan.*') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50' }}">
                        👥 Karyawan
                    </a>
                    <a href="{{ route('admin.shift.index') }}"
                       class="flex items-center px-4 py-3 mb-1 rounded-lg text-sm font-medium {{ request()->routeIs('admin.shift.*') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50' }}">
                        🕐 Shift
                    </a>

                    <p class="px-4 py-2 mt-3 text-xs font-semibold text-gray-400 uppercase">Kehadiran</p>
                    <a href="{{ route('admin.absensi.index') }}"
                       class="flex items-center px-4 py-3 mb-1 rounded-lg text-sm font-medium {{ request()->routeIs('admin.absensi.*') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50' }}">
                        ✅ Absensi
                    </a>
                    <a href="{{ route('admin.izin.index') }}"
                       class="flex items-center px-4 py-3 mb-1 rounded-lg text-sm font-medium {{ request()->routeIs('admin.izin.*') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50' }}">
                        📝 Izin & Cuti
                    </a>
                    <a href="{{ route('admin.laporan.index') }}"
                       class="flex items-center px-4 py-3 mb-1 rounded-lg text-sm font-medium {{ request()->routeIs('admin.laporan.*') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50' }}">
                        📄 Laporan
                    </a>
                @else
                    <p class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Menu</p>
                    <a href="{{ route('karyawan.dashboard') }}"
                       class="flex items-center px-4 py-3 mb-1 rounded-lg text-sm font-medium {{ request()->routeIs('karyawan.dashboard') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50' }}">
                        📊 Dashboard
                    </a>
                    <a href="{{ route('karyawan.izin.index') }}"
                       class="flex items-center px-4 py-3 mb-1 rounded-lg text-sm font-medium {{ request()->routeIs('karyawan.izin.*') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50' }}">
                        📝 Izin & Cuti
                    </a>
                @endif
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 p-6 ml-64">
            @if(session('success'))
                <div class="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                    {{ session('success') }}
                </div>
            @endif

            @if($errors->any())
                <div class="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    <ul class="list-disc list-inside">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <div id="app"></div>

            @stack('scripts')
        </main>
    </div>
    @endauth

    @guest
        @yield('content')
    @endguest
</body>
</html>