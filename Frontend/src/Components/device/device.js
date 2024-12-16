import React, { useState } from 'react';
import './device.css';

function Device({selectedDevice }) {
    const [brightness, setBrightness] = useState(0);
    const [heatLevel, setHeatLevel] = useState(3);
    const [timer, setTimer] = useState(0);
    const [temperature, setTemperature] = React.useState(22); // Default temperature
    const [mode, setMode] = React.useState("Cold"); // Default mode
    const [fanSpeed, setFanSpeed] = React.useState(1); // Default fan speed

    const increaseTemperature = () => setTemperature((prev) => Math.min(prev + 1, 30)); // Max 30°C
    const decreaseTemperature = () => setTemperature((prev) => Math.max(prev - 1, 16)); // Min 16°C

    const toggleMode = () => setMode((prev) => (prev === "Hot" ? "Cold" : "Hot"));

    const increaseFanSpeed = () => setFanSpeed((prev) => Math.min(prev + 1, 5)); // Max fan speed 5
    const decreaseFanSpeed = () => setFanSpeed((prev) => Math.max(prev - 1, 1)); // Min fan speed 1


    const handleSliderChange = (e) => {
        setBrightness(e.target.value);
    };
    

    return (
        <div className="device">
            {/* {'Light' && (
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
                                    <input type="checkbox" className="switch-checkbox" />
                                    <span className="switch-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
            {/* {'Router' &&(
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
            )} */}
            {/* {'Refrigerator' && (
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
            )} */}
            {/* {'Camera' && (
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
            )} */}
            {/* {"Microwave" && (
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
                                    onChange={(e) => setHeatLevel(Number(e.target.value))}
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
                                    value={Math.floor(timer / 60)}
                                    onChange={(e) =>
                                        setTimer((Number(e.target.value) * 60) + (timer % 60))
                                    }
                                    className="hour-input"
                                />
                                <span>hr</span>
                                <input
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={timer % 60}
                                    onChange={(e) =>
                                        setTimer((Math.floor(timer / 60) * 60) + Number(e.target.value))
                                    }
                                    className="minute-input"
                                />
                                <span>min</span>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
            {"Air Conditioner" && (
                <div className="air-conditioner">
                    {/* Temperature Control */}
                    <div className="air-conditioner-temperature">
                        <h3 className="control-title">Temperature</h3>
                        <div className="temperature-controls">
                            <button onClick={decreaseTemperature} className="control-btn">-</button>
                            <p className="temperature-display">{temperature}°C</p>
                            <button onClick={increaseTemperature} className="control-btn">+</button>
                        </div>
                    </div>

                    {/* Mode Control */}
                    <div className="air-conditioner-mode">
                        <h3 className="control-title">Mode</h3>
                        <button
                            onClick={toggleMode}
                            className={`mode-btn ${mode === 'Hot' ? 'hot-mode' : 'cold-mode'}`}
                        >
                            {mode}
                        </button>
                    </div>

                    {/* Fan Speed Control */}
                    <div className="air-conditioner-fan">
                        <h3 className="control-title">Fan Speed</h3>
                        <div className="fan-controls">
                            <button onClick={decreaseFanSpeed} className="control-btn">-</button>
                            <p className="fan-speed-display">{fanSpeed}</p>
                            <button onClick={increaseFanSpeed} className="control-btn">+</button>
                        </div>
                    </div>

                    {/* Switch */}
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
