import React, { useState } from 'react';
import './electricStove.css';

function ElectricStoveDevice({ selectedDevice, setSelectedDevice }) {
    const initialSettings = {
        topLeft: selectedDevice.settings?.topLeft || 0,
        topRight: selectedDevice.settings?.topRight || 0,
        bottomLeft: selectedDevice.settings?.bottomLeft || 0,
        bottomRight: selectedDevice.settings?.bottomRight || 0,
    };

    const [plaqueSettings, setPlaqueSettings] = useState(initialSettings);

    const updateSettings = (position, value) => {
        const newSettings = { ...plaqueSettings, [position]: value };
        setPlaqueSettings(newSettings);
        setSelectedDevice(prev => ({
            ...prev,
            settings: newSettings,
        }));
    };

    const handleToggleStove = () => {
        if (selectedDevice.status === 'On') {
            const resetSettings = {
                topLeft: 0,
                topRight: 0,
                bottomLeft: 0,
                bottomRight: 0
            };
            setPlaqueSettings(resetSettings);
            setSelectedDevice(prev => ({
                ...prev,
                status: 'Off',
                settings: resetSettings,
            }));
        } else {
            setSelectedDevice(prev => ({
                ...prev,
                status: 'On',
            }));
        }
    };

    const positionLabels = {
        topLeft: "Top Left",
        topRight: "Top Right",
        bottomLeft: "Bottom Left",
        bottomRight: "Bottom Right"
    };

    return (
        <div className="electric-stove">
            <div className="electric-stove-plaques">
                {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((position, index) => (
                    <div className="electric-stove-plaque" key={index}>
                        <p className="plaque-position">{positionLabels[position]}</p>
                        <div className="plaque-circle"></div>
                        <input
                            type="range"
                            min="0"
                            max="4"
                            value={plaqueSettings[position]}
                            className="plaque-slider"
                            onChange={(e) => updateSettings(position, Number(e.target.value))}
                        />
                        <p className="plaque-level">{plaqueSettings[position]}</p>
                    </div>
                ))}
            </div>
            <div className="switch">
                <label className="switch-label">
                    <input
                        type="checkbox"
                        className="switch-checkbox"
                        checked={selectedDevice.status === 'On'}
                        onChange={handleToggleStove}
                    />
                    <span className="switch-slider"></span>
                </label>
            </div>
        </div>
    );
}

export default ElectricStoveDevice;
