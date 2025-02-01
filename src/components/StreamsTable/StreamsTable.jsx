import React from 'react';
import './StreamsTable.css';

function StreamsTable() {
    return (
        <div className="streams-table">
            <table>
                <thead>
                    <tr>
                        <th>Stream Title</th>
                        <th>Platform</th>
                        <th>Duration</th>
                        <th>Viewers</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Morning Education Live</td>
                        <td>Web, Mobile, TV</td>
                        <td>2h 30m</td>
                        <td>256</td>
                        <td>
                            <span className="status-live">Live</span>
                        </td>
                        <td>
                            <button className="action-btn">Manage</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Islamic Studies Session</td>
                        <td>Web, Mobile</td>
                        <td>1h 45m</td>
                        <td>189</td>
                        <td>
                            <span className="status-completed">Completed</span>
                        </td>
                        <td>
                            <button className="action-btn">View</button>
                        </td>
                    </tr>
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    );
}

export default StreamsTable;
