import React from 'react';
import './LiveStreams.css';

function LiveStreams() {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Live Streams</h1>
                <button className="primary-btn">Start New Stream</button>
            </div>

            <div className="streams-grid">
                <div className="stream-card live">
                    <div className="stream-preview">
                        <span className="live-badge">LIVE</span>
                    </div>
                    <div className="stream-info">
                        <h3>Morning Education</h3>
                        <p>Viewers: 256</p>
                        <div className="stream-controls">
                            <button className="action-btn">
                                Manage Stream
                            </button>
                            <button className="action-btn danger">
                                End Stream
                            </button>
                        </div>
                    </div>
                </div>
                {/* Add more stream cards */}
            </div>
        </div>
    );
}

export default LiveStreams;
