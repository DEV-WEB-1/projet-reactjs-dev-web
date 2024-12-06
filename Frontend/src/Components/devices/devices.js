import './devices.css';
import { useEffect, useState } from 'react';

function Devices({ selectedDevices, setSelectedDevices }) {
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

  const [searchQuery, setSearchQuery] = useState('');

  const handleDeviceClick = (name) => {
    setSelectedDevices((prevSelected) => [...prevSelected, name]);
  };

  const handleRemoveDevice = (name, e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent
    setSelectedDevices((prevSelected) => {
      const index = prevSelected.indexOf(name);
      if (index !== -1) {
        const updatedList = [...prevSelected];
        updatedList.splice(index, 1);
        return updatedList;
      }
      return prevSelected;
    });
  };

  const countSelectedDevices = (name) => {
    return selectedDevices.filter(deviceName => deviceName === name).length;
  };

  useEffect(() => {
    document.querySelectorAll('.devices-item').forEach(item => {
      const count = countSelectedDevices(item.querySelector('p').innerText);
      item.classList.toggle('selected', count > 0);
    });
  }, [selectedDevices]);

  const filteredDevices = deviceData.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="devices-container">
      <div className="devices-title">
        <h3>Devices</h3>
        <input
          type="text"
          className='devices-search'
          placeholder='Device name'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="devices-list">
        {filteredDevices.map((device) => (
          <div
            className={`devices-item`}
            key={device.name}
            onClick={() => handleDeviceClick(device.name)}
          >
            <img src={device.img} alt='device' />
            <p>{device.name}</p>
            {countSelectedDevices(device.name) > 0 && (
              <>
                <div className="selected-icon">
                  <p>{countSelectedDevices(device.name)}</p>
                </div>
                <div
                  className="remove-icon"
                  onClick={(e) => handleRemoveDevice(device.name, e)}
                >
                  <img src='./image/remove.svg' alt='remove'/>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Devices;
