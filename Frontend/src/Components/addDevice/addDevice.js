import React, { useState } from 'react';
import './addDevice.css';
import houseService from '../../services/houseServices';

function AddDevice({ deviceData, devices, setDevices, Activeroom, setActiveHouse, activeHouse }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [showMessage, setShowMessage] = useState(false); // For showing confirmation message

    const filteredDeviceData = deviceData.filter(device =>
        device.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddDevice = async () => {
        const sameTypeDevices = devices.filter(d => d.name.startsWith(selectedDevice.name));

        const deviceNumbers = sameTypeDevices.map(d => {
            const match = d.name.match(/(\d+)$/);
            return match ? parseInt(match[1], 10) : 0;
        });

        const nextNumber = deviceNumbers.length > 0 ? Math.max(...deviceNumbers) + 1 : 1;

        const newDevice = {
            ...devices.find(d => d.type === selectedDevice.name),
            name: `${selectedDevice.name} ${nextNumber}`,
            status: 'Off',
            settings: {}
        };

        if (newDevice.type === "Light") {
            newDevice.settings.color = 'white';
            newDevice.settings.brightness = 50;
        }

        // Add other device types here...

        const updatedDevices = [...devices, newDevice];
        setDevices(updatedDevices);
        Activeroom.devices = updatedDevices;

        const updatedRooms = activeHouse.rooms.map(room =>
            room.name === Activeroom.name ? Activeroom : room
        );
        setActiveHouse({ ...activeHouse, rooms: updatedRooms });

        try {
            await houseService.updateHouse({ rooms: updatedRooms });
            setShowMessage(true); // Show the confirmation message
            setTimeout(() => setShowMessage(false), 1500); // Hide after 1.5 seconds
        } catch (error) {
            console.error('Error updating house:', error);
        }
    };

    return (
        <div className="add-device-container">
            <h3>Add Device</h3>
            <input
                type="text"
                className="device-search"
                placeholder="Search device"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="device-list">
                {filteredDeviceData.map((device, index) => (
                    <div
                        key={index}
                        className={`device-item ${selectedDevice?.name === device.name ? 'selected' : ''}`}
                        onClick={() => setSelectedDevice(prev => prev?.name === device.name ? null : device)}
                    >
                        <img src={device.img} alt={device.name} />
                        <p>{device.name}</p>
                    </div>
                ))}
            </div>
            <div className="buttons">
                <button onClick={handleAddDevice} disabled={!selectedDevice} className="confirm-button">Confirm</button>
            </div>

            {/* Confirmation Message */}
            {showMessage && (
                <div className="confirmation-message">
                    Device added successfully!
                </div>
            )}
        </div>
    );
}

export default AddDevice;
