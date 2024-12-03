import React from 'react';
import "./room.css";

function Room ({ image_url, title}){
    return (
        <div className="room">
            <div className="room-title">
                <div className="room-image">
                    <img src={image_url} alt='room'/>
                </div>
            </div>
            <h2>{title}</h2>
        </div>
    );
};

export default Room;
