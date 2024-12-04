import React, { useRef, useState, useEffect } from 'react';
import Header from '../../Components/header/header';
import Title from '../../Components/title/title';
import Filter from '../../Components/filter/filter';
import Rooms from '../../Components/RoomList/rooms';
import Panel from '../../Components/panel/panel';
import "./home.css";
import userService from '../../services/UserServices';
import houseService from '../../services/houseServices';

function Home({ user, setUser, houses, setHouses, activeHouse, setActiveHouse }) {
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [generalRoom, setGeneralRoom] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasFetchedUser = useRef(false); // Ref to prevent multiple calls

  const fetchUser = async (email, password) => {
    setIsLoading(true);
    try {
      console.log('Fetching user...');
      const user = await userService.getUser(email, password);
      if (user) {
        setUser(user);
        await fetchUserHouses(user.email);
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserHouses = async (email) => {
    try {
      console.log('Fetching user houses...');
      const userHouses = await userService.getUserHouses();
      const detailedHouses = await Promise.all(
        [...userHouses.adminHouses, ...userHouses.invitedHouses].map(async (house) => {
          return await houseService.getHouse(house.id);
        })
      );
      setHouses(detailedHouses);
      if (detailedHouses.length > 0) {
        setActiveHouse(detailedHouses[0]);
        const generalRoom = detailedHouses[0].rooms.find(room => room.type === "general");
        setGeneralRoom(generalRoom);

        const roomsExcludingGeneral = detailedHouses[0].rooms.filter(room => room.type !== "general");
        setFilteredRooms(roomsExcludingGeneral);
      }
      console.log('Detailed Houses:', detailedHouses[0]);
    } catch (error) {
      console.error("Error fetching user houses:", error);
    }
  };

  useEffect(() => {
    if (!hasFetchedUser.current) {
      hasFetchedUser.current = true; // Prevent further calls
      console.log('useEffect called');
      const emailInput = "alice.johnson@example.com";
      const passwordInput = "new_hashed_password";
      fetchUser(emailInput, passwordInput);
    }
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (filter === null) {
      const roomsExcludingGeneral = activeHouse.rooms.filter(room => room.type !== "general");
      setFilteredRooms(roomsExcludingGeneral);
    } else {
      const roomsExcludingGeneral = activeHouse.rooms.filter(room => room.type !== "general");
      setFilteredRooms(roomsExcludingGeneral.filter(room => room.type === filter));
    }
  };

  const handleHouseChange = async (house) => {
    setIsLoading(true);
    try {
      console.log('Changing house...');
      const newHouse = await houseService.getHouse(house._id);
      const generalRoom = newHouse.rooms.find(room => room.type === "general");
      setGeneralRoom(generalRoom);

      const roomsExcludingGeneral = newHouse.rooms.filter(room => room.type !== "general");
      setActiveHouse(newHouse);
      console.log('New House:', newHouse);
      setFilteredRooms(roomsExcludingGeneral);
      setSelectedFilter(null);
    } catch (error) {
      console.error("Error loading new house:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`home-container ${isLoading ? 'loading' : ''}`}>
      {isLoading && <div className="loader"></div>}
      <Header 
        sortedHouses={houses} 
        setActiveHouse={handleHouseChange} 
        activeHouse={activeHouse} 
        exampleUser={user}
      />
      <Title title={user ? `Welcome, ${user.name}` : 'Welcome'} />
      <Filter onFilterChange={handleFilterChange} />
      <Rooms rooms={filteredRooms} selectedFilter={selectedFilter} />
      <Panel settings={generalRoom?.devices} houseId={activeHouse?._id} />
    </div>
  );
}

export default Home;
