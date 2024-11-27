import Header from '../header/header';
import Title from '../title/title';
import Filter from '../filter/filter';
import Rooms from '../RoomList/rooms';
import Panel from '../panel/panel';
import { useState } from 'react';
import "./home.css";

function Home() {
  const exampleUser = {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "hashed_password", // Normally, passwords are hashed before storage.
    image: "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=",
    admin: ["house1", "house2"], // John is an admin for these houses.
    invited: ["house3"], // John has been invited to this house.
  };

  const exampleHouses = [
    {
      _id: "house1",
      name: "Modern Villa",
      rooms: [
        {
          name: "Living Room",
          type: "livingroom",
          devices: [
            {
              name: "Ceiling Light",
              type: "light",
              status: "on",
              "room-name": "Living Room",
              settings: { brightness: 75, color: "warm white" },
            },
            {
              name: "Thermostat",
              type: "thermostat",
              status: "off",
              "room-name": "Living Room",
              settings: { temperature: 22 },
            },
          ],
        },
        {
          name: "Bedroom",
          type: "bedroom",
          devices: [
            {
              name: "Bedside Lamp",
              type: "light",
              status: "off",
              "room-name": "Bedroom",
              settings: { brightness: 50 },
            },
          ],
        },
        {
          name: "Kitchen",
          type: "kitchen",
          devices: [
            {
              name: "Fridge Monitor",
              type: "sensor",
              status: "on",
              "room-name": "Kitchen",
              settings: { temperature: 4 },
            },
            {
              name: "Oven",
              type: "appliance",
              status: "off",
              "room-name": "Kitchen",
              settings: { mode: "bake", timer: 30 },
            },
          ],
        },
      ],
    },
    {
      _id: "house2",
      name: "Cozy Cottage",
      rooms: [
        {
          name: "Master Bedroom",
          type: "bedroom",
          devices: [
            {
              name: "Bedside Lamp",
              type: "light",
              status: "off",
              "room-name": "Master Bedroom",
              settings: { brightness: 50 },
            },
          ],
        },
        {
          name: "Kitchen",
          type: "kitchen",
          devices: [
            {
              name: "Coffee Maker",
              type: "appliance",
              status: "off",
              "room-name": "Kitchen",
              settings: { mode: "brew" },
            },
          ],
        },
      ],
    },
    {
      _id: "house3",
      name: "Urban Apartment",
      rooms: [
        {
          name: "Living Room",
          type: "livingroom",
          devices: [
            {
              name: "Smart TV",
              type: "tv",
              status: "off",
              "room-name": "Living Room",
              settings: { resolution: "4K", size: "55 inches" },
            },
          ],
        },
        {
          name: "Bathroom",
          type: "bathroom",
          devices: [
            {
              name: "Shower Controller",
              type: "controller",
              status: "off",
              "room-name": "Bathroom",
              settings: { temperature: "hot" },
            },
          ],
        },
      ],
    },
  ];

  const houseIdToDetails = exampleHouses.reduce((acc, house) => {
    acc[house._id] = house;
    return acc;
  }, {});

  const sortedHouses = [
    ...exampleUser.admin.map(id => houseIdToDetails[id]),
    ...exampleUser.invited.map(id => houseIdToDetails[id])
  ];

  const [activeHouse, setActiveHouse] = useState(exampleHouses[0]); // Set the initial active house to house1
  const [filteredRooms, setFilteredRooms] = useState(activeHouse.rooms);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (filter === null) {
      setFilteredRooms(activeHouse.rooms);
    } else {
      setFilteredRooms(activeHouse.rooms.filter(room => room.type === filter));
    }
  };

  const handleHouseChange = (house) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveHouse(house);
      setFilteredRooms(house.rooms);
      setSelectedFilter(null); // Reset the filter when house changes
      setIsLoading(false);
    }, 500); // Add a delay of 500ms
  };

  return (
    <div className={`home-container ${isLoading ? 'loading' : ''}`}>
      {isLoading && <div className="loader"></div>}
      <Header 
        sortedHouses={sortedHouses} 
        setActiveHouse={handleHouseChange} 
        activeHouse={activeHouse} 
        exampleUser={exampleUser}
      />
      <Title title= {"Welcome, " + exampleUser.name}/>
      <Filter onFilterChange={handleFilterChange}/>
      <Rooms rooms={filteredRooms} selectedFilter={selectedFilter}/>
      <Panel/>
    </div>
  );
}

export default Home;
