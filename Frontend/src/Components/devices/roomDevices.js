import {useState } from 'react';
import Device from '../device/device'; 
import houseService from '../../services/houseServices';
import AddDevice from '../addDevice/addDevice';
import './roomDevices.css';

function RoomDevices({devices, setDevices, activeHouse, setActiveHouse, Activeroom}) {
    const deviceData = [
        { name: "Refrigerator", img: "../image/refrigerator.png" }, //done
        { name: "Microwave", img: "../image/microwave.png" },//done
        { name: "Oven", img: "../image/oven.png" }, //p
        { name: "Dishwasher", img: "../image/dishwasher.png" }, //p
        { name: "Washing Machine", img: "../image/washing_machine.png" }, //p
        { name: "Air Conditioner", img: "../image/air_conditioner.png" }, //done
        { name: "Heater", img: "../image/heater.png" }, //done
        { name: "Automatic Irrigation", img: "../image/irrigation.png" },
        { name: "Electric Stove", img: "../image/electric_stove.png" }, //done
        { name: "TV", img: "../image/tv.png" },//done
        { name: "Gas Detector", img: "../image/gas_detector.png" },
        { name: "Motion Detector", img: "../image/motion_detector.png" },
        { name: "Light", img: "../image/light.png" }, //done
        { name: "Camera", img: "../image/camera.png" }, //done
        { name: "Window", img: "../image/window.png" },
        { name: "Router", img: "../image/router.png" }, //done
        { name: "Temperature Detector", img: "../image/temperature_detector.png" },
        { name: "Humidity Detector", img: "../image/humidity_detector.png" },
        { name: "Pet Feeder", img: "../image/pet_feeder.png" },
        { name: "Garage Door", img: "../image/garage_door.png" },
        { name: "Power Meter", img: "../image/power_meter.png" },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDevice, setSelectedDevice] = useState(null); // For modal
    const [addDevice, setAddDevice] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deviceToDelete, setDeviceToDelete] = useState(null);


    console.log(devices);

    const filteredDevices = devices.filter(device =>
        device.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedDevices = [...filteredDevices].sort((a, b) => {
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;
        return 0;
    });
    
    const handleDelete = async (deviceToDelete) => {
        const updatedDevices = devices.filter(device => device.name !== deviceToDelete.name);
        setDevices(updatedDevices);
        Activeroom.devices = updatedDevices;
    
        const updatedRooms = activeHouse.rooms.map(room => 
            room.name === Activeroom.name ? Activeroom : room
        );
        setActiveHouse({ ...activeHouse, rooms: updatedRooms });
    
        try {
            await houseService.updateHouse({ rooms: updatedRooms });
            console.log(`${deviceToDelete.name} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting device:', error);
        }
    };
    
    
    

    const closeModal = async () =>  {
        if (selectedDevice)
        {
            console.log(selectedDevice)
            const updatedDevices = devices.map(device => device.name === selectedDevice.name ? selectedDevice : device);
            setDevices(updatedDevices);
            Activeroom.devices = updatedDevices;

            const updatedRooms = activeHouse.rooms.map(room => room.name === Activeroom.name ? Activeroom : room);
            setActiveHouse({ ...activeHouse, rooms: updatedRooms });

            try {
                await houseService.updateHouse({ rooms: updatedRooms });
            } catch (error) {
                console.error('Error updating house:', error);
            }
            setSelectedDevice(null);
        }  
        else if (addDevice) {
            setAddDevice(false);
        }
        
    };

    return (
        <div className="devices-container">
            <div className="devices-title">
                <h3>Devices</h3>
                <input
                    type="text"
                    className="devices-search"
                    placeholder="Device name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="devices-list">
                <div className="add-devices-item" onClick={() => setAddDevice(true)}>
                    <div className='add-device-button'>
                        <img src="../image/add.svg" alt="add" />
                    </div>
                </div>
                {sortedDevices.map((device) => (
                    <div className="devices-item" key={device.name} onClick={() => setSelectedDevice(device)}>
                        {/* Delete Button */}
                        <button
                            className="delete-button"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent modal from opening
                                setDeviceToDelete(device);
                                setShowDeleteModal(true);
                            }}
                        >
                            <img src="../image/remove.svg" alt="" />
                        </button>

                        {/* Device Image and Name */}
                        <img src={deviceData.find((d) => d.name === device.type).img} alt="device" />
                        <p>{device.name}</p>
                    </div>
                ))}



            </div>

            {/* Modal for showing the Device */}
            {selectedDevice && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <Device selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
                    </div>
                </div>
            )}

            {/* Modal for adding a new Device */}
            {addDevice && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <AddDevice deviceData={deviceData} devices={devices} setDevices={setDevices} Activeroom={Activeroom} setActiveHouse={setActiveHouse} activeHouse={activeHouse}/>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirm Deletion</h3>
                        <p className="modal-text">Are you sure you want to delete "{deviceToDelete?.name}"?</p>
                        <div className="modal-buttons">
                            <button 
                                onClick={() => {
                                    handleDelete(deviceToDelete);
                                    setShowDeleteModal(false);
                                }}
                                className="confirm-button"
                            >
                                Yes, Delete
                            </button>
                            <button 
                                onClick={() => setShowDeleteModal(false)}
                                className="cancel-button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default RoomDevices;