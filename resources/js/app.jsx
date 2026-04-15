import React from 'react';
import { createRoot } from 'react-dom/client';
import Login from './components/Login';
import DashboardAdmin from './components/DashboardAdmin';
import DashboardKaryawan from './components/DashboardKaryawan';
import UserManagement from './components/UserManagement';
import KaryawanPage from './components/Karyawan';
import ShiftPage from './components/Shift';
import AbsensiPage from './components/Absensi';
import IzinAdmin from './components/IzinAdmin';
import LaporanPage from './components/Laporan';
import IzinKaryawan from './components/IzinKaryawan';

const pages = {
    'login': Login,
    'admin-dashboard': DashboardAdmin,
    'admin-users': UserManagement,
    'admin-karyawan': KaryawanPage,
    'admin-shift': ShiftPage,
    'admin-absensi': AbsensiPage,
    'admin-izin': IzinAdmin,
    'admin-laporan': LaporanPage,
    'karyawan-dashboard': DashboardKaryawan,
    'karyawan-izin': IzinKaryawan,
};

document.addEventListener('DOMContentLoaded', () => {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    const page = window.__PAGE__;
    const data = window.__DATA__ || {};

    const Component = pages[page];
    if (Component) {
        const root = createRoot(appEl);
        root.render(<Component {...data} />);
    }
});