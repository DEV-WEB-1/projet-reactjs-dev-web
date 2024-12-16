import "./roomPage.css";
import { useState, useEffect } from "react";
import { redirect, useParams } from "react-router-dom";
import Header from "../../Components/header/header";
import Title from "../../Components/title/title";
import RoomInfo from "../../Components/room info/roomInfo";
import Devices from "../../Components/devices/roomDevices";

function RoomPage({user, houses, activeHouse, setActiveHouse, rooms, setIsLoading}) {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [devices, setDevices] = useState([]);

    const {roomName} = useParams();
    const room = rooms.find(r => r.name === roomName);

    if (!room) {
        redirect('/home');
    }

    useEffect(() => {   
        setName(room.name);
        setType(room.type);
    }, [room]);

    useEffect(() => {
        setDevices(room.devices);
    }, [room]);

    return (
        <div className="roomPage">
            <Header
                sortedHouses={houses}
                setActiveHouse={setActiveHouse}
                activeHouse={activeHouse}
                user={user}
                setIsLoading={setIsLoading}
            />
            <div className='room-header'>
                <Title title={name} />
                {/* <button className='add-room-button' onClick={handleConfirm}>Delete</button> */}
            </div>  
            <RoomInfo
                roomName={name}
                setRoomName={setName}
                roomType={type}
                setRoomType={setType}
            />
            <Devices
                devices={devices}
                setDevices={setDevices}
            />
        </div>
    );
}

export default RoomPage;