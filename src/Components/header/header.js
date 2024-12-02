import "./header.css";
import { useState } from "react";

function Header({ sortedHouses, setActiveHouse, activeHouse, exampleUser }) {
    const [HomedropdownOpen, setHomeDropdownOpen] = useState(false);

    const toggleHomeDropdown = () => {
        setHomeDropdownOpen(!HomedropdownOpen);
        if (BelldropdownOpen) {
            setBellDropdownOpen(false);
        }
    };

    const [BelldropdownOpen, setBellDropdownOpen] = useState(false);

    const toggleBellDropdown = () => {
        setBellDropdownOpen(!BelldropdownOpen);
        if (HomedropdownOpen) {
            setHomeDropdownOpen(false);
        }
    };

    const handleHouseClick = (house) => {
        setActiveHouse(house);
        setHomeDropdownOpen(false);
    };

    return (
        <header>
            <div className="logo">
                <p className="logo-text">Utopia</p>
            </div>
            <div className="icons">
                <div className="homes">
                    <img
                        src="./image/home.svg"
                        alt="Home Icon"
                        onClick={toggleHomeDropdown}
                    />
                    <div className={`dropdown-home ${HomedropdownOpen ? "show" : ""}`}>
                        {sortedHouses.map((house, index) => (
                            <div 
                                className={`home-option ${activeHouse && activeHouse._id === house._id ? "active" : ""}`} 
                                key={index} 
                                onClick={() => handleHouseClick(house)}>
                                <img className="home-icon" src="./image/home2.svg" alt="" />
                                <img className="type-icon" src={`./image/${exampleUser.admin.includes(house._id) ? 'admin' : 'invited'}.svg`} alt="" />
                                <p>{house.name}</p>
                                {activeHouse && activeHouse._id === house._id && <div className="indicator"></div>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="notifications">
                    <img 
                        src="./image/notification.svg" 
                        alt="Notifications Icon" 
                        onClick={toggleBellDropdown}/>
                    <div className={`dropdown-notifications ${BelldropdownOpen ? "show" : ""}`}>
                        <p>Home</p>
                        <p>Profile</p>
                        <p>Settings</p>
                    </div>
                </div>
                <img src="./image/profile.svg" alt="./image/profile.svg" className="profile-icon" />
            </div>
        </header>
    );
}

export default Header;
