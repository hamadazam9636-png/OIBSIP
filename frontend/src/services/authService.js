
const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

// ================= USER REGISTER =================

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

// ================= USER LOGIN =================

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  localStorage.setItem("customerToken", data.token);
  localStorage.setItem("customerUser", JSON.stringify(data.user));

  return data;
};

// ================= ADMIN LOGIN =================

export const adminLogin = async (credentials) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/admin/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Admin login failed");
  }

  localStorage.setItem("adminToken", data.token);
  localStorage.setItem("adminUser", JSON.stringify(data.user));

  return data;
};

// ================= USER LOGOUT =================

export const logoutUser = () => {
  localStorage.removeItem("customerToken");
  localStorage.removeItem("customerUser");
};

// ================= ADMIN LOGOUT =================

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
};

