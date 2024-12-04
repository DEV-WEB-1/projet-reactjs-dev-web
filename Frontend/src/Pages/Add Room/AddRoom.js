import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/header/header';
import Title from '../../Components/title/title';
import RoomInfo from '../../Components/room info/roomInfo';
import Devices from '../../Components/devices/devices';
import houseService from '../../services/houseServices';
import './AddRoom.css';

function AddRoom({ user, houses, activeHouse, setActiveHouse }) {
  const [roomName, setRoomName] = useState('Living Room');
  const [roomType, setRoomType] = useState('livingroom');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const navigate = useNavigate();

  const getDeviceWithNumber = (devices) => {
    const deviceCount = {};
    return devices.map((device) => {
      deviceCount[device] = (deviceCount[device] || 0) + 1;
      return {
        name: `${device} ${deviceCount[device]}`,
        type: device,
        status: 'off',
        "room-name": roomName,
        settings: {},
      };
    });
  };

  const handleConfirm = async () => {
    const newRoom = {
      name: roomName,
      type: roomType,
      devices: getDeviceWithNumber(selectedDevices),
    };

    try {
      console.log(activeHouse);
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
        exampleUser={user}
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
