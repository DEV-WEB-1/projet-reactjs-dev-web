const userService = {
  // Function to fetch a user by email and password (Login)
  getUser: async (email, password) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; // Return the user data
    } catch (error) {
      console.error("Error fetching user:", error.message || "Unknown error");
      throw error;
    }
  },

  // Function to fetch houses where the user is an admin or invited
  getUserHouses: async () => {
    try {
      const response = await fetch(`/api/users/getUserHouses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; // Return the houses data
    } catch (error) {
      console.error("Error fetching user houses:", error.message || "Unknown error");
      throw error;
    }
  },

  // Function to add a new user
  addUser: async (userData) => {
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; // Return the created user data
    } catch (error) {
      console.error("Error adding user:", error.message || "Unknown error");
      throw error;
    }
  },

  // Function to check email validity
  checkEmailValidity: async (email) => {
    try {
      const response = await fetch("/api/users/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; // Return the email validity
    } catch (error) {
      console.error("Error checking email validity:", error.message || "Unknown error");
      throw error;
    }
  },

  // Function to update user password
  updatePassword: async (email, newPassword) => {
    try {
      const response = await fetch("/api/users/update-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; // Return the updated password data
    } catch (error) {
      console.error("Error updating password:", error.message || "Unknown error");
      throw error;
    }
  },

  // Function to update user information
  updateUser: async (updatedUserData) => {
    try {
      const response = await fetch("/api/users/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; // Return the updated user data
    } catch (error) {
      console.error("Error updating user:", error.message || "Unknown error");
      throw error;
    }
  },
  inviteUser: async (email, updatedData) => {
    try {
      const response = await fetch(`/api/users/invite/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), // Include additional data in the body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; // Return the updated user data
    } catch (error) {
      console.error("Error inviting user:", error.message || "Unknown error");
      throw error;
    }
  },
  getInvitedHouses: async (email) => {
    try {
      const response = await fetch(`/api/users/invitedHouses/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; // Return the list of invited houses
    } catch (error) {
      console.error("Error fetching invited houses:", error.message || "Unknown error");
      throw error;
    }
  },
};

export default userService;
