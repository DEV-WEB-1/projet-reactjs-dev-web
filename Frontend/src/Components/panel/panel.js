import React, { useState, useEffect } from 'react';
import './panel.css';
import houseService from '../../services/houseServices';

const svgs = {
    wifi: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/wifi-low-signal-solid-rounded.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#9b9b9b">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.66779 4.50997C6.0874 2.91996 8.94247 2 12.0001 2C15.0576 2 17.9127 2.91996 20.3323 4.50997L20.4786 4.60593C21.5958 5.33798 22.4981 5.92924 22.7123 7.20218C22.8258 7.877 22.6756 8.46261 22.3741 9.04912C22.0968 9.58861 21.6621 10.1813 21.1513 10.878L17.8453 15.3867C17.61 15.7076 17.4923 15.8681 17.3309 15.916C17.1695 15.9639 16.9638 15.8862 16.5523 15.7308C15.2318 15.2319 13.5917 15 12 15C10.4083 15 8.76822 15.2319 7.44775 15.7307C7.03632 15.8862 6.8306 15.9639 6.66918 15.916C6.50776 15.8681 6.39009 15.7076 6.15475 15.3866L2.84886 10.878C2.33797 10.1813 1.90334 9.58862 1.626 9.04912C1.3245 8.46261 1.17434 7.877 1.28786 7.20218C1.50199 5.92924 2.4043 5.33798 3.52149 4.60593L3.66779 4.50997ZM15.3369 16.9125C14.3614 16.6436 13.1959 16.5 11.9991 16.5C10.8023 16.5 9.63689 16.6436 8.66135 16.9125L8.66134 16.9125C8.20438 17.0384 7.97589 17.1014 7.88032 17.3194C7.87072 17.3414 7.86063 17.3704 7.85457 17.3935C7.79427 17.6238 7.94749 17.8328 8.25393 18.2507C8.95483 19.2067 9.52923 19.9901 10.0553 20.5271C10.6004 21.0835 11.2113 21.5 11.9992 21.5C12.7871 21.5 13.398 21.0835 13.9431 20.5271C14.4691 19.9901 15.0435 19.2067 15.7444 18.2508C16.0508 17.8328 16.2041 17.6238 16.1437 17.3935C16.1377 17.3704 16.1276 17.3414 16.118 17.3195C16.0225 17.1014 15.794 17.0385 15.3369 16.9125Z" fill="#9b9b9b"></path>
    </svg>`,
    power : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/zap-solid-rounded.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#8ebbff">
    <path d="M16.0174 2.32514C16.5423 2.40348 17.1136 2.59299 17.4412 3.16038C17.7679 3.72637 17.6485 4.31617 17.4564 4.81136C17.2716 5.2879 16.9439 5.86433 16.5622 6.53565L15.4612 8.47252C15.253 8.8388 15.1189 9.07576 15.0336 9.25737C14.9695 9.39366 14.9577 9.4495 14.9558 9.45874C14.9591 9.56981 15.0177 9.67007 15.109 9.7266C15.1189 9.72978 15.173 9.74649 15.3181 9.75782C15.5168 9.77336 15.8183 9.7739 16.2381 9.7739C16.7269 9.77389 17.137 9.77388 17.4569 9.79838C17.7661 9.82206 18.1304 9.87463 18.4357 10.0776C19.0285 10.4716 19.3368 11.1749 19.2287 11.8773C19.173 12.2386 18.968 12.5434 18.7774 12.7893C18.5804 13.0435 18.3047 13.3484 17.9758 13.7121L12.3841 19.8952C11.8712 20.4625 11.4394 20.94 11.0881 21.2463C10.9095 21.402 10.6984 21.5621 10.463 21.6576C10.2036 21.7629 9.86139 21.8076 9.52149 21.6305C9.18235 21.4538 9.02299 21.1486 8.9596 20.8774C8.90187 20.6304 8.91024 20.3659 8.93387 20.1296C8.98034 19.6648 9.11958 19.035 9.28511 18.2864L9.98337 15.1277C10.1219 14.5012 10.2064 14.1103 10.228 13.8242C10.2577 13.5884 10.052 13.4872 9.94542 13.4662C9.6639 13.4254 9.267 13.4236 8.62816 13.4236L8.1121 13.4236C7.41921 13.4236 6.81605 13.4237 6.34997 13.3543C5.85689 13.2808 5.32903 13.1044 4.99753 12.5916C4.66682 12.0801 4.72084 11.5262 4.85378 11.0454C4.97975 10.5899 5.22449 10.0364 5.50617 9.39944L7.35643 5.21448L7.35643 5.21448C7.617 4.62508 7.83611 4.12946 8.05957 3.74142C8.2964 3.33017 8.57004 2.98046 8.9698 2.71931C9.36982 2.45798 9.79964 2.34835 10.2707 2.2977C10.7147 2.24997 11.2547 2.24998 11.896 2.25L14.0837 2.25C14.8523 2.24995 15.5134 2.24991 16.0174 2.32514Z" fill="#8ebbff"></path>
    </svg>`,
    weather : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/temperature-solid-rounded.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#f8e71c">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1459 1.27079C12.8412 1.24999 12.47 1.24999 12.0253 1.25H12.0253C11.5806 1.24999 11.1588 1.24999 10.8541 1.27079C10.5368 1.29245 10.2372 1.33914 9.94665 1.45953C9.27321 1.73863 8.73814 2.2737 8.45905 2.94713C8.33865 3.23764 8.29196 3.53731 8.2703 3.85456C8.2495 4.15932 8.2495 4.53054 8.24951 4.97522V4.97522L8.24951 12.6414C7.0263 13.6949 6.25 15.2569 6.25 17C6.25 20.1756 8.82436 22.75 12 22.75C15.1756 22.75 17.75 20.1756 17.75 17C17.75 15.2569 16.9737 13.6949 15.7505 12.6414V4.97524C15.7505 4.53055 15.7505 4.15933 15.7297 3.85456C15.708 3.53731 15.6614 3.23764 15.541 2.94713C15.2619 2.2737 14.7268 1.73863 14.0534 1.45953C13.7628 1.33914 13.4632 1.29245 13.1459 1.27079ZM12 7C12.5523 7 13 7.44772 13 8V14.4375C14.0243 14.8375 14.75 15.834 14.75 17C14.75 18.5188 13.5188 19.75 12 19.75C10.4812 19.75 9.25 18.5188 9.25 17C9.25 15.834 9.97566 14.8375 11 14.4375V8C11 7.44772 11.4477 7 12 7Z" fill="#f8e71c"></path>0
    </svg>`,
    humidity : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/humidity-solid-rounded.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#4a90e2">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0131 2.46876C13.3082 0.843746 10.6918 0.843746 8.98694 2.46876C7.73305 3.66394 6.19137 5.31616 4.9572 7.21627C3.73034 9.10512 2.75 11.3266 2.75 13.6399C2.75 18.1253 6.25883 22.75 12 22.75C17.7412 22.75 21.25 18.1253 21.25 13.6399C21.25 11.3266 20.2697 9.10513 19.0428 7.21627C17.8086 5.31616 16.267 3.66394 15.0131 2.46876ZM10.3279 3.88604C11.2812 2.97738 12.7188 2.97738 13.6721 3.88604C14.8654 5.02346 16.2906 6.55795 17.4115 8.28368C18.4849 9.93624 19.2276 11.6852 19.2973 13.3805C18.0238 14.0355 15.5565 14.5611 12.4742 12.8298C9.56427 11.1953 7.00776 10.8671 5.18542 11.0421C5.51852 10.1102 6.0046 9.18269 6.58853 8.28368C7.70944 6.55795 9.13464 5.02346 10.3279 3.88604Z" fill="#4a90e2"></path>
    </svg>`
};

function Panel({ settings, houseId }) {
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [wifiStatus, setWifiStatus] = useState('Off');

    useEffect(() => {
        if (settings && settings.find(device => device.name === 'general-router')) {
            const router = settings.find(device => device.name === 'general-router');
            setWifiStatus(router.status || 'Off');
            setSelectedIcon(router.status === 'On' ? 'wifi' : null); // Set icon as selected if Wi-Fi is on
        }
    }, [settings]);

    const handleIconClick = async (icon) => {
        if (selectedIcon === icon) {
            setSelectedIcon(null);
        } else {
            setSelectedIcon(icon);
        }
    };

    const toggleWiFiStatus = async () => {
        const newStatus = wifiStatus === 'On' ? 'Off' : 'On';
        setWifiStatus(newStatus);
        
        if (settings) {
            const updatedDevices = settings.map(device => {
                if (device.name === 'general-router') {
                    return { ...device, status: newStatus };
                }
                return device;
            });

            try {
                await houseService.updateHouse(houseId, { rooms: [{ type: 'general', devices: updatedDevices }] });
                console.log('Wi-Fi status updated successfully');
                setSelectedIcon(newStatus === 'On' ? 'wifi' : null); // Update selected icon based on new status
            } catch (error) {
                console.error('Error updating Wi-Fi status:', error);
            }
        } else {
            console.error('General room settings not found.');
        }
    };

    return (
        <div className="panel">
            <div className="camera-panel">
                <div className='grey-overlay'> 
                    <div className='overlay-content'> 
                        <img src='./image/cameraOff.svg' alt='Logo' /> 
                        <p>Camera Offline</p> 
                    </div> 
                </div>
                <p>Camera 1</p>
            </div>

            <div className="control-panel">
                <div 
                    className={`wifi-info ${selectedIcon === 'wifi' ? 'selected' : ''}`}
                    onClick={() => {
                        handleIconClick('wifi');
                        toggleWiFiStatus();
                    }}
                >
                    <div className="wifi-icon" dangerouslySetInnerHTML={{ __html: svgs.wifi }} />
                    <div className="wifi-details">
                        <p className="wifi-text">Wi-Fi</p>
                        <p className="status-text">{wifiStatus}</p>
                    </div>
                </div>
                <div className='control-info'>
                    <div className="any-details">
                        <div className="any-icon" dangerouslySetInnerHTML={{ __html: svgs.power }} />
                        <p className="any-text">This Month</p>
                    </div>
                    <p className='any-value'>{settings?.find(device => device.name === 'general-compteur')?.settings['this-month'] || 0}</p>
                </div>
                <div className='control-info'>
                    <div className="any-details">
                        <div className="any-icon" dangerouslySetInnerHTML={{ __html: svgs.weather }} />
                        <p className="any-text">Weather</p>
                    </div>
                    <p className='any-value'>{settings?.find(device => device.name === 'general-temperature-sensor')?.settings.temperature || 'N/A'}</p>
                </div>
                <div className='control-info'>
                    <div className="any-details">
                        <div className="any-icon" dangerouslySetInnerHTML={{ __html: svgs.humidity }} />
                        <p className="any-text">Humidity</p>
                    </div>
                    <p className='any-value'>{settings?.find(device => device.name === 'general-humidity-sensor')?.settings.humidity || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}

export default Panel;
