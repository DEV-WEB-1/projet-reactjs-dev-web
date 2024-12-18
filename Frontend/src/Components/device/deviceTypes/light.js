import React, { useState, useEffect } from 'react';
import './light.css';

function LightDevice({ selectedDevice, setSelectedDevice }) {
    const [brightness, setBrightness] = useState(selectedDevice.settings.brightness || 0);
    const [selectedColor, setSelectedColor] = useState(selectedDevice.settings.color || 'white');

    useEffect(() => {
        setSelectedDevice(prev => ({
            ...prev,
            settings: { 
                ...prev.settings, brightness, color: selectedColor  
            },
        }));
    }, [brightness, selectedColor, setSelectedDevice]);

    const colors = ['lightcoral', 'lightblue', 'lightgreen', 'rgb(221, 226, 129)', 'lightsalmon', 'white'];

    return (
        <div className="light">
            <div className="light-panel">
                <div className="colors">
                    {colors.map(color => (
                        <div
                            key={color}
                            className={`color ${color === selectedColor ? 'selected' : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedColor(color)}
                        ></div>
                    ))}
                </div>
                <div className="light-controls">
                    <div className="slider">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={brightness}
                            className="slider-input"
                            onChange={(e) => setBrightness(Number(e.target.value))}
                        />
                        <span className="slider-value">{brightness}%</span>
                    </div>
                    <div className="switch">
                        <label className="switch-label">
                            <input
                                type="checkbox"
                                className="switch-checkbox"
                                checked={selectedDevice.status === 'On'}
                                onChange={() =>
                                    setSelectedDevice((prev) => ({
                                        ...prev,
                                        status: prev.status === 'On' ? 'Off' : 'On',
                                    }))
                                }
                            />
                            <span className="switch-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LightDevice;
