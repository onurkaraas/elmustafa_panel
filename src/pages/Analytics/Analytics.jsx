import React, { useState } from 'react';
import {
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import './Analytics.css';

function Analytics() {
    const [timeRange, setTimeRange] = useState('7');

    const viewerData = [
        { date: '18 Mart', viewers: 1200, streams: 3 },
        { date: '19 Mart', viewers: 1800, streams: 4 },
        { date: '20 Mart', viewers: 2400, streams: 5 },
        { date: '21 Mart', viewers: 2000, streams: 4 },
        { date: '22 Mart', viewers: 2800, streams: 6 },
        { date: '23 Mart', viewers: 3200, streams: 5 },
        { date: '24 Mart', viewers: 3600, streams: 7 },
    ];

    const platformData = [
        { name: 'Web', value: 45 },
        { name: 'Mobil', value: 35 },
        { name: 'TV', value: 20 },
    ];

    const categoryData = [
        { category: 'Tefsir', views: 2800 },
        { category: 'Fıkıh', views: 2200 },
        { category: 'Hadis', views: 1900 },
        { category: 'Dil', views: 2500 },
        { category: 'Tarih', views: 1700 },
    ];

    const COLORS = ['#1a1464', '#f7941d', '#45b6fe', '#ff6b6b', '#4caf50'];

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Analitik</h1>
                <div className="date-filter">
                    <select
                        className="filter-select"
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                    >
                        <option value="7">Son 7 Gün</option>
                        <option value="30">Son 30 Gün</option>
                        <option value="90">Son 3 Ay</option>
                    </select>
                </div>
            </div>

            <div className="analytics-grid">
                <div className="analytics-card">
                    <h3>İzleyici İstatistikleri</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={viewerData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="viewers"
                                    name="İzleyiciler"
                                    stroke="#1a1464"
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="streams"
                                    name="Yayınlar"
                                    stroke="#f7941d"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="analytics-card">
                    <h3>Platform Dağılımı</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={platformData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({
                                        cx,
                                        cy,
                                        midAngle,
                                        innerRadius,
                                        outerRadius,
                                        value,
                                        index,
                                    }) => {
                                        const RADIAN = Math.PI / 180;
                                        const radius =
                                            25 +
                                            innerRadius +
                                            (outerRadius - innerRadius);
                                        const x =
                                            cx +
                                            radius *
                                                Math.cos(-midAngle * RADIAN);
                                        const y =
                                            cy +
                                            radius *
                                                Math.sin(-midAngle * RADIAN);

                                        return (
                                            <text
                                                x={x}
                                                y={y}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                                textAnchor={
                                                    x > cx ? 'start' : 'end'
                                                }
                                                dominantBaseline="central"
                                            >
                                                {`${platformData[index].name} (${value}%)`}
                                            </text>
                                        );
                                    }}
                                >
                                    {platformData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="analytics-card full-width">
                    <h3>Kategori Performansı</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={categoryData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="views"
                                    name="Görüntülenme"
                                    fill="#1a1464"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="analytics-card">
                    <h3>Özet İstatistikler</h3>
                    <div className="stats-summary">
                        <div className="stat-item">
                            <span className="stat-label">Toplam İzleyici</span>
                            <span className="stat-value">15.2K</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">
                                Ortalama İzlenme Süresi
                            </span>
                            <span className="stat-value">45 dk</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Etkileşim Oranı</span>
                            <span className="stat-value">78%</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Yeni Aboneler</span>
                            <span className="stat-value">+324</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
