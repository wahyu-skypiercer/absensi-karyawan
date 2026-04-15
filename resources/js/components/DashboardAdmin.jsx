import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function DashboardAdmin({
    totalKaryawan = 0, totalAbsensiHariIni = 0,
    hadirHariIni = 0, telatHariIni = 0, alphaHariIni = 0, izinHariIni = 0,
    pieData = {}, barData = [], shiftData = [], absensiTerbaru = [], pendingIzin = 0
}) {
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const pieChartData = {
        labels: ['Hadir', 'Telat', 'Alpha', 'Izin'],
        datasets: [{
            data: [pieData.hadir || 0, pieData.telat || 0, pieData.alpha || 0, pieData.izin || 0],
            backgroundColor: ['#22c55e', '#f59e0b', '#ef4444', '#3b82f6'],
            borderWidth: 2,
            borderColor: '#fff',
        }],
    };

    const barChartData = {
        labels: barData.map(d => d.tanggal),
        datasets: [
            { label: 'Hadir', data: barData.map(d => d.hadir), backgroundColor: '#22c55e' },
            { label: 'Telat', data: barData.map(d => d.telat), backgroundColor: '#f59e0b' },
            { label: 'Alpha', data: barData.map(d => d.alpha), backgroundColor: '#ef4444' },
            { label: 'Izin', data: barData.map(d => d.izin), backgroundColor: '#3b82f6' },
        ],
    };

    const shiftChartData = {
        labels: shiftData.map(s => s.nama),
        datasets: [
            { label: 'Total Karyawan', data: shiftData.map(s => s.total_karyawan), backgroundColor: '#6366f1' },
            { label: 'Hadir Hari Ini', data: shiftData.map(s => s.hadir), backgroundColor: '#22c55e' },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } },
    };

    const shiftBarOptions = {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: { y: { beginAtZero: true } },
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
                <p className="text-gray-500 text-sm">{today}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <StatCard label="Total Karyawan" value={totalKaryawan} icon="👥" color="gray" />
                <StatCard label="Absensi Hari Ini" value={totalAbsensiHariIni} icon="📝" color="blue" />
                <StatCard label="Hadir" value={hadirHariIni} icon="✅" color="green" />
                <StatCard label="Telat" value={telatHariIni} icon="⏰" color="yellow" />
                <StatCard label="Alpha" value={alphaHariIni} icon="❌" color="red" />
                <StatCard label="Izin" value={izinHariIni} icon="📋" color="indigo" />
            </div>

            {pendingIzin > 0 && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center">
                    <span className="text-yellow-600 font-medium">⚠️ Ada {pendingIzin} pengajuan izin menunggu persetujuan.</span>
                </div>
            )}

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Status Absensi Hari Ini</h3>
                    <div className="flex justify-center" style={{ maxHeight: '250px' }}>
                        <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: true }} />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Absensi 7 Hari Terakhir</h3>
                    <Bar data={barChartData} options={barOptions} />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Per Shift</h3>
                    <Bar data={shiftChartData} options={shiftBarOptions} />
                </div>
            </div>

            {/* Recent Attendance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Absensi Terbaru Hari Ini</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIP</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Masuk</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pulang</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {absensiTerbaru.length === 0 ? (
                                <tr><td colSpan="6" className="px-4 py-8 text-center text-gray-400">Belum ada data.</td></tr>
                            ) : absensiTerbaru.map((item, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.nama}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{item.nip}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{item.shift}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{item.jam_masuk || '-'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{item.jam_pulang || '-'}</td>
                                    <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color }) {
    const colors = {
        gray: 'text-gray-800', blue: 'text-blue-600', green: 'text-green-600',
        yellow: 'text-yellow-600', red: 'text-red-600', indigo: 'text-indigo-600',
    };
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className={`text-2xl font-bold mt-1 ${colors[color]}`}>{value}</p>
                </div>
                <span className="text-2xl">{icon}</span>
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        hadir: 'bg-green-100 text-green-800',
        telat: 'bg-yellow-100 text-yellow-800',
        alpha: 'bg-red-100 text-red-800',
        izin: 'bg-blue-100 text-blue-800',
    };
    return (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}