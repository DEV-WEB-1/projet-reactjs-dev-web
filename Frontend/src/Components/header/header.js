import "./header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import houseService from "../../services/houseServices";

function Header({ sortedHouses, setActiveHouse, activeHouse, user, setIsLoading }) {
    const [HomedropdownOpen, setHomeDropdownOpen] = useState(false);
    const [BelldropdownOpen, setBellDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleHomeDropdown = () => {
        setHomeDropdownOpen(!HomedropdownOpen);
        if (BelldropdownOpen) {
            setBellDropdownOpen(false);
        }
    };

    const toggleBellDropdown = () => {
        setBellDropdownOpen(!BelldropdownOpen);
        if (HomedropdownOpen) {
            setHomeDropdownOpen(false);
        }
    };

    const handleHouseClick = async (house) => {
        setIsLoading(true);
        const newHouse = await houseService.getHouse(house.id);
        setActiveHouse(newHouse);
        setHomeDropdownOpen(false);
        setIsLoading(false);
        navigate('/home');
    };

    return (
        <header>
            <div className="logo">
                <p className="logo-text">Utopia</p>
            </div>
            <div className="icons">
                <div className="homes">
                    <img
                        src="/image/home.svg"
                        alt="Home Icon"
                        onClick={toggleHomeDropdown}
                    />
                    <div className={`dropdown-home ${HomedropdownOpen ? "show" : ""}`}>
                        {sortedHouses.map((house, index) => (
                            <div 
                                className={`home-option ${activeHouse && activeHouse._id === house.id ? "active" : ""}`} 
                                key={index} 
                                onClick={() => handleHouseClick(house)}>
                                <img className="home-icon" src="/image/home2.svg" alt="" />
                                <img className="type-icon" src={`/image/${user.admin.includes(house.id) ? 'admin' : 'invited'}.svg`} alt="" />
                                <p>{house.nom}</p>
                                {activeHouse && activeHouse._id === house.id && <div className="indicator"></div>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="notifications">
                    <img 
                        src="/image/notification.svg" 
                        alt="Notifications Icon" 
                        onClick={toggleBellDropdown}/>
                    <div className={`dropdown-notifications ${BelldropdownOpen ? "show" : ""}`}>
                    </div>
                </div>
                <img src="/image/profile.svg" alt="Profile" className="profile-icon" onClick={() => navigate('/profile')}/>
            </div>
        </header>
    );  
}

export default Header;
