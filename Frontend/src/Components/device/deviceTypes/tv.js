import React from 'react';
import './tv.css';

function TVDevice({ selectedDevice, setSelectedDevice }) {
    const toggleTVStatus = () => {
        setSelectedDevice(prev => ({
            ...prev,
            status: prev.status === 'On' ? 'Off' : 'On',
        }));
    };

    return (
        <div className="tv-container">
            <h3>Volume</h3>
            <div className="tv-volume">
                <button
                    className="volume-button"
                    onClick={() => setSelectedDevice(prev => ({
                        ...prev,
                        settings: {
                            ...prev.settings,
                            volume: prev.settings.volume > 0 ? prev.settings.volume - 5 : 0
                        }
                    }))}
                >
                    -
                </button>
                <span>{selectedDevice.settings.volume}%</span>
                <button
                    className="volume-button"
                    onClick={() => setSelectedDevice(prev => ({
                        ...prev,
                        settings: {
                            ...prev.settings,
                            volume: prev.settings.volume < 100 ? prev.settings.volume + 5 : 100
                        }
                    }))}
                >
                    +
                </button>
            </div>
            <div className="switch">
                <label className="switch-label">
                    <input
                        type="checkbox"
                        className="switch-checkbox"
                        checked={selectedDevice.status === 'On'}
                        onChange={toggleTVStatus}
                    />
                    <span className="switch-slider"></span>
                </label>
            </div>
        </div>
    );
}

export default TVDevice;
