import React, { useState } from "react";
import userService from "../../services/UserServices";
import "./UserProfile.css";
import Header from "../../Components/header/header";
import { useNavigate } from "react-router-dom";

function UserProfile({ user, setUser, houses, setActiveHouse, activeHouse }) {
  const [userDetails, setUserDetails] = useState({
    name: user.name,
    email: user.email,
    gender: user.gender,
    image: user.image || "../image/profile.svg",
    password: user.password,
    admin : user.admin,
    invited : user.invited
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showInviteInput, setShowInviteInput] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserDetails((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const updatedUser = await userService.updateUser(userDetails);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteClick = () => {
    setShowInviteInput(!showInviteInput);
  };

  const handleInviteChange = (e) => {
    setInviteEmail(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleInviteSubmit = async () => {
    if(!inviteEmail) return;
    try{
      const invitedHouses = await userService.getInvitedHouses(inviteEmail);
      invitedHouses.push(activeHouse._id);
      await userService.inviteUser(inviteEmail, {invited : invitedHouses});
      setShowInviteInput(false);
      setInviteEmail("");
    } catch (error) {
      console.error("Error inviting user:", error.message || "Unknown error");
    }
  };

  return (
    <div className="user-profile-container">
      <Header
        sortedHouses={houses}
        setActiveHouse={setActiveHouse}
        activeHouse={activeHouse}
        user={user}
        setIsLoading={setIsLoading}
      />
      <div className="profile-content">
        <h2>Profile</h2>
        <div className="profile-picture">
          <img src={userDetails.image} alt="Profile" className="profile-image" />
          <div>
            <label htmlFor="uploadImage" className="change-image-label">Change Image</label>
            <input type="file" id="uploadImage" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
          </div>
          <div className="logout-button">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className="user-details">
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={userDetails.email} disabled />
          </div>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={userDetails.name} onChange={handleChange} />
          </div>
          <div>
            <label>Gender:</label>
            <select name="gender" value={userDetails.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button className="invite-user-button" onClick={handleInviteClick}>Invite User</button>
          {showInviteInput && (
            <div className="invite-input">
              <input
                type="email"
                placeholder="Enter email to invite"
                value={inviteEmail}
                onChange={handleInviteChange}
              />
              <button className="invite-button" onClick={handleInviteSubmit}>Send Invite</button>
            </div>
          )}
        </div>
        <div className="update-button">
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
