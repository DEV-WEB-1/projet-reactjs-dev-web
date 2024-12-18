import React, { useState } from 'react';
import './heater.css';

function HeaterDevice({ selectedDevice, setSelectedDevice }) {
    const [heatLevel, setHeatLevel] = useState(selectedDevice.settings?.heatLevel || 1);

    const updateSettings = (value) => {
        setHeatLevel(value);
        setSelectedDevice(prev => ({
            ...prev,
            settings: {
                ...prev.settings,
                heatLevel: value,
            }
        }));
    };

    const handleToggleHeater = () => {
        if (selectedDevice.status === 'On') {
            setSelectedDevice(prev => ({
                ...prev,
                status: 'Off',
            }));
        } else {
            setSelectedDevice(prev => ({
                ...prev,
                status: 'On',
            }));
        }
    };

    return (
        <div className="heater">
            <h3>Heat Level</h3>
            <div className="slider-container">
                <input
                    type="range"
                    className="slider"
                    min="1"
                    max="5"
                    step="1"
                    value={heatLevel}
                    onChange={(e) => updateSettings(Number(e.target.value))}
                />
                <div className="slider-labels">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                </div>
            </div>
            <div className="switch">
                <label className="switch-label">
                    <input
                        type="checkbox"
                        className="switch-checkbox"
                        checked={selectedDevice.status === 'On'}
                        onChange={handleToggleHeater}
                    />
                    <span className="switch-slider"></span>
                </label>
            </div>
        </div>
    );
}

export default HeaterDevice;
