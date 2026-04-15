import React, { useState } from 'react';

export default function LaporanPage({ absensis = [], filters = {}, shifts = [], summary = {}, filterUrl }) {
    const [tipe, setTipe] = useState(filters.tipe || 'harian');
    const [tanggal, setTanggal] = useState(filters.tanggal || new Date().toISOString().split('T')[0]);
    const [bulan, setBulan] = useState(filters.bulan || new Date().toISOString().slice(0, 7));
    const [shiftId, setShiftId] = useState(filters.shift_id || '');

    const handleFilter = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('tipe', tipe);
        if (tipe === 'harian') {
            params.append('tanggal', tanggal);
        } else {
            params.append('bulan', bulan);
        }
        if (shiftId) params.append('shift_id', shiftId);
        window.location.href = filterUrl + '?' + params.toString();
    };

    const handlePrint = () => {
        const params = new URLSearchParams();
        params.append('tipe', tipe);
        params.append('print', '1');
        if (tipe === 'harian') {
            params.append('tanggal', tanggal);
        } else {
            params.append('bulan', bulan);
        }
        if (shiftId) params.append('shift_id', shiftId);
        window.open(filterUrl + '?' + params.toString(), '_blank');
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
                    <h1 className="text-2xl font-bold text-gray-800">Laporan Absensi</h1>
                    <p className="text-gray-500 text-sm">Laporan harian, bulanan, dan per shift</p>
                </div>
                <button onClick={handlePrint}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium">
                    Cetak Laporan
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <form onSubmit={handleFilter} className="flex flex-wrap items-end gap-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Tipe Laporan</label>
                        <select value={tipe} onChange={(e) => setTipe(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="harian">Harian</option>
                            <option value="bulanan">Bulanan</option>
                        </select>
                    </div>

                    {tipe === 'harian' ? (
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Tanggal</label>
                            <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    ) : (
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Bulan</label>
                            <input type="month" value={bulan} onChange={(e) => setBulan(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Shift</label>
                        <select value={shiftId} onChange={(e) => setShiftId(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="">Semua Shift</option>
                            {shifts.map(s => (
                                <option key={s.id} value={s.id}>{s.nama_shift}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                        Tampilkan
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-2xl font-bold text-gray-800">{summary.total || 0}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                    <p className="text-sm text-gray-500">Hadir</p>
                    <p className="text-2xl font-bold text-green-600">{summary.hadir || 0}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                    <p className="text-sm text-gray-500">Telat</p>
                    <p className="text-2xl font-bold text-yellow-600">{summary.telat || 0}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                    <p className="text-sm text-gray-500">Alpha</p>
                    <p className="text-2xl font-bold text-red-600">{summary.alpha || 0}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                    <p className="text-sm text-gray-500">Izin</p>
                    <p className="text-2xl font-bold text-blue-600">{summary.izin || 0}</p>
                </div>
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
                                <tr><td colSpan="8" className="px-4 py-8 text-center text-gray-400">Tidak ada data.</td></tr>
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