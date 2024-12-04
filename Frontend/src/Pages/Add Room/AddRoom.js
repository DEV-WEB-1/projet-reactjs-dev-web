import React from 'react';
import Header from '../../Components/header/header';
import Title from '../../Components/title/title';
import RoomInfo from '../../Components/room info/roomInfo';
import Devices from '../../Components/devices/devices';
import './AddRoom.css';

function AddRoom({ user, houses, activeHouse, setActiveHouse }) {
  return (
    <div className='add-room-container'>
        <Header 
            sortedHouses={houses} 
            setActiveHouse={setActiveHouse} 
            activeHouse={activeHouse} 
            exampleUser={user}
        />
        <div className='add-room-header'>
          <Title title='Add Room'/> 
          <button className='add-room-button'>Confirm</button> 
        </div>
        
        <RoomInfo/>    
        <Devices/>
    </div>
  );
}

export default AddRoom;
