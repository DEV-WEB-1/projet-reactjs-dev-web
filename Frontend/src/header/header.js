import "./header.css";
import { useState } from "react";

function Header() {
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
                    <div className={`dropdown-home ${HomedropdownOpen? "show" : ""}`}>
                        <p>Home</p>
                        <p>Profile</p>
                        <p>Settings</p>
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
                <img src="./image/profile.svg" alt="Profile Icon" />
            </div>
        </header>
    );
}

export default Header;
