import React, { useState } from 'react';
import './device.css';

function Device({selectedDevice,  setSelectedDevice}) {
    const [brightness, setBrightness] = useState(0);
    const [heatLevel, setHeatLevel] = useState(3);
    const [timer, setTimer] = useState(0);
    const [temperature, setTemperature] = useState(22); // Default temperature
    const [mode, setMode] = useState("Cold"); // Default mode
    const [fanSpeed, setFanSpeed] = useState(1); // Default fan speed
    const [stoveSettings, setStoveSettings] = useState([1, 1, 1, 1]);
    const [volume, setVolume] = useState(50);    
    // Unified slider handler
    const handleSliderChange = (setter) => (e) => {
        const value = Number(e.target.value);
        setter(value);
        if (selectedDevice.type === "Light") {
            setSelectedDevice((prev) => ({ ...prev, settings: { ...prev.settings, brightness: value } }));
        }else if (selectedDevice.type === "Heater") {
            setSelectedDevice((prev) => ({ ...prev, settings: { ...prev.settings, heatLevel: value } }));
        }else if (selectedDevice.type === 'Microwave') {
            setSelectedDevice((prev) => ({ ...prev, settings: { ...prev.settings, heatLevel: value } }));
        }   
    };

    const handleSliderChangeTopLevel = (setter) => (e) => {
        const value = Number(e.target.value);
        setter(value);
        if (selectedDevice.type === "Refrigerator") {
            setSelectedDevice((prev) => ({ ...prev, settings: { ...prev.settings, topLevel: value } }));
        }
    }

    const handleSliderChangeBottomLevel = (setter) => (e) => {
        const value = Number(e.target.value);
        setter(value);
        if (selectedDevice.type === "Refrigerator") {
            setSelectedDevice((prev) => ({ ...prev, settings: { ...prev.settings, bottomLevel: value } }));
        }
    }

    const handleStoveChange = (index, value) => {
        const newSettings = [...stoveSettings];
        newSettings[index] = value;
        setStoveSettings(newSettings);
    };

    const increaseTemperature = () => setTemperature((prev) => Math.min(prev + 1, 30)); // Max 30°C
    const decreaseTemperature = () => setTemperature((prev) => Math.max(prev - 1, 16)); // Min 16°C
    const toggleMode = () => setMode((prev) => (prev === "Hot" ? "Cold" : "Hot"));
    const increaseFanSpeed = () => setFanSpeed((prev) => Math.min(prev + 1, 5)); // Max fan speed 5
    const decreaseFanSpeed = () => setFanSpeed((prev) => Math.max(prev - 1, 1)); // Min fan speed 1
    

    return (
        <div className="device">
            {selectedDevice.type === "Light" && (
                <div className="light">
                    <div className="light-panel">
                        <div className="colors">
                            <div className="color" style={{ backgroundColor: 'lightcoral' }}></div>
                            <div className="color" style={{ backgroundColor: 'lightblue' }}></div>
                            <div className="color" style={{ backgroundColor: 'lightgreen' }}></div>
                            <div className="color" style={{ backgroundColor: 'rgb(221, 226, 129)' }}></div>
                            <div className="color" style={{ backgroundColor: 'lightsalmon' }}></div>
                            <div className="color" style={{ backgroundColor: 'white' }}></div>
                        </div>
                        <div className="light-controls">
                            <div className="slider">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={brightness}
                                    onChange={handleSliderChange}
                                    className="slider-input"
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
            )}
            { selectedDevice.type === 'Router' &&(
                <div className='router'>
                    <div className='control-setting'>
                        <p>SSID</p>
                        <input type='text' placeholder='SSID' />
                    </div>
                    <div className='control-setting'>
                        <p>Password</p>
                        <input type='password' placeholder='Password' />
                    </div>
                    <div className="switch">
                        <label className="switch-label">
                            <input type="checkbox" className="switch-checkbox" />
                                <span className="switch-slider"></span>
                        </label>
                    </div>
                </div>
            )}
            {selectedDevice.type === "Refrigerator" && (
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
                            <input type="checkbox" className="switch-checkbox" />
                            <span className="switch-slider"></span>
                        </label>
                    </div>
                </div>
            )}
            {selectedDevice.type === 'Camera' && (
                <div className="camera">
                  <div className='camera-screen'> 
                    <div className='camera-content'> 
                      <img src='../image/cameraOff.svg' alt='Logo' /> 
                      <p>Camera Offline</p> 
                    </div> 
                  </div>
                  <div className='camera-button'>
                    <p>Camera 1</p>
                    <div className="switch">
                        <label className="switch-label">
                            <input type="checkbox" className="switch-checkbox" />
                            <span className="switch-slider"></span>
                        </label>
                    </div>
                  </div>
                </div>
            )}
            { selectedDevice.type === "Microwave" && (
                <div className="microwave">
                    <div className="microwave-knobs">
                        <div className="heat-knob">
                            <p className="center-text">Heat Level: {["Low", "Medium-Low", "Medium", "Medium-High", "High"]}</p>
                            <div className="heat-knob-circle">
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    step="1"
                                    className="heat-slider"
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
                            <p className="center-text">Timer: {Math.floor(timer / 60)} hr {timer % 60} min</p>
                            <div className="timer-input-container">
                                <input
                                    type="number"
                                    min="0"
                                    max="23"
                                    value={(timer / 60)}
                                    className="hour-input"
                                />
                                <span>hr</span>
                                <input
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={timer % 60}
                                    className="minute-input"
                                />
                                <span>min</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            { selectedDevice.type === "Air Conditioner" && (
                <div className="air-conditioner">
                    <div className="air-conditioner-temperature">
                        <h3 className="control-title">Temperature</h3>
                        <div className="temperature-controls">
                            <button onClick={decreaseTemperature} className="control-btn">-</button>
                            <p className="temperature-display">{selectedDevice.settings.temperature}°C</p>
                            <button onClick={increaseTemperature} className="control-btn">+</button>
                        </div>
                    </div>
                    <div className="air-conditioner-mode">
                        <h3 className="control-title">Mode</h3>
                        <button
                            onClick={toggleMode}
                            className={`mode-btn ${selectedDevice.settings.mode === 'Hot' ? 'hot-mode' : 'cold-mode'}`}
                        >
                            {mode}
                        </button>
                    </div>
                    <div className="air-conditioner-fan">
                        <h3 className="control-title">Fan Speed</h3>
                        <div className="fan-controls">
                            <button onClick={decreaseFanSpeed} className="control-btn">-</button>
                            <p className="fan-speed-display">{selectedDevice.settings.fanSpeed}</p>
                            <button onClick={increaseFanSpeed} className="control-btn">+</button>
                        </div>
                    </div>
                    <div className="switch">
                        <label className="switch-label">
                            <input type="checkbox" className="switch-checkbox" />
                            <span className="switch-slider"></span>
                        </label>
                    </div>
                </div>
            )}
            { selectedDevice.type === 'Electric Stove' && (
                <div className="electric-stove">
                    <div className="electric-stove-plaques">
                        {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((position, index) => (
                            <div className="electric-stove-plaque" key={index}>
                                <p className="plaque-position">{position}</p>
                                <div className="plaque-circle"></div>
                                <input
                                    type="range"
                                    min="0"
                                    max="4"
                                    value={selectedDevice.settings[index]}
                                    onChange={(e) => setSelectedDevice({...selectedDevice, settings: {...selectedDevice.settings, [index]: Number(e.target.value)}})}
                                    className="plaque-slider"
                                />

                                <p className="plaque-level">{selectedDevice.settings[index]}</p>
                            </div>
                        ))}
                    </div>
                    <div className="switch">
                        <label className="switch-label">
                            <input type="checkbox" className="switch-checkbox" />
                            <span className="switch-slider"></span>
                        </label>
                    </div>
                </div> 
            )}
            {selectedDevice.type === 'Heater' && (
                <div className="heater">
                    <h3>Heat Setting</h3>
                    <div className="slider-container">
                        <input
                            type="range"
                            className="slider"
                            min="1"
                            max="5"
                            step="1"
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
                            <input type="checkbox" className="switch-checkbox" />
                            <span className="switch-slider"></span>
                        </label>
                    </div>    
                </div>
            )}
            {(selectedDevice.type === 'TV') && (
                <div className="tv-container">
                    <h3>Volume</h3>
                    <div className="tv-volume">
                        <button className="volume-button" onClick={() => setSelectedDevice(prev => ({...prev, settings: {...prev.settings, volume: prev.settings.volume > 0 ? prev.settings.volume - 5 : 0}}))}>-</button>
                        <span>{selectedDevice.settings.volume}%</span>
                        <button className="volume-button" onClick={() => setSelectedDevice(prev => ({...prev, settings: {...prev.settings, volume: prev.settings.volume < 100 ? prev.settings.volume + 5 : 100}}))}>+</button>
                    </div>
                    <div className="switch">
                        <label className="switch-label">
                            <input type="checkbox" className="switch-checkbox" />
                            <span className="switch-slider"></span>
                        </label>
                    </div> 
                </div>
            )}


        </div>
    );
}

export default Device;
