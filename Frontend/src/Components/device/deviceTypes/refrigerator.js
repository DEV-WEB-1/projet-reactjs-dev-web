import React, { useState } from 'react';
import './refrigerator.css';

function RefrigeratorDevice({ selectedDevice, setSelectedDevice }) {
    const [topLevel, setTopLevel] = useState(selectedDevice.settings?.topLevel || 1);
    const [bottomLevel, setBottomLevel] = useState(selectedDevice.settings?.bottomLevel || 1);

    // Update the device settings as the sliders change
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
        <div className="refrigerator">
            <div className="refrigerator-setting">
                <p>Top Level</p>
                <div className="slider-container">
                    <input
                        type="range"
                        className="slider"
                        min="1"
                        max="5"
                        step="1"
                        value={topLevel}
                        onChange={(e) => {
                            setTopLevel(Number(e.target.value));
                            updateSettings('topLevel', Number(e.target.value));
                        }}
                    />
                    <div className="slider-labels">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </div>
                </div>
            </div>
            <div className="refrigerator-setting">
                <p>Bottom Level</p>
                <div className="slider-container">
                    <input
                        type="range"
                        className="slider"
                        min="1"
                        max="5"
                        step="1"
                        value={bottomLevel}
                        onChange={(e) => {
                            setBottomLevel(Number(e.target.value));
                            updateSettings('bottomLevel', Number(e.target.value));
                        }}
                    />
                    <div className="slider-labels">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </div>
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

export default RefrigeratorDevice;
