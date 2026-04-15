<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Cetak Laporan Absensi</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; font-size: 12px; }
        h1 { text-align: center; font-size: 18px; margin-bottom: 5px; }
        h2 { text-align: center; font-size: 14px; color: #555; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #333; padding: 8px; text-align: left; }
        th { background-color: #f0f0f0; font-weight: bold; }
        tr:nth-child(even) { background-color: #fafafa; }
        .summary { margin: 15px 0; }
        .summary span { margin-right: 20px; font-weight: bold; }
        .status-hadir { color: green; } .status-telat { color: orange; }
        .status-alpha { color: red; } .status-izin { color: blue; }
        .footer { margin-top: 20px; text-align: center; color: #888; font-size: 10px; }
        @media print { .no-print { display: none; } body { margin: 0; } }
    </style>
</head>
<body>
    <div class="no-print" style="margin-bottom: 15px; text-align: center;">
        <button onclick="window.print()" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">🖨️ Cetak</button>
        <button onclick="window.close()" style="padding: 10px 20px; background: #6b7280; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">✕ Tutup</button>
    </div>

    <h1>LAPORAN ABSENSI KARYAWAN</h1>
    <h2>
        @if($filters['tipe'] === 'harian')
            Laporan Harian - {{ \Carbon\Carbon::parse($filters['tanggal'])->format('d F Y') }}
        @else
            Laporan Bulanan - {{ \Carbon\Carbon::parse($filters['bulan'] . '-01')->format('F Y') }}
        @endif
    </h2>

    <div class="summary">
        <span>Total: {{ $summary['total'] }}</span>
        <span style="color:green">Hadir: {{ $summary['hadir'] }}</span>
        <span style="color:orange">Telat: {{ $summary['telat'] }}</span>
        <span style="color:red">Alpha: {{ $summary['alpha'] }}</span>
        <span style="color:blue">Izin: {{ $summary['izin'] }}</span>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th><th>Nama</th><th>NIP</th><th>Shift</th><th>Tanggal</th><th>Masuk</th><th>Pulang</th><th>Status</th>
            </tr>
        </thead>
        <tbody>
            @forelse($data as $index => $item)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $item['nama'] }}</td>
                    <td>{{ $item['nip'] }}</td>
                    <td>{{ $item['shift'] }}</td>
                    <td>{{ $item['tanggal'] }}</td>
                    <td>{{ $item['jam_masuk'] ?? '-' }}</td>
                    <td>{{ $item['jam_pulang'] ?? '-' }}</td>
                    <td class="status-{{ $item['status'] }}">{{ ucfirst($item['status']) }}</td>
                </tr>
            @empty
                <tr><td colspan="8" style="text-align:center;">Tidak ada data.</td></tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">Dicetak pada: {{ now()->format('d/m/Y H:i:s') }}</div>
    <script>window.onload = function() { window.print(); };</script>
</body>
</html>