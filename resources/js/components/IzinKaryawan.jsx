import React, { useState } from 'react';

export default function IzinKaryawan({ izins = [], csrfToken, storeUrl }) {
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ tipe: 'izin', tanggal: '', alasan: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const resetForm = () => {
        setForm({ tipe: 'izin', tanggal: '', alasan: '' });
        setShowForm(false);
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
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Izin dan Cuti</h1>
                    <p className="text-gray-500 text-sm">Ajukan izin atau cuti</p>
                </div>
                <button onClick={() => { resetForm(); setShowForm(!showForm); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                    {showForm ? 'Tutup' : '+ Ajukan Izin'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Form Pengajuan</h2>
                    <form method="POST" action={storeUrl}>
                        <input type="hidden" name="_token" value={csrfToken} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe *</label>
                                <select name="tipe" value={form.tipe} onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                                    <option value="izin">Izin</option>
                                    <option value="cuti">Cuti</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal *</label>
                                <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Alasan *</label>
                                <textarea name="alasan" value={form.alasan} onChange={handleChange} rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                    placeholder="Tuliskan alasan izin/cuti Anda..." required />
                            </div>
                        </div>

                        <div className="mt-4 flex space-x-3">
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                                Kirim Pengajuan
                            </button>
                            <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition text-sm font-medium">
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Riwayat Pengajuan</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipe</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alasan</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {izins.length === 0 ? (
                                <tr><td colSpan="5" className="px-4 py-8 text-center text-gray-400">Belum ada pengajuan.</td></tr>
                            ) : izins.map((item, i) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-600">{i + 1}</td>
                                    <td className="px-4 py-3">
                                        <span className={'inline-flex px-2 py-1 text-xs font-semibold rounded-full ' + (tipeStyles[item.tipe] || '')}>
                                            {item.tipe.charAt(0).toUpperCase() + item.tipe.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{item.tanggal}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs">{item.alasan}</td>
                                    <td className="px-4 py-3">
                                        <span className={'inline-flex px-2 py-1 text-xs font-semibold rounded-full ' + (statusStyles[item.status] || '')}>
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