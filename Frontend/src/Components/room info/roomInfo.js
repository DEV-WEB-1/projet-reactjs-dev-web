import './roomInfo.css';
import Room from '../room/room';
import Filter from '../filter/filter'; // Ensure this path is correct
import { useState } from 'react';

const roomImages = {
  'livingroom': './image/livingroom.png',
  'bedroom': './image/bedroom.jpg',
  'kitchen': './image/kitchen.jpg',
  'bathroom': './image/bathroom.jpg',
  'garage': './image/garage.jpeg',
  'garden': './image/garden.jpg',
};

const roomNames = {
  'livingroom': 'Living Room',
  'bedroom': 'Bedroom',
  'kitchen': 'Kitchen',
  'bathroom': 'Bathroom',
  'garage': 'Garage',
  'garden': 'Garden',
};

function RoomInfo() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingType, setIsEditingType] = useState(false);
  const [roomName, setRoomName] = useState('Living Room');
  const [roomType, setRoomType] = useState('livingroom');

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleTypeEdit = () => {
    setIsEditingType(true);
  };

  const handleNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleFilterChange = (selectedIcon) => {
    if (selectedIcon == null) {
      setRoomType(roomType);
    }
    else if (roomType !== selectedIcon) {
      setRoomType(selectedIcon);
      // Remove the line that updates the room name
    }
    
    setIsEditingType(false);
  };

  const handleNameBlur = () => {
    setIsEditingName(false);
  };

  return (
    <div className='room-info-container'>
      <div className="room-info">
        <div className='room-image'>
          <Room image_url={roomImages[roomType]} />
        </div>
        <div className="room-title">
          <div className='room-name'>
            {isEditingName ? (
              <input
                type="text"
                className="room-name-input"
                value={roomName}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                autoFocus
              />
            ) : (
              <>
                <h2>{roomName}</h2>
                <img src="./image/edit.svg" alt="edit" onClick={handleNameEdit} />
              </>
            )}
          </div>
          <div className='room-type'>
            <p>{roomNames[roomType]}</p>
            {!isEditingType && <img src="./image/edit.svg" alt="edit" onClick={handleTypeEdit} />}
            {isEditingType && (
              <Filter selectedType={roomType} onFilterChange={handleFilterChange} autoFocus />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomInfo;
