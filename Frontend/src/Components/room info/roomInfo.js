import './roomInfo.css';
import Room from '../room/room';

const roomImages = {
    'livingroom': './image/livingroom.png',
    'bedroom': './image/bedroom.jpg',
    'kitchen': './image/kitchen.jpg',
    'bathroom': './image/bathroom.jpg',
    'garage': './image/garage.jpeg',
    'garden': './image/garden.jpg',
};

function RoomInfo() {
    return (
        <div className='room-info-container'>
            <div className="room-info">
                <div className='room-image'>
                    <Room image_url={roomImages['livingroom']}/>
                </div>
                <div className="room-title">
                    <h2>Living Room</h2>
                    <p>Living Room</p>
                </div>
            </div>
        </div>
    );
}

export default RoomInfo;