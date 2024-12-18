import React from 'react';
import LightDevice from './deviceTypes/light';
import RouterDevice from './deviceTypes/router';
import RefrigeratorDevice from './deviceTypes/refrigerator';
import CameraDevice from './deviceTypes/camera';
import MicrowaveDevice from './deviceTypes/microwave';
import AirConditionerDevice from './deviceTypes/airConditioner';
import ElectricStoveDevice from './deviceTypes/electricStove';
import HeaterDevice from './deviceTypes/heater';
import TVDevice from './deviceTypes/tv';
import './device.css';

function Device({ selectedDevice, setSelectedDevice }) {
    return (
        <div className="device">
            {selectedDevice.type === "Light" && (
                <LightDevice selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
            )}
            {selectedDevice.type === "Router" && (
                <RouterDevice selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
            )}
            {selectedDevice.type === "Refrigerator" && (
                <RefrigeratorDevice selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
            )}
            {selectedDevice.type === "Camera" && (
                <CameraDevice selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
            )}
            {selectedDevice.type === "Microwave" && (
                <MicrowaveDevice selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
            )}
            {selectedDevice.type === "Air Conditioner" && (
                <AirConditionerDevice selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
            )}
            {selectedDevice.type === "Electric Stove" && (
                <ElectricStoveDevice selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
            )}
            {selectedDevice.type === "Heater" && (
                <HeaterDevice selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
            )}
            {selectedDevice.type === "TV" && (
                <TVDevice selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
            )}
        </div>
    );
}

export default Device;
