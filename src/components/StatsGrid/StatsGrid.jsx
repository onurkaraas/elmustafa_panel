import React from 'react';
import './StatsGrid.css';

const StatsGrid = () => {
    const stats = [
        { title: 'Active Viewers', value: '1,234' },
        { title: 'Total Streams', value: '42' },
        { title: 'Total Users', value: '10.5K' },
        { title: 'Storage Used', value: '1.2TB' },
    ];

    return (
        <div className="stats-grid">
            {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                    <h3>{stat.title}</h3>
                    <div className="number">{stat.value}</div>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;
