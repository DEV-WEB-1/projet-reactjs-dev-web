import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './rooms.css';
import Room from '../room/room';

function Rooms({ rooms, selectedFilter }) {
    const cardListRef = useRef(null);
    const [isScrollable, setIsScrollable] = useState(false);
    const navigate = useNavigate();
    const roomImages = {
        'livingroom': './image/livingroom.png',
        'bedroom': './image/bedroom.jpg',
        'kitchen': './image/kitchen.jpg',
        'bathroom': './image/bathroom.jpg',
        'garage': './image/garage.jpeg',
        'garden': './image/garden.jpg',
    };

    useEffect(() => {
        const checkScrollable = () => {
            if (cardListRef.current) {
                setIsScrollable(cardListRef.current.scrollWidth > cardListRef.current.clientWidth);
            }
        };

        checkScrollable();
        window.addEventListener('resize', checkScrollable);

        return () => {
            window.removeEventListener('resize', checkScrollable);
        };
    }, []);
    
    const handleAddRoomClick = () => {
        navigate('/add-room'); // Navigate to the AddRoom page
    };

    return (
        <div className='rooms'>
            <div className="room-list" ref={cardListRef}>
                <div className='add-room' onClick={handleAddRoomClick}>
                    <Room image_url="./image/add.svg" title={`Add ${selectedFilter ? selectedFilter.replace('_', ' ') : 'Room'}`} />
                </div>
                {rooms.map((room) => (
                    <div className='room-card' key={room._id}>
                        <Room image_url={roomImages[room.type]} title={room.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Rooms;
