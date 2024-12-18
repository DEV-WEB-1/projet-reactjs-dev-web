import "./roomPage.css";
import { useState, useEffect } from "react";
import { redirect, useParams } from "react-router-dom";
import Header from "../../Components/header/header";
import Title from "../../Components/title/title";
import RoomInfo from "../../Components/room info/roomInfo";
import Devices from "../../Components/devices/roomDevices";
import houseService from "../../services/houseServices";

function RoomPage({user, houses, activeHouse, setActiveHouse, rooms, setIsLoading}) {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [devices, setDevices] = useState([]);

    const {roomName} = useParams();
    const room = rooms.find(r => r.name === roomName);

    if (!room) {
        redirect('/home');
    }

    const handleConfirm = async () => {
        try{
            const index = rooms.findIndex(r => r.name === roomName);
            const updatedRooms = [...rooms];
            updatedRooms[index] = {...room, name, type, devices};
            setActiveHouse({...activeHouse, rooms: updatedRooms});
            const updatedHouse = await houseService.updateHouse({...activeHouse, rooms: updatedRooms});
            setActiveHouse(updatedHouse);
        }catch(error){
            console.error('Error adding room:', error);
        }
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
                <button className='add-room-button' onClick={handleConfirm}>Confirm</button>
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
                activeHouse={activeHouse}
                setActiveHouse={setActiveHouse}
                Activeroom = {room}
            />
        </div>
    );
}

export default RoomPage;