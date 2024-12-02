import './devices.css';

function Devices() {
    const deviceData = [
        { id: 1, name: "Device 1", img: "./image/router.svg" },
        { id: 2, name: "Device 2", img: "./image/router.svg" },
        { id: 3, name: "Device 3", img: "./image/router.svg" },
        { id: 4, name: "Device 4", img: "./image/router.svg" },
        { id: 5, name: "Device 5", img: "./image/router.svg" },
        { id: 6, name: "Device 6", img: "./image/router.svg" },
        { id: 7, name: "Device 7", img: "./image/router.svg" },
        { id: 8, name: "Device 8", img: "./image/router.svg" },
    ];

    return (
        <div className="devices-container">
            <div className="devices-title">
                <h3>Devices</h3>
                <input type="text" className='devices-search' placeholder='Search'/>
            </div>
            <div className="devices-list">
                {deviceData.map((device) => (
                    <div className="devices-item" key={device.id}>
                        <img src={device.img} alt='device'/>
                        <p>{device.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Devices;
