
const API_URL = `${import.meta.env.VITE_API_URL}/orders`;

/* ================= AUTH HEADERS ================= */

const getCustomerAuthHeaders = () => {
  const token = localStorage.getItem("customerToken");

  return {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
};

const getAdminAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");

  return {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
};


/* ================= CUSTOMER ORDERS ================= */

// Get logged-in customer's orders
export const getCustomerOrders = async () => {
  const response = await fetch(API_URL, {
    headers: getCustomerAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch customer orders"
    );
  }

  return data;
};


/* ================= ADMIN ORDERS ================= */

// Get all orders for admin
export const getAdminOrders = async () => {
  const response = await fetch(API_URL, {
    headers: getAdminAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch admin orders"
    );
  }

  return data;
};


/* ================= GET ORDERS ================= */

// Kept for existing code compatibility.
// Uses the currently available authenticated token.
export const getOrders = async () => {
  const customerToken = localStorage.getItem("customerToken");
  const adminToken = localStorage.getItem("adminToken");

  const token = adminToken || customerToken;

  const response = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch orders"
    );
  }

  return data;
};


/* ================= GET SINGLE ORDER ================= */

// Customer/admin token automatically selected
export const getOrderById = async (id) => {
  const customerToken = localStorage.getItem("customerToken");
  const adminToken = localStorage.getItem("adminToken");

  const token = adminToken || customerToken;

  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch order"
    );
  }

  return data;
};


/* ================= CREATE ORDER ================= */

// Customer creates order
export const createOrder = async (orderData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getCustomerAuthHeaders(),
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create order"
    );
  }

  return data;
};


/* ================= UPDATE ORDER STATUS ================= */

// Admin updates order status
export const updateOrderStatus = async (id, status) => {
  const response = await fetch(
    `${API_URL}/${id}/status`,
    {
      method: "PATCH",
      headers: getAdminAuthHeaders(),
      body: JSON.stringify({ status }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update order status"
    );
  }

  return data;
};

