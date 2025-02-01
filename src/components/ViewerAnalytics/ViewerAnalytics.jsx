import React from 'react';
import './ViewerAnalytics.css';

const ViewerAnalytics = () => {
    return (
        <div className="content-section">
            <div className="section-header">
                <h2>Viewer Analytics</h2>
                <button className="btn">Export</button>
            </div>
            <div className="chart-container">
                {/* Chart will be rendered here */}
            </div>
        </div>
    );
};

export default ViewerAnalytics;
