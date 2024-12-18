import React from 'react';
import './camera.css';

function CameraDevice({ selectedDevice, setSelectedDevice }) {
    return (
        <div className="camera">
            <div className="camera-screen">
                {selectedDevice.status === 'On' ? (
                    <img src="../image/cameraOn.jpg" alt="Camera On" className="camera-live" />
                ) : (
                    <div className="camera-content">
                        <img src="../image/cameraOff.svg" alt="Camera Offline" />
                        <p>Camera Offline</p>
                    </div>
                )}
            </div>
            <div className="camera-button">
                <p>{selectedDevice.name}</p>
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

export default CameraDevice;
