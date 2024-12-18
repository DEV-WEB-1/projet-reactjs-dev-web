const houseService = {
  // Function to fetch all houses
  getAllHouses: async () => {
    try {
      const response = await fetch("/api/houses", {
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
      console.error("Error fetching all houses:", error.message || "Unknown error");
      throw error;
    }
  },

  // Function to create a house
  createHouse: async (houseData) => {
    try {
      const response = await fetch("/api/houses/creatHouse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(houseData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; // Return the created house data
    } catch (error) {
      console.error("Error creating house:", error.message || "Unknown error");
      throw error;
    }
  },

  // Function to get a house by ID (ID passed in the URL)
  getHouse: async (id) => {
    try {
      const response = await fetch(`/api/houses/getHouse?id=${encodeURIComponent(id)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; // Return the house data
    } catch (error) {
      console.error("Error fetching house:", error.message || "Unknown error");
      throw error;
    }
  },

  // Function to update a house
  updateHouse: async (updatedHouseData) => {
    try {
      const response = await fetch("/api/houses/updateHouse", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...updatedHouseData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; // Return the updated house data
    } catch (error) {
      console.error("Error updating house:", error.message || "Unknown error");
      throw error;
    }
  },
};

export default houseService;
