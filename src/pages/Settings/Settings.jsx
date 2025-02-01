import React from 'react';
import './Settings.css';

function Settings() {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Settings</h1>
            </div>

            <div className="settings-grid">
                <div className="settings-section">
                    <h2>Stream Settings</h2>
                    <form className="settings-form">
                        <div className="form-group">
                            <label>Default Stream Quality</label>
                            <select className="form-input">
                                <option>1080p</option>
                                <option>720p</option>
                                <option>480p</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>RTMP Server</label>
                            <input type="text" className="form-input" />
                        </div>
                    </form>
                </div>

                <div className="settings-section">
                    <h2>Platform Settings</h2>
                    {/* Add more settings sections */}
                </div>
            </div>
        </div>
    );
}

export default Settings;
