import React from 'react';
import './MobileStreamView.css';
import { FaHome, FaVideo, FaCog } from 'react-icons/fa';

function MobileStreamView() {
    const categories = [
        { id: 1, name: 'Movies' },
        { id: 2, name: 'TV shows' },
        { id: 3, name: 'Sports' },
        { id: 4, name: 'Live TV' },
        { id: 5, name: 'News' },
        { id: 6, name: 'Kids' },
    ];

    const featuredVideos = [
        {
            id: 1,
            title: 'İslami İlimler Dersi',
            duration: '1:45:30',
            thumbnail: '/thumbnail.png',
            views: '1.2B',
            category: 'Education',
        },
        {
            id: 2,
            title: 'Kuran-ı Kerim Tilaveti',
            duration: '58:20',
            thumbnail: '/thumbnail.png',
            views: '856',
            category: 'Religion',
        },
        {
            id: 3,
            title: 'Eğitim Çalıştayı',
            duration: '2:15:00',
            thumbnail: '/thumbnail.png',
            views: '2.1B',
            category: 'Workshop',
        },
    ];

    return (
        <div className="mobile-app">
            <div className="mobile-header">
                <img
                    src="/logo.png"
                    alt="El Mustafa TV"
                    className="mobile-logo"
                />
                <div className="header-buttons">
                    <button className="live-btn">
                        <span className="live-indicator"></span>
                        CANLI
                    </button>
                </div>
            </div>

            <div className="category-bar">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={`category-item ${category.id === 1 ? 'active' : ''}`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <div className="mobile-player">
                <div className="player-placeholder">
                    <span className="mobile-live-badge">CANLI</span>
                </div>
                <div className="mobile-controls">
                    <button className="mobile-control-btn">⏯</button>
                    <div className="mobile-progress">
                        <div className="progress-fill"></div>
                    </div>
                    <button className="mobile-control-btn">⤢</button>
                </div>
            </div>

            <div className="mobile-content">
                <div className="stream-header">
                    <h2>Sabah Eğitimi Canlı Yayını</h2>
                    <div className="stream-meta">
                        <span>2 saat önce</span>
                    </div>
                </div>

                <div className="featured-videos">
                    <h3 className="section-title">Öne Çıkan Videolar</h3>
                    <div className="video-list">
                        {featuredVideos.map((video) => (
                            <div key={video.id} className="video-item">
                                <div className="video-thumbnail">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                    />
                                    <span className="video-duration">
                                        {video.duration}
                                    </span>
                                </div>
                                <div className="video-details">
                                    <h4>{video.title}</h4>
                                    <span className="video-views">
                                        {video.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bottom-nav">
                <div className="nav-item">
                    <FaHome className="nav-icon" />
                    <span>Home</span>
                </div>
                <div className="nav-item">
                    <FaVideo className="nav-icon" />
                    <span>Videos</span>
                </div>
                <div className="nav-item active">
                    <FaCog className="nav-icon" />
                    <span>Settings</span>
                </div>
            </div>
        </div>
    );
}

export default MobileStreamView;
