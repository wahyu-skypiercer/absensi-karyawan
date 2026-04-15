import React, { useState } from 'react';

export default function ShiftPage({ shifts = [], csrfToken, storeUrl, updateUrlBase, deleteUrlBase }) {
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ nama_shift: '', jam_masuk: '', jam_pulang: '' });

    const resetForm = () => {
        setForm({ nama_shift: '', jam_masuk: '', jam_pulang: '' });
        setEditId(null);
        setShowForm(false);
    };

    const handleEdit = (s) => {
        setForm({
            nama_shift: s.nama_shift,
            jam_masuk: s.jam_masuk ? s.jam_masuk.substring(0, 5) : '',
            jam_pulang: s.jam_pulang ? s.jam_pulang.substring(0, 5) : ''
        });
        setEditId(s.id);
        setShowForm(true);
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Shift</h1>
                    <p className="text-gray-500 text-sm">Kelola shift kerja karyawan</p>
                </div>
                <button onClick={() => { resetForm(); setShowForm(!showForm); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                    {showForm ? '✕ Tutup' : '+ Tambah Shift'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">{editId ? 'Edit Shift' : 'Tambah Shift Baru'}</h2>
                    <form method="POST" action={editId ? `${updateUrlBase}/${editId}` : storeUrl}>
                        <input type="hidden" name="_token" value={csrfToken} />
                        {editId && <input type="hidden" name="_method" value="PUT" />}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Shift *</label>
                                <input type="text" name="nama_shift" value={form.nama_shift} onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                    placeholder="Contoh: Pagi" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Masuk *</label>
                                <input type="time" name="jam_masuk" value={form.jam_masuk} onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Pulang *</label>
                                <input type="time" name="jam_pulang" value={form.jam_pulang} onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" required />
                            </div>
                        </div>

                        <div className="mt-4 flex space-x-3">
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                                {editId ? 'Perbarui' : 'Simpan'}
                            </button>
                            <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition text-sm font-medium">
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Shift</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jam Masuk</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jam Pulang</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jumlah Karyawan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {shifts.length === 0 ? (
                                <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-400">Belum ada data shift.</td></tr>
                            ) : shifts.map((s, i) => (
                                <tr key={s.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-600">{i + 1}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{s.nama_shift}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{s.jam_masuk}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{s.jam_pulang}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{s.jumlah_karyawan}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleEdit(s)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                                            <form method="POST" action={`${deleteUrlBase}/${s.id}`}
                                                onSubmit={(e) => { if (!confirm('Yakin hapus shift ini?')) e.preventDefault(); }}>
                                                <input type="hidden" name="_token" value={csrfToken} />
                                                <input type="hidden" name="_method" value="DELETE" />
                                                <button type="submit" className="text-red-600 hover:text-red-800 text-sm font-medium">Hapus</button>
                                            </form>
                                        </div>
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