const API_URL = `${import.meta.env.VITE_API_URL}/inventory`;

// --------------------------------
// Get all inventory
// --------------------------------

export const getInventory = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch inventory");
  }

  return response.json();
};


// --------------------------------
// Get inventory by ID
// --------------------------------

export const getInventoryById = async (id) => {
  const response = await fetch(
    `${API_URL}/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch inventory item");
  }

  return response.json();
};


// --------------------------------
// Create inventory
// --------------------------------

export const createInventory = async (
  inventoryData
) => {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(inventoryData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create inventory item"
    );
  }

  return data;
};


// --------------------------------
// Update inventory
// --------------------------------

export const updateInventory = async (
  id,
  inventoryData
) => {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(inventoryData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update inventory"
    );
  }

  return data;
};


// --------------------------------
// Update stock + price
// --------------------------------

export const updateStock = async (
  id,
  quantity,
  price
) => {
  const response = await fetch(
    `${API_URL}/${id}/stock`,
    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        quantity,
        price,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update stock"
    );
  }

  return data;
};


// --------------------------------
// Delete inventory
// --------------------------------

export const deleteInventory = async (id) => {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete inventory item"
    );
  }

  return data;
};