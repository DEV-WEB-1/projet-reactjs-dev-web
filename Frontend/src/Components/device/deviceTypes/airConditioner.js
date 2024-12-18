import React, { useState } from 'react';
import './airConditioner.css';

function AirConditionerDevice({ selectedDevice, setSelectedDevice }) {
    const [temperature, setTemperature] = useState(selectedDevice.settings?.temperature || 24);
    const [mode, setMode] = useState(selectedDevice.settings?.mode || 'Cold');
    const [fanSpeed, setFanSpeed] = useState(selectedDevice.settings?.fanSpeed || 1);

    const updateSettings = (setting, value) => {
        setSelectedDevice(prev => ({
            ...prev,
            settings: {
                ...prev.settings,
                [setting]: value,
            }
        }));
    };

    const decreaseTemperature = () => {
        const newTemperature = temperature - 1;
        setTemperature(newTemperature);
        updateSettings('temperature', newTemperature);
    };

    const increaseTemperature = () => {
        const newTemperature = temperature + 1;
        setTemperature(newTemperature);
        updateSettings('temperature', newTemperature);
    };

    const toggleMode = () => {
        const newMode = mode === 'Hot' ? 'Cold' : 'Hot';
        setMode(newMode);
        updateSettings('mode', newMode);
    };

    const decreaseFanSpeed = () => {
        const newFanSpeed = Math.max(1, fanSpeed - 1);
        setFanSpeed(newFanSpeed);
        updateSettings('fanSpeed', newFanSpeed);
    };

    const increaseFanSpeed = () => {
        const newFanSpeed = Math.min(5, fanSpeed + 1);
        setFanSpeed(newFanSpeed);
        updateSettings('fanSpeed', newFanSpeed);
    };

    return (
        <div className="air-conditioner">
            <div className="air-conditioner-temperature">
                <h3 className="control-title">Temperature</h3>
                <div className="temperature-controls">
                    <button onClick={decreaseTemperature} className="control-btn">-</button>
                    <p className="temperature-display">{temperature}°C</p>
                    <button onClick={increaseTemperature} className="control-btn">+</button>
                </div>
            </div>
            <div className="air-conditioner-mode">
                <h3 className="control-title">Mode</h3>
                <button
                    onClick={toggleMode}
                    className={`mode-btn ${mode === 'Hot' ? 'hot-mode' : 'cold-mode'}`}
                >
                    {mode}
                </button>
            </div>
            <div className="air-conditioner-fan">
                <h3 className="control-title">Fan Speed</h3>
                <div className="fan-controls">
                    <button onClick={decreaseFanSpeed} className="control-btn">-</button>
                    <p className="fan-speed-display">{fanSpeed}</p>
                    <button onClick={increaseFanSpeed} className="control-btn">+</button>
                </div>
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
    );
}

export default AirConditionerDevice;
