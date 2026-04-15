import React, { useState } from 'react';

export default function AbsensiPage({ absensis = [], karyawans = [], shifts = [], belumAbsen = [], filters = {}, filterUrl }) {
    const [tanggalDari, setTanggalDari] = useState(filters.tanggal_dari || '');
    const [tanggalSampai, setTanggalSampai] = useState(filters.tanggal_sampai || '');
    const [karyawanId, setKaryawanId] = useState(filters.karyawan_id || '');
    const [shiftId, setShiftId] = useState(filters.shift_id || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [showBelumAbsen, setShowBelumAbsen] = useState(false);

    const handleFilter = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (tanggalDari) params.append('tanggal_dari', tanggalDari);
        if (tanggalSampai) params.append('tanggal_sampai', tanggalSampai);
        if (karyawanId) params.append('karyawan_id', karyawanId);
        if (shiftId) params.append('shift_id', shiftId);
        if (statusFilter) params.append('status', statusFilter);
        window.location.href = filterUrl + '?' + params.toString();
    };

    const handleReset = () => {
        window.location.href = filterUrl;
    };

    const statusStyles = {
        hadir: 'bg-green-100 text-green-800',
        telat: 'bg-yellow-100 text-yellow-800',
        alpha: 'bg-red-100 text-red-800',
        izin: 'bg-blue-100 text-blue-800',
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Data Absensi</h1>
                    <p className="text-gray-500 text-sm">Tracking kehadiran karyawan</p>
                </div>
                <button onClick={() => setShowBelumAbsen(!showBelumAbsen)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm font-medium">
                    {showBelumAbsen ? 'Tutup' : 'Belum Absen (' + belumAbsen.length + ')'}
                </button>
            </div>

            {showBelumAbsen && belumAbsen.length > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                    <h3 className="text-sm font-semibold text-orange-800 mb-3">Karyawan Belum Absen Hari Ini</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {belumAbsen.map((k, i) => (
                            <div key={i} className="bg-white rounded-lg p-3 text-sm">
                                <p className="font-medium text-gray-800">{k.nama}</p>
                                <p className="text-gray-500 text-xs">NIP: {k.nip} | Shift: {k.shift}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-3">Filter</h2>
                <form onSubmit={handleFilter} className="flex flex-wrap items-end gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Dari Tanggal</label>
                        <input type="date" value={tanggalDari} onChange={(e) => setTanggalDari(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Sampai Tanggal</label>
                        <input type="date" value={tanggalSampai} onChange={(e) => setTanggalSampai(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Karyawan</label>
                        <select value={karyawanId} onChange={(e) => setKaryawanId(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="">Semua</option>
                            {karyawans.map((k) => (
                                <option key={k.id} value={k.id}>{k.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Shift</label>
                        <select value={shiftId} onChange={(e) => setShiftId(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="">Semua</option>
                            {shifts.map((s) => (
                                <option key={s.id} value={s.id}>{s.nama_shift}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Status</label>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="">Semua</option>
                            <option value="hadir">Hadir</option>
                            <option value="telat">Telat</option>
                            <option value="alpha">Alpha</option>
                            <option value="izin">Izin</option>
                        </select>
                    </div>
                    <div className="flex space-x-2">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                            Filter
                        </button>
                        <button type="button" onClick={handleReset} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm font-medium">
                            Reset
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIP</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Masuk</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pulang</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {absensis.length === 0 ? (
                                <tr><td colSpan="8" className="px-4 py-8 text-center text-gray-400">Tidak ada data absensi.</td></tr>
                            ) : absensis.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.nama}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{item.nip}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{item.shift}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{item.tanggal}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{item.jam_masuk || '-'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{item.jam_pulang || '-'}</td>
                                    <td className="px-4 py-3">
                                        <span className={'inline-flex px-2 py-1 text-xs font-semibold rounded-full ' + (statusStyles[item.status] || 'bg-gray-100 text-gray-800')}>
                                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}