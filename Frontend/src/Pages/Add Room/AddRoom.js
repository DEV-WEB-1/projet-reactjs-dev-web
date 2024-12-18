import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/header/header';
import Title from '../../Components/title/title';
import RoomInfo from '../../Components/room info/roomInfo';
import Devices from '../../Components/devices/devices';
import houseService from '../../services/houseServices';
import './AddRoom.css';

function AddRoom({ user, houses, activeHouse, setActiveHouse, setIsLoading}) {
  const [roomName, setRoomName] = useState('Living Room');
  const [roomType, setRoomType] = useState('livingroom');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const navigate = useNavigate();

  const getDeviceWithNumber = (devices) => {
    const deviceCount = {};
    return devices.map((device) => {
      deviceCount[device] = (deviceCount[device] || 0) + 1;
      const deviceSettings = {};
      if (device === 'Light'){
        deviceSettings.color = 'white';
        deviceSettings.brightness = 0;
      }else if (device === 'Router'){
        deviceSettings.ssid = "router";
        deviceSettings.password = "";
      }else if (device === 'Refrigerator'){
        deviceSettings.topLevel = 1;
        deviceSettings.bottomLevel = 1;
      }else if (device === 'Microwave'){
        deviceSettings.heatLevel = 1;
        deviceSettings.hour = 0;
        deviceSettings.minute = 0;
      }else if (device === 'Air Conditioner'){ 
        deviceSettings.temperature = 20;
        deviceSettings.mode = "Cold";
        deviceSettings.fanSpeed = 1;
      }else if (device === 'Electric Stove'){
        deviceSettings.topLeft = 0;
        deviceSettings.topRight = 0;
        deviceSettings.bottomLeft = 0;
        deviceSettings.bottomRight = 0;
      }else if (device === 'Heater'){
        deviceSettings.heatLevel = 1;
      }else if (device === 'TV'){
        deviceSettings.volume = 50;
      }
      return {
        name: `${device} ${deviceCount[device]}`,
        type: device,
        status: 'Off',
        "room-name": roomName,
        settings: deviceSettings,
      };
    });
  };

  const handleConfirm = async () => {
    const newRoom = {
      name: roomName,
      type: roomType,
      devices: getDeviceWithNumber(selectedDevices),
    };

    console.log(newRoom);

    try {
      // Ensure activeHouse is not null or undefined
      if (!activeHouse) {
        throw new Error('No active house selected.');
      }

      const updatedHouse = await houseService.updateHouse({
        rooms: [...activeHouse.rooms, newRoom],
      });

      console.log('Updated House:', updatedHouse); // Log the response
      setActiveHouse(updatedHouse);
      navigate('/home'); // Navigate to home page
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  return (
    <div className='add-room-container'>
      <Header
        sortedHouses={houses}
        setActiveHouse={setActiveHouse}
        activeHouse={activeHouse}
        user={user}
        setIsLoading={setIsLoading}
      />
      <div className='add-room-header'>
        <Title title='Add Room' />
        <button className='add-room-button' onClick={handleConfirm}>Confirm</button>
      </div>

      <RoomInfo
        roomName={roomName}
        setRoomName={setRoomName}
        roomType={roomType}
        setRoomType={setRoomType}
      />
      <Devices selectedDevices={selectedDevices} setSelectedDevices={setSelectedDevices} />
    </div>
  );
}

export default AddRoom;
