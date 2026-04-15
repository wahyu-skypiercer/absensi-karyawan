import React, { useState } from 'react';

export default function KaryawanPage({ karyawans = [], shifts = [], csrfToken, storeUrl, updateUrlBase, deleteUrlBase }) {
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        name: '', email: '', password: '', nip: '',
        jabatan: '', departemen: '', no_telepon: '', alamat: '', shift_id: ''
    });

    const resetForm = () => {
        setForm({ name: '', email: '', password: '', nip: '', jabatan: '', departemen: '', no_telepon: '', alamat: '', shift_id: '' });
        setEditId(null);
        setShowForm(false);
    };

    const handleEdit = (k) => {
        setForm({
            name: k.name, email: k.email, password: '', nip: k.nip,
            jabatan: k.jabatan || '', departemen: k.departemen || '',
            no_telepon: k.no_telepon || '', alamat: k.alamat || '',
            shift_id: k.shift_id || ''
        });
        setEditId(k.id);
        setShowForm(true);
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Master Karyawan</h1>
                    <p className="text-gray-500 text-sm">Kelola data karyawan</p>
                </div>
                <button onClick={() => { resetForm(); setShowForm(!showForm); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                    {showForm ? '✕ Tutup' : '+ Tambah Karyawan'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">{editId ? 'Edit Karyawan' : 'Tambah Karyawan Baru'}</h2>
                    <form method="POST" action={editId ? `${updateUrlBase}/${editId}` : storeUrl}>
                        <input type="hidden" name="_token" value={csrfToken} />
                        {editId && <input type="hidden" name="_method" value="PUT" />}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama *</label>
                                <input type="text" name="name" value={form.name} onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input type="email" name="email" value={form.email} onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password {editId ? '(kosongkan jika tidak diubah)' : '*'}</label>
                                <input type="password" name="password" value={form.password} onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                    {...(!editId && { required: true })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">NIP *</label>
                                <input type="text" name="nip" value={form.nip} onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                                <input type="text" name="jabatan" value={form.jabatan} onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Departemen</label>
                                <input type="text" name="departemen" value={form.departemen} onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                                <input type="text" name="no_telepon" value={form.no_telepon} onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                                <select name="shift_id" value={form.shift_id} onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                                    <option value="">-- Pilih Shift --</option>
                                    {shifts.map(s => <option key={s.id} value={s.id}>{s.nama_shift}</option>)}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                                <textarea name="alamat" value={form.alamat} onChange={handleChange} rows="2"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
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
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIP</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jabatan</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No HP</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {karyawans.length === 0 ? (
                                <tr><td colSpan="8" className="px-4 py-8 text-center text-gray-400">Belum ada data.</td></tr>
                            ) : karyawans.map((k, i) => (
                                <tr key={k.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-600">{i + 1}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{k.name}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{k.nip}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{k.email}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{k.jabatan || '-'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{k.shift_nama}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{k.no_telepon || '-'}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleEdit(k)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                                            <form method="POST" action={`${deleteUrlBase}/${k.id}`}
                                                onSubmit={(e) => { if (!confirm('Yakin hapus?')) e.preventDefault(); }}>
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