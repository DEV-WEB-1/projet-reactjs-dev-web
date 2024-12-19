import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/UserServices';
import houseService from '../../services/houseServices';
import "./houses.css";
import "../home/home.css"

function Houses({ user, setUser, houses, setHouses, setActiveHouse, isLoading, setIsLoading }) {
    const navigate = useNavigate();
    const hasFetchedHouses = useRef(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newHouseName, setNewHouseName] = useState('');

    const fetchUserHouses = async () => {
        try {
            setIsLoading(true);
            const userHouses = await userService.getUserHouses();
            const houses = [...userHouses.adminHouses, ...userHouses.invitedHouses];
            setHouses(houses);
        } catch (error) {
            console.error("Error fetching user houses:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleHouseClick = async (house) => {
        try {
            setIsLoading(true);
            const activeHouseDetail = await houseService.getHouse(house.id);
            setActiveHouse(activeHouseDetail);
            navigate('/home');
        } catch (error) {
            console.error("Error setting active house:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddHouseClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmAddHouse = async () => {
        if (newHouseName) {
            try {
                setIsLoading(true);
                const newHouse = await houseService.createHouse({ name: newHouseName });
                const updatedHouses = [...houses, { id: newHouse._id, nom: newHouseName }];
                setHouses(updatedHouses);
                setActiveHouse(newHouse);
                const updatedUserData = await userService.updateUser({ admin: [...user.admin, newHouse._id] });
                setUser(updatedUserData);
                setIsModalOpen(false);
                setNewHouseName('');
                navigate('/home');
            } catch (error) {
                console.error("Error adding new house:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            alert('Please enter a house name');
        }
    };

    const handleCancelAddHouse = () => {
        setIsModalOpen(false);
        setNewHouseName('');
    };

    useEffect(() => {
        if (user && !hasFetchedHouses.current) {
            fetchUserHouses();
            hasFetchedHouses.current = true;
        }
    }, [user, setHouses]);

    return (
        <div className={`home-container ${isLoading ? 'loading' : ''}`}>
            {isLoading && <div className="loader"></div>}
            <div className='houses-container'>
                <h2>Your houses</h2>
                <div className='houses-list'>
                    <div className='add-house' onClick={handleAddHouseClick}>
                        <img src="../image/add.svg" alt="Add House" />
                    </div>
                    {houses && houses.map((house) => (
                        <div className='house' key={house.id} onClick={() => handleHouseClick(house)}>
                            <img className="home-icon" src="../image/home2.svg" alt="" />
                            <img className="type-icon" src={`../image/${user.admin.includes(house.id) ? 'admin' : 'invited'}.svg`} alt="" />
                            <p className="house-name">{house.nom}</p>
                        </div>
                    ))}
                </div>

                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="new-house-info">
                            <h3>Add a new House</h3>
                            <input
                                type="text"
                                placeholder="House name"
                                value={newHouseName}
                                onChange={(e) => setNewHouseName(e.target.value)}
                            />
                            <div className="modal-buttons">
                                <button onClick={handleConfirmAddHouse}>Confirm</button>
                                <button onClick={handleCancelAddHouse}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Houses;
