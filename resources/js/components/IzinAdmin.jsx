import React, { useState } from 'react';

export default function IzinAdmin({ izins = [], filterStatus = '', csrfToken, filterUrl, approveUrlBase, rejectUrlBase }) {
    const [statusFilter, setStatusFilter] = useState(filterStatus || '');

    const handleFilter = (val) => {
        setStatusFilter(val);
        if (val) {
            window.location.href = filterUrl + '?status=' + val;
        } else {
            window.location.href = filterUrl;
        }
    };

    const statusStyles = {
        pending: 'bg-yellow-100 text-yellow-800',
        disetujui: 'bg-green-100 text-green-800',
        ditolak: 'bg-red-100 text-red-800',
    };

    const tipeStyles = {
        izin: 'bg-blue-100 text-blue-800',
        cuti: 'bg-purple-100 text-purple-800',
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Izin dan Cuti</h1>
                <p className="text-gray-500 text-sm">Kelola pengajuan izin dan cuti karyawan</p>
            </div>

            <div className="flex space-x-2 mb-6">
                {['', 'pending', 'disetujui', 'ditolak'].map((val) => (
                    <button key={val} onClick={() => handleFilter(val)}
                        className={'px-4 py-2 rounded-lg text-sm font-medium transition ' +
                            (statusFilter === val ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50')}>
                        {val === '' ? 'Semua' : val.charAt(0).toUpperCase() + val.slice(1)}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIP</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipe</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alasan</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {izins.length === 0 ? (
                                <tr><td colSpan="8" className="px-4 py-8 text-center text-gray-400">Tidak ada data.</td></tr>
                            ) : izins.map((item, i) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-600">{i + 1}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.nama}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{item.nip}</td>
                                    <td className="px-4 py-3">
                                        <span className={'inline-flex px-2 py-1 text-xs font-semibold rounded-full ' + (tipeStyles[item.tipe] || '')}>
                                            {item.tipe.charAt(0).toUpperCase() + item.tipe.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{item.tanggal}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{item.alasan}</td>
                                    <td className="px-4 py-3">
                                        <span className={'inline-flex px-2 py-1 text-xs font-semibold rounded-full ' + (statusStyles[item.status] || '')}>
                                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.status === 'pending' ? (
                                            <div className="flex space-x-2">
                                                <form method="POST" action={approveUrlBase + '/' + item.id + '/approve'}>
                                                    <input type="hidden" name="_token" value={csrfToken} />
                                                    <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded text-xs font-medium hover:bg-green-600 transition">
                                                        Setujui
                                                    </button>
                                                </form>
                                                <form method="POST" action={rejectUrlBase + '/' + item.id + '/reject'}>
                                                    <input type="hidden" name="_token" value={csrfToken} />
                                                    <button type="submit" className="bg-red-500 text-white px-3 py-1 rounded text-xs font-medium hover:bg-red-600 transition">
                                                        Tolak
                                                    </button>
                                                </form>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400">-</span>
                                        )}
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