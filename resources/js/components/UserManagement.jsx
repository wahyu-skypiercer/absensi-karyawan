import React, { useState } from 'react';

export default function UserManagement({ users = [], csrfToken, storeUrl, updateUrlBase, deleteUrlBase }) {
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'karyawan', is_active: true });

    const resetForm = () => {
        setForm({ name: '', email: '', password: '', role: 'karyawan', is_active: true });
        setEditId(null);
        setShowForm(false);
    };

    const handleEdit = (u) => {
        setForm({ name: u.name, email: u.email, password: '', role: u.role, is_active: u.is_active });
        setEditId(u.id);
        setShowForm(true);
    };

    const handleChange = (e) => {
        const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm({ ...form, [e.target.name]: val });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Akun</h1>
                    <p className="text-gray-500 text-sm">Kelola semua akun pengguna</p>
                </div>
                <button onClick={() => { resetForm(); setShowForm(!showForm); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                    {showForm ? '✕ Tutup' : '+ Tambah Akun'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">{editId ? 'Edit Akun' : 'Tambah Akun Baru'}</h2>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                                <select name="role" value={form.role} onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                                    <option value="admin">Admin</option>
                                    <option value="karyawan">Karyawan</option>
                                </select>
                            </div>
                            <div className="flex items-center mt-6">
                                <input type="hidden" name="is_active" value="0" />
                                <input type="checkbox" name="is_active" value="1" checked={form.is_active} onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                <label className="ml-2 text-sm text-gray-700">Aktif</label>
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
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.length === 0 ? (
                                <tr><td colSpan="6" className="px-4 py-8 text-center text-gray-400">Belum ada data.</td></tr>
                            ) : users.map((u, i) => (
                                <tr key={u.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-600">{i + 1}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{u.name}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${u.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${u.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                            {u.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleEdit(u)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                                            <form method="POST" action={`${deleteUrlBase}/${u.id}`}
                                                onSubmit={(e) => { if (!confirm('Yakin hapus akun ini?')) e.preventDefault(); }}>
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