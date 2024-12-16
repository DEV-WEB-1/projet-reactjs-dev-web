import React, { useState, useEffect, useRef } from 'react';
import Header from '../../Components/header/header';
import Title from '../../Components/title/title';
import Filter from '../../Components/filter/filter';
import Rooms from '../../Components/RoomList/rooms';
import Panel from '../../Components/panel/panel';
import "./home.css";

function Home({ user, houses, activeHouse, setActiveHouse, setRooms, isLoading, setIsLoading }) {
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [generalRoom, setGeneralRoom] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
 
  const fetchRooms = async () => {
    try {
      console.log('activeHouse:', activeHouse);
      const generalRoom = activeHouse.rooms.find(room => room.type === "general");
      setGeneralRoom(generalRoom);
      const roomsExcludingGeneral = activeHouse.rooms.filter(room => room.type !== "general");
      setFilteredRooms(roomsExcludingGeneral);
      setRooms(roomsExcludingGeneral);
      console.log('Detailed Active House:', activeHouse);
    } catch (error) {
      console.error("Error fetching user houses:", error);
    }
  };

  useEffect(() => {
    if (activeHouse) {
      fetchRooms();
    }
  }, [activeHouse]);

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

  const handleHouseChange = (newHouse) => {
    try {
      const generalRoom = newHouse.rooms.find(room => room.type === "general");
      setGeneralRoom(generalRoom);

      const roomsExcludingGeneral = newHouse.rooms.filter(room => room.type !== "general");
      setActiveHouse(newHouse);
      console.log('New House:', newHouse);
      setFilteredRooms(roomsExcludingGeneral);
      setSelectedFilter(null);  
    } catch (error) {
      console.error("Error loading new house:", error);
    }
  };

  return (
    <div className={`home-container ${isLoading ? 'loading' : ''}`}>
      {isLoading && <div className="loader"></div>}
      <Header 
        sortedHouses={houses} 
        setActiveHouse={handleHouseChange} 
        activeHouse={activeHouse} 
        user={user}
        setIsLoading={setIsLoading}
      />
      <Title title={user ? `Welcome, ${user.name}` : 'Welcome'} />
      <Filter onFilterChange={handleFilterChange} />
      <Rooms rooms={filteredRooms} selectedFilter={selectedFilter} />
      <Panel settings={generalRoom?.devices} houseId={activeHouse?._id} />
    </div>
  );
}

export default Home;
