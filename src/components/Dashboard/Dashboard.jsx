import React from 'react';
import './Dashboard.css';
import StreamsTable from '../StreamsTable/StreamsTable';

const COLORS = {
    primary: '#004D40', // Teal green
    secondary: '#D4C19C', // Beige
    darkPrimary: '#002420', // Darker teal
    text: '#333333',
    textLight: '#666666',
    border: '#eeeeee',
    white: '#ffffff',
    black: '#000000',
};

function Dashboard() {
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1 className="dashboard-title">
                    El Mustafa TV Kontrol Paneli
                </h1>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-title">Canlı Yayınlar</div>
                    <div className="stat-value">3</div>
                    <div className="stat-subtitle">Aktif Şimdi</div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Toplam İzleyici</div>
                    <div className="stat-value">1,234</div>
                    <div className="stat-subtitle">Tüm Platformlarda</div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Video Kütüphanesi</div>
                    <div className="stat-value">256</div>
                    <div className="stat-subtitle">Toplam Video</div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Platform Kullanımı</div>
                    <div className="stat-value">85%</div>
                    <div className="stat-subtitle">Web & Mobil</div>
                </div>
            </div>

            <div className="recent-streams">
                <div className="section-header">
                    <h2 className="section-title">Canlı ve Son Yayınlar</h2>
                    <button className="new-stream-btn">
                        Yeni Yayın Başlat
                    </button>
                </div>
                <StreamsTable />
            </div>
        </div>
    );
}

export default Dashboard;
