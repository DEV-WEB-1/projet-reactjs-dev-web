import React, { useState } from 'react';
import './router.css';

function RouterDevice({ selectedDevice, setSelectedDevice }) {
    const [ssid, setSsid] = useState(selectedDevice.settings?.ssid || '');
    const [password, setPassword] = useState(selectedDevice.settings?.password || '');
    const [showPassword, setShowPassword] = useState(false);

    const handleConfirm = () => {
        setSelectedDevice(prev => ({
            ...prev,
            settings: {
                ...prev.settings,
                ssid: ssid,
                password: password,
            }
        }));
    };

    return (
        <div className='router'>
            <div className='control-setting'>
                <p>SSID</p>
                <input
                    type='text'
                    placeholder='SSID'
                    value={ssid}
                    onChange={(e) => setSsid(e.target.value)}
                />
            </div>
            <div className='control-setting'>
                <p>Password</p>
                <div className="password-field">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
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
            <button onClick={handleConfirm} className="router-button">
                Confirm
            </button>
        </div>
    );
}

export default RouterDevice;
