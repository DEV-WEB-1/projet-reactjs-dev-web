import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/UserServices';
import houseService from '../../services/houseServices';


function Houses({ user, setHouses, setActiveHouse }) {
    const navigate = useNavigate();
    const hasFetchedHouses = useRef(false); // Tracks if houses have been fetched

    const fetchUserHouses = async () => {
        try {
          console.log('Fetching user houses...');
          const userHouses = await userService.getUserHouses();
          const houses = [...userHouses.adminHouses, ...userHouses.invitedHouses];
          setHouses(houses);
          console.log('User Houses:', houses);
          const houseId = "6745eac29d37c213325a5740"; // Set the specific active house ID
          const activeHouseDetail = await houseService.getHouse(houseId);
          setActiveHouse(activeHouseDetail);
          console.log('Detailed Active House:', activeHouseDetail);
        } catch (error) {
          console.error("Error fetching user houses:", error);
        }
      };
    
      useEffect(() => {
        if (user && !hasFetchedHouses.current) {
          fetchUserHouses();
          hasFetchedHouses.current = true; // Set to true to ensure it only runs once
          navigate('/home');
        }
      }, [user]);

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}

export default Houses;