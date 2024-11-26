import React, { useState, useRef, useEffect } from 'react';
import './rooms.css';
import Card from '../room/room';

function CardList() {
    const cardListRef = useRef(null);
    const [isScrollable, setIsScrollable] = useState(false);
    const rooomImages = {
        'Living Room': './image/living room.png',
        'Bedroom': './image/bedroom.jpg',
        'Kitchen': './image/kitchen.jpg',
        'Bathroom': './image/bathroom.jpg',
        'Garage': './image/garage.jpeg',
        'Garden': './image/garden.jpg',
    }
    const rooms = Array.from({ length: 6 }, (_, index) => ({
        title: `Kitchen ${index + 1}`,
        image_url: rooomImages['Garage'] // Add the image URL here
    }));
      
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
                    <Card image_url="./image/add.svg" title="Add Room" />
                </div>
                {rooms.map((room, index) => (
                    <div className='room-card' key={index}>
                        <Card image_url={room.image_url} title={room.title} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardList;
