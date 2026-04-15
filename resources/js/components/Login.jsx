import React, { useState } from 'react';

export default function Login({ errors = {}, oldEmail = '', csrfToken, loginUrl }) {
    const [email, setEmail] = useState(oldEmail);
    const [password, setPassword] = useState('');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="text-5xl mb-3">&#x1F4CB;</div>
                    <h1 className="text-2xl font-bold text-gray-800">Absensi Karyawan</h1>
                    <p className="text-gray-500 text-sm mt-1">Silakan login untuk melanjutkan</p>
                </div>

                {errors.email && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                        {Array.isArray(errors.email) ? errors.email[0] : errors.email}
                    </div>
                )}

                <form method="POST" action={loginUrl}>
                    <input type="hidden" name="_token" value={csrfToken} />

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="Masukkan email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="Masukkan password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium mb-2">Demo Akun:</p>
                    <div className="text-xs text-gray-600 space-y-1">
                        <p><strong>Admin:</strong> admin@gmail.com / password</p>
                        <p><strong>Karyawan:</strong> budi@gmail.com / password</p>
                        <p><strong>Karyawan:</strong> siti@gmail.com / password</p>
                    </div>
                </div>
            </div>
        </div>
    );
}