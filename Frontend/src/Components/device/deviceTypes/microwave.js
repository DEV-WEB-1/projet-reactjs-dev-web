import React, { useState } from 'react';
import './microwave.css';

function MicrowaveDevice({ selectedDevice, setSelectedDevice }) {
    const [heatLevel, setHeatLevel] = useState(selectedDevice.settings?.heatLevel || 1);
    const [hours, setHours] = useState(selectedDevice.settings?.hours || 0);
    const [minutes, setMinutes] = useState(selectedDevice.settings?.minutes || 0);

    const updateSettings = (setting, value) => {
        setSelectedDevice(prev => ({
            ...prev,
            settings: {
                ...prev.settings,
                [setting]: value,
            }
        }));
    };

    return (
        <div className="microwave">
            <div className="microwave-knobs">
                <div className="heat-knob">
                    <p className="center-text">Heat Level: {["Low", "Medium-Low", "Medium", "Medium-High", "High"][heatLevel - 1]}</p>
                    <div className="heat-knob-circle">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            value={heatLevel}
                            className="heat-slider"
                            onChange={(e) => {
                                setHeatLevel(Number(e.target.value));
                                updateSettings('heatLevel', Number(e.target.value));
                            }}
                        />
                        <div className="heat-labels">
                            <span>Low</span>
                            <span>Medium-Low</span>
                            <span>Medium</span>
                            <span>Medium-High</span>
                            <span>High</span>
                        </div>
                    </div>
                </div>

                <div className="timer-knob">
                    <p className="center-text">Timer: {hours} hr {minutes} min</p>
                    <div className="timer-input-container">
                        <input
                            type="number"
                            min="0"
                            max="23"
                            value={hours}
                            className="hour-input"
                            onChange={(e) => {
                                const newHours = Number(e.target.value);
                                setHours(newHours);
                                updateSettings('hours', newHours);
                            }}
                        />
                        <span>hr</span>
                        <input
                            type="number"
                            min="0"
                            max="59"
                            value={minutes}
                            className="minute-input"
                            onChange={(e) => {
                                const newMinutes = Number(e.target.value);
                                setMinutes(newMinutes);
                                updateSettings('minutes', newMinutes);
                            }}
                        />
                        <span>min</span>
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
        </div>
    );
}

export default MicrowaveDevice;
