import './devices.css';
import { useState } from 'react';
    
function Devices() {
    const deviceData = [
        { name: "Refrigerator", img: "./image/refrigerator.png" },
        { name: "Microwave", img: "./image/microwave.png" },
        { name: "Oven", img: "./image/oven.png" },
        { name: "Dishwasher", img: "./image/dishwasher.png" },
        { name: "Washing Machine", img: "./image/washing_machine.png" },
        { name: "Air Conditioner", img: "./image/air_conditioner.png" },
        { name: "Heater", img: "./image/heater.png" },
        { name: "Automatic Irrigation", img: "./image/irrigation.png" },
        { name: "Electric Stove", img: "./image/electric_stove.png" },
        { name: "TV", img: "./image/tv.png" },
        { name: "Gas Detector", img: "./image/gas_detector.png" },
        { name: "Motion Detector", img: "./image/motion_detector.png" },
        { name: "Light", img: "./image/light.png" },
        { name: "Camera", img: "./image/camera.png" },
        { name: "Window", img: "./image/window.png" },
        { name: "Router", img: "./image/router.png" },
        { name: "Temperature Detector", img: "./image/temperature_detector.png" },
        { name: "Humidity Detector", img: "./image/humidity_detector.png" },
        { name: "Pet Feeder", img: "./image/pet_feeder.png" },
        { name: "Garage Door", img: "./image/garage_door.png" },
        { name: "Power Meter", img: "./image/power_meter.png" },
    ];
    
    const [selectedDevices, setSelectedDevices] = useState([]);

    const handleDeviceClick = (name) => {
        setSelectedDevices((prevSelected) =>
            prevSelected.includes(name)
                ? prevSelected.filter(deviceName => deviceName !== name)
                : [...prevSelected, name]
        );
    };

    return (
        <div className="devices-container">
            <div className="devices-title">
                <h3>Devices</h3>
                <input type="text" className='devices-search' placeholder='Device name'/>
            </div>
            <div className="devices-list">
                {deviceData.map((device) => (
                    <div
                        className={`devices-item ${selectedDevices.includes(device.name) ? 'selected' : ''}`}
                        key={device.name}
                        onClick={() => handleDeviceClick(device.name)}
                    >
                        <img src={device.img} alt='device'/>
                        <p>{device.name}</p>
                        {selectedDevices.includes(device.name) && <div className="selected-icon">✓</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Devices;
