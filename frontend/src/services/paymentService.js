const API_URL =
  `${import.meta.env.VITE_API_URL}/payment`;


// ======================================================
// AUTH HEADERS
// ======================================================
const getAuthHeaders = () => {
  const token =
    localStorage.getItem("customerToken");

  return {
    "Content-Type":
      "application/json",

    ...(token
      ? {
          Authorization:
            `Bearer ${token}`,
        }
      : {}),
  };
};


// ======================================================
// CREATE PAYMENT
// ======================================================
export const createPayment = async (
  paymentData
) => {
  const response =
    await fetch(
      `${API_URL}/create`,
      {
        method: "POST",

        headers:
          getAuthHeaders(),

        body:
          JSON.stringify(paymentData),
      }
    );

  const contentType =
    response.headers.get(
      "content-type"
    ) || "";

  let data;

  if (
    contentType.includes(
      "application/json"
    )
  ) {
    data =
      await response.json();
  } else {
    const text =
      await response.text();

    data = {
      message:
        text ||
        "Server returned an invalid response",
    };
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      "Payment creation failed"
    );
  }

  return data;
};


// ======================================================
// VERIFY PAYMENT
// ======================================================
export const verifyPayment = async (
  tracker,
  orderId
) => {
  const response =
    await fetch(
      `${API_URL}/verify`,
      {
        method: "POST",

        headers:
          getAuthHeaders(),

        body: JSON.stringify({
          tracker,
          orderId,
        }),
      }
    );

  const contentType =
    response.headers.get(
      "content-type"
    ) || "";

  let data;

  if (
    contentType.includes(
      "application/json"
    )
  ) {
    data =
      await response.json();
  } else {
    const text =
      await response.text();

    data = {
      message:
        text ||
        "Server returned an invalid response",
    };
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      "Payment verification failed"
    );
  }

  return data;
};