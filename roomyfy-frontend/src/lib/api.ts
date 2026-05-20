const API_BASE_URL = "https://roomyfy-backend.onrender.com/api";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export const api = {
  // ─── AUTH ───────────────────────────────
  register: async (data: { name: string; email: string; password: string; role?: string }) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  login: async (data: { email: string; password: string }) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: authHeaders(),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  // ─── PROPERTIES ─────────────────────────
 getProperties: async (query?: string) => {
  const url = query
    ? `${API_BASE_URL}/properties?search=${query}`
    : `${API_BASE_URL}/properties`;
  const res = await fetch(url);
  if (!res.ok) throw await res.json();
  const data = await res.json();
  return data.properties;
},

  getProperty: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/properties/${id}`);
    if (!res.ok) throw await res.json();
    return res.json();
  },

  createProperty: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/properties`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  // ─── BOOKINGS ───────────────────────────
  createBooking: async (data: { propertyId: string; message?: string }) => {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  getMyBookings: async () => {
    const res = await fetch(`${API_BASE_URL}/bookings/my`, {
      headers: authHeaders(),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  cancelBooking: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/bookings/${id}/cancel`, {
      method: "PUT",
      headers: authHeaders(),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },
  // ─── CHATS ────────────────────────────────
getMyChats: async () => {
  const res = await fetch(`${API_BASE_URL}/chats`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw await res.json();
  return res.json();
},

createOrGetChat: async (data: { participantId: string; propertyId: string }) => {
  const res = await fetch(`${API_BASE_URL}/chats`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
},

getChatMessages: async (chatId: string) => {
  const res = await fetch(`${API_BASE_URL}/chats/${chatId}/messages`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw await res.json();
  return res.json();
},

sendMessage: async (chatId: string, text: string) => {
  const res = await fetch(`${API_BASE_URL}/chats/${chatId}/messages`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
},
};
