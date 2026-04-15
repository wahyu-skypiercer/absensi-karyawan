import React from 'react';

export default function DashboardKaryawan({ user = {}, karyawan = null, shiftHariIni = null, absensiHariIni = null, isAlpha = false, csrfToken, absenMasukUrl, absenPulangUrl }) {
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const sudahMasuk = absensiHariIni && absensiHariIni.jam_masuk;
    const sudahPulang = absensiHariIni && absensiHariIni.jam_pulang;
    const isAbsensiAlpha = absensiHariIni && absensiHariIni.status === 'alpha';

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Karyawan</h1>
                <p className="text-gray-500 text-sm">{today}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Data Diri</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-gray-500">Nama</p>
                            <p className="text-sm font-medium text-gray-800">{user.name}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="text-sm font-medium text-gray-800">{user.email}</p>
                        </div>
                        {karyawan && (
                            <>
                                <div>
                                    <p className="text-xs text-gray-500">NIP</p>
                                    <p className="text-sm font-medium text-gray-800">{karyawan.nip}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Jabatan</p>
                                    <p className="text-sm font-medium text-gray-800">{karyawan.jabatan || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Departemen</p>
                                    <p className="text-sm font-medium text-gray-800">{karyawan.departemen || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">No. Telepon</p>
                                    <p className="text-sm font-medium text-gray-800">{karyawan.no_telepon || '-'}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Shift Hari Ini</h2>
                    {shiftHariIni ? (
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-blue-50 rounded-lg p-4 text-center">
                                <p className="text-xs text-blue-600 font-medium">Shift</p>
                                <p className="text-sm font-bold text-blue-800 mt-1">{shiftHariIni.nama}</p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4 text-center">
                                <p className="text-xs text-green-600 font-medium">Masuk</p>
                                <p className="text-sm font-bold text-green-800 mt-1">{shiftHariIni.jam_masuk}</p>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-4 text-center">
                                <p className="text-xs text-orange-600 font-medium">Pulang</p>
                                <p className="text-sm font-bold text-orange-800 mt-1">{shiftHariIni.jam_pulang}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400 text-center py-4">Belum ada shift yang ditentukan.</p>
                    )}
                </div>
            </div>

            {/* Alpha Warning */}
            {(isAlpha || isAbsensiAlpha) && (
                <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-xl text-center">
                    <p className="text-red-700 font-bold text-lg">ANDA TERLAMBAT (ALPHA)</p>
                    <p className="text-red-600 text-sm mt-1">Anda tidak bisa melakukan absensi karena sudah melewati batas waktu shift.</p>
                </div>
            )}

            {/* Status Absensi */}
            {absensiHariIni && !isAbsensiAlpha && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Status Absensi Hari Ini</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                            <p className="text-xs text-blue-600 font-medium">Tanggal</p>
                            <p className="text-sm font-bold text-blue-800 mt-1">{absensiHariIni.tanggal}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                            <p className="text-xs text-green-600 font-medium">Jam Masuk</p>
                            <p className="text-sm font-bold text-green-800 mt-1">{absensiHariIni.jam_masuk || '-'}</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-4 text-center">
                            <p className="text-xs text-orange-600 font-medium">Jam Pulang</p>
                            <p className="text-sm font-bold text-orange-800 mt-1">{absensiHariIni.jam_pulang || '-'}</p>
                        </div>
                        <div className={'rounded-lg p-4 text-center ' + (absensiHariIni.status === 'hadir' ? 'bg-green-50' : absensiHariIni.status === 'telat' ? 'bg-yellow-50' : 'bg-red-50')}>
                            <p className={'text-xs font-medium ' + (absensiHariIni.status === 'hadir' ? 'text-green-600' : absensiHariIni.status === 'telat' ? 'text-yellow-600' : 'text-red-600')}>Status</p>
                            <p className={'text-sm font-bold mt-1 ' + (absensiHariIni.status === 'hadir' ? 'text-green-800' : absensiHariIni.status === 'telat' ? 'text-yellow-800' : 'text-red-800')}>
                                {absensiHariIni.status.charAt(0).toUpperCase() + absensiHariIni.status.slice(1)}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Tombol Absensi */}
            {!isAlpha && !isAbsensiAlpha && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                        <div className="text-5xl mb-3">&#x1F7E2;</div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Absen Masuk</h3>
                        <p className="text-sm text-gray-500 mb-4">Catat waktu masuk kerja Anda</p>
                        {sudahMasuk ? (
                            <div className="bg-gray-100 text-gray-500 px-6 py-3 rounded-lg text-sm font-medium">
                                Sudah absen masuk ({absensiHariIni.jam_masuk})
                            </div>
                        ) : (
                            <form method="POST" action={absenMasukUrl}>
                                <input type="hidden" name="_token" value={csrfToken} />
                                <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition text-sm font-semibold w-full">
                                    Absen Masuk Sekarang
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                        <div className="text-5xl mb-3">&#x1F534;</div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Absen Pulang</h3>
                        <p className="text-sm text-gray-500 mb-4">Catat waktu pulang kerja Anda</p>
                        {!sudahMasuk ? (
                            <div className="bg-gray-100 text-gray-500 px-6 py-3 rounded-lg text-sm font-medium">
                                Absen masuk terlebih dahulu
                            </div>
                        ) : sudahPulang ? (
                            <div className="bg-gray-100 text-gray-500 px-6 py-3 rounded-lg text-sm font-medium">
                                Sudah absen pulang ({absensiHariIni.jam_pulang})
                            </div>
                        ) : (
                            <form method="POST" action={absenPulangUrl}>
                                <input type="hidden" name="_token" value={csrfToken} />
                                <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition text-sm font-semibold w-full">
                                    Absen Pulang Sekarang
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}