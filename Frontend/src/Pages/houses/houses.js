import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/UserServices';
import houseService from '../../services/houseServices';
import "./houses.css";

function Houses({ user, setUser, houses, setHouses, setActiveHouse, setIsLoading }) {
    const navigate = useNavigate();
    const hasFetchedHouses = useRef(false); // Tracks if houses have been fetched
    const [isModalOpen, setIsModalOpen] = useState(false); // Controls the modal visibility
    const [newHouseName, setNewHouseName] = useState(''); // Stores the new house name

    const fetchUserHouses = async () => {
        try {
            console.log('Fetching user houses...');
            const userHouses = await userService.getUserHouses();
            const houses = [...userHouses.adminHouses, ...userHouses.invitedHouses];
            setHouses(houses);
        } catch (error) {
            console.error("Error fetching user houses:", error);
        }
    };

    const handleHouseClick = async (house) => {
        setIsLoading(true);
        try {
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
        setIsModalOpen(true); // Show the modal when 'Add House' is clicked
    };

    const handleConfirmAddHouse = async () => {
        if (newHouseName) {
            try {
                console.log('Adding new house:', newHouseName);
                const newHouse = await houseService.createHouse({ name: newHouseName });
                console.log('New House:', newHouse);
                const updatedHouses = [...houses, {id: newHouse._id, nom: newHouseName}]; // Update state with the newly added house
                setHouses(updatedHouses);
                setActiveHouse(newHouse);
                const updatedUserData = await userService.updateUser({ admin: [...user.admin, newHouse._id] }); // Update user with new house data
                setUser(updatedUserData);
                setIsModalOpen(false); // Close the modal
                setNewHouseName(''); // Reset the input field
                navigate('/home');
            } catch (error) {
                console.error("Error adding new house:", error);
            }
        } else {
            alert('Please enter a house name');
        }
    };

    const handleCancelAddHouse = () => {
        setIsModalOpen(false); // Close the modal without saving
        setNewHouseName(''); // Reset the input field
    };

    useEffect(() => {
        if (user && !hasFetchedHouses.current) {
            setIsLoading(true);
            fetchUserHouses();
            hasFetchedHouses.current = true; // Set to true to ensure it only runs once
            setIsLoading(false);
        }
    }, [user, setHouses]); // Ensure `setHouses` is included in the dependency array for consistency

    return (
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
                        <p>{house.nom}</p>
                    </div>
                ))}
            </div>

            {/* Modal for adding a new house */}
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
    );
}

export default Houses;
