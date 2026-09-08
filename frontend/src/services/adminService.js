const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

const getToken = () => {
  return localStorage.getItem("adminToken");
};

export const getCustomers = async () => {
  const response = await fetch(`${API_URL}/customers`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  return response.json();
};