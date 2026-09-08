const API_URL = `${import.meta.env.VITE_API_URL}/pizzas`;

// Get all pizzas
export const getPizzas = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch pizzas");
  }

  return response.json();
};

// Get single pizza
export const getPizzaById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch pizza");
  }

  return response.json();
};

// Create pizza
export const createPizza = async (pizzaData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pizzaData),
  });

  if (!response.ok) {
    throw new Error("Failed to create pizza");
  }

  return response.json();
};

// Update pizza
export const updatePizza = async (id, pizzaData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pizzaData),
  });

  if (!response.ok) {
    throw new Error("Failed to update pizza");
  }

  return response.json();
};

// Delete pizza
export const deletePizza = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete pizza");
  }

  return response.json();
};