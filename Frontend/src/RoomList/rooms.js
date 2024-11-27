import React, { useState, useRef, useEffect } from 'react';
import './rooms.css';
import Room from '../room/room';

function Rooms({ rooms, selectedFilter }) {
    const cardListRef = useRef(null);
    const [isScrollable, setIsScrollable] = useState(false);
    const roomImages = {
        'livingroom': './image/living room.png',
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
    
    return (
        <div className='rooms'>
            <div className="room-list" ref={cardListRef}>
                <div className='add-room'>
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
