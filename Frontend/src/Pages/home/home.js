import React, { useState, useEffect } from 'react';
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

  const fetchUser = async (email, password) => {
    setIsLoading(true);
    try {
      console.log('Fetching user...');
      const user = await userService.getUser(email, password);
      if (user) {
        setUser(user);
        await fetchUserHouses();
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserHouses = async () => {
    try {
      console.log('Fetching user houses...');
      const userHouses = await userService.getUserHouses();
      setHouses([...userHouses.adminHouses, ...userHouses.invitedHouses]);

      const houseId = "6745eac29d37c213325a5740"; // Set the specific active house ID
      const activeHouseDetail = await houseService.getHouse(houseId);
      setActiveHouse(activeHouseDetail);
      const generalRoom = activeHouseDetail.rooms.find(room => room.type === "general");
      setGeneralRoom(generalRoom);

      const roomsExcludingGeneral = activeHouseDetail.rooms.filter(room => room.type !== "general");
      setFilteredRooms(roomsExcludingGeneral);
      console.log('Detailed Active House:', activeHouseDetail);
    } catch (error) {
      console.error("Error fetching user houses:", error);
    }
  };

  useEffect(() => {
    console.log('useEffect called');
    const emailInput = "alice.johnson@example.com";
    const passwordInput = "new_hashed_password";
    fetchUser(emailInput, passwordInput);
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

  return (
    <div className={`home-container ${isLoading ? 'loading' : ''}`}>
      {isLoading && <div className="loader"></div>}
      <Header 
        sortedHouses={houses} 
        setActiveHouse={setActiveHouse} 
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
