import room1 from "@/assets/room-1.jpg";
import room2 from "@/assets/room-2.jpg";
import room3 from "@/assets/room-3.jpg";
import room4 from "@/assets/room-4.jpg";

export type RoomType = "PG" | "Flat" | "Hostel" | "Studio";

export interface Room {
  id: string;
  title: string;
  type: RoomType;
  price: number;
  location: string;
  city: string;
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  furnished: boolean;
  ac: boolean;
  forGender: "Any" | "Male" | "Female";
  nearCollege: string | null;
  verified: boolean;
  featured?: boolean;
  recommended?: boolean;
  trustScore: number;
  coords: [number, number];
  owner: {
    name: string;
    avatar: string;
    phone: string;
    joined: string;
    responseRate: number;
  };
  description: string;
}

export const rooms: Room[] = [
  {
    id: "r1",
    title: "Sunny Single Room near IIT",
    type: "PG",
    price: 7500,
    location: "Powai",
    city: "Mumbai",
    rating: 4.8,
    reviews: 124,
    images: [room1, room2, room4, room3],
    amenities: ["WiFi", "AC", "Laundry", "Meals", "Power Backup", "Parking"],
    furnished: true,
    ac: true,
    forGender: "Male",
    nearCollege: "IIT Bombay",
    verified: true,
    featured: true,
    recommended: true,
    trustScore: 96,
    coords: [19.1334, 72.9133],
    owner: {
      name: "Priya Sharma",
      avatar: "https://i.pravatar.cc/150?img=47",
      phone: "+91 98xxx 12345",
      joined: "2022",
      responseRate: 98,
    },
    description:
      "A bright, naturally-lit single room with a study nook, perfect for IIT students. Quiet building, friendly neighbours, 5-min walk to campus and metro.",
  },
  {
    id: "r2",
    title: "Modern 1BHK with Balcony",
    type: "Flat",
    price: 18500,
    location: "Koramangala",
    city: "Bangalore",
    rating: 4.9,
    reviews: 86,
    images: [room4, room2, room1],
    amenities: ["WiFi", "AC", "Kitchen", "Gym", "Lift", "Security"],
    furnished: true,
    ac: true,
    forGender: "Any",
    nearCollege: null,
    verified: true,
    featured: true,
    recommended: true,
    trustScore: 99,
    coords: [12.9352, 77.6245],
    owner: {
      name: "Rahul Verma",
      avatar: "https://i.pravatar.cc/150?img=12",
      phone: "+91 98xxx 67890",
      joined: "2021",
      responseRate: 95,
    },
    description:
      "Premium 1BHK in the heart of Koramangala. Fully furnished, spacious balcony, walking distance to cafés, coworking spaces and metro.",
  },
  {
    id: "r3",
    title: "Twin Sharing Hostel — Budget",
    type: "Hostel",
    price: 5200,
    location: "Kothrud",
    city: "Pune",
    rating: 4.5,
    reviews: 212,
    images: [room3, room1],
    amenities: ["WiFi", "Meals", "Laundry", "Study Room"],
    furnished: true,
    ac: false,
    forGender: "Female",
    nearCollege: "MIT Pune",
    verified: true,
    recommended: true,
    trustScore: 92,
    coords: [18.5074, 73.8077],
    owner: {
      name: "Anita Desai",
      avatar: "https://i.pravatar.cc/150?img=32",
      phone: "+91 98xxx 22334",
      joined: "2020",
      responseRate: 99,
    },
    description:
      "Safe twin-sharing hostel for women students. Home-cooked meals, study room, 24/7 security and warden.",
  },
  {
    id: "r4",
    title: "Cozy Studio in HSR Layout",
    type: "Studio",
    price: 14000,
    location: "HSR Layout",
    city: "Bangalore",
    rating: 4.7,
    reviews: 54,
    images: [room2, room4],
    amenities: ["WiFi", "AC", "Kitchenette", "Power Backup"],
    furnished: true,
    ac: true,
    forGender: "Any",
    nearCollege: null,
    verified: true,
    featured: true,
    trustScore: 94,
    coords: [12.9116, 77.6446],
    owner: {
      name: "Karan Mehta",
      avatar: "https://i.pravatar.cc/150?img=15",
      phone: "+91 98xxx 99887",
      joined: "2023",
      responseRate: 92,
    },
    description:
      "Compact, well-designed studio for working professionals. Independent entry, quiet street, fully furnished.",
  },
  {
    id: "r5",
    title: "Spacious PG near DU North Campus",
    type: "PG",
    price: 9500,
    location: "Kamla Nagar",
    city: "Delhi",
    rating: 4.6,
    reviews: 178,
    images: [room1, room3],
    amenities: ["WiFi", "Meals", "Laundry", "AC", "Library"],
    furnished: true,
    ac: true,
    forGender: "Male",
    nearCollege: "Delhi University",
    verified: true,
    recommended: true,
    trustScore: 90,
    coords: [28.6850, 77.2089],
    owner: {
      name: "Suresh Kumar",
      avatar: "https://i.pravatar.cc/150?img=52",
      phone: "+91 98xxx 33445",
      joined: "2019",
      responseRate: 96,
    },
    description:
      "Large rooms, quiet study floors, and excellent meals. Walking distance to North Campus colleges.",
  },
  {
    id: "r6",
    title: "Premium 2BHK Sharing",
    type: "Flat",
    price: 12000,
    location: "Madhapur",
    city: "Hyderabad",
    rating: 4.8,
    reviews: 67,
    images: [room4, room1, room2],
    amenities: ["WiFi", "AC", "Kitchen", "Gym", "Pool"],
    furnished: true,
    ac: true,
    forGender: "Any",
    nearCollege: null,
    verified: true,
    featured: true,
    trustScore: 97,
    coords: [17.4485, 78.3908],
    owner: {
      name: "Divya Reddy",
      avatar: "https://i.pravatar.cc/150?img=44",
      phone: "+91 98xxx 55667",
      joined: "2022",
      responseRate: 100,
    },
    description:
      "Premium gated community with all amenities. Sharing with one verified professional. Quiet neighbourhood.",
  },
];

export const cities = ["Mumbai", "Bangalore", "Delhi", "Pune", "Hyderabad", "Chennai", "Kolkata"];

export const popularColleges = [
  "IIT Bombay",
  "Delhi University",
  "MIT Pune",
  "BITS Pilani",
  "VIT Vellore",
  "IIM Bangalore",
];

export interface Booking {
  id: string;
  roomId: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  checkIn: string;
  duration: string;
  createdAt: string;
}

export const mockBookings: Booking[] = [
  { id: "b1", roomId: "r2", status: "accepted", checkIn: "2025-05-01", duration: "6 months", createdAt: "2025-04-10" },
  { id: "b2", roomId: "r1", status: "pending", checkIn: "2025-05-15", duration: "11 months", createdAt: "2025-04-15" },
  { id: "b3", roomId: "r5", status: "completed", checkIn: "2024-08-01", duration: "9 months", createdAt: "2024-07-20" },
];

export interface ChatMessage {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
}

export interface ChatThread {
  id: string;
  roomId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: ChatMessage[];
}

export const mockChats: ChatThread[] = [
  {
    id: "c1",
    roomId: "r2",
    participantName: "Rahul Verma",
    participantAvatar: "https://i.pravatar.cc/150?img=12",
    lastMessage: "Sure, you can visit tomorrow at 5pm 👍",
    lastTime: "2m",
    unread: 2,
    messages: [
      { id: "m1", from: "me", text: "Hi! Is the 1BHK in Koramangala still available?", time: "10:30" },
      { id: "m2", from: "them", text: "Yes it is! Are you looking for a long stay?", time: "10:32" },
      { id: "m3", from: "me", text: "Yes, 11 months. Can I visit?", time: "10:33" },
      { id: "m4", from: "them", text: "Sure, you can visit tomorrow at 5pm 👍", time: "10:34" },
    ],
  },
  {
    id: "c2",
    roomId: "r1",
    participantName: "Priya Sharma",
    participantAvatar: "https://i.pravatar.cc/150?img=47",
    lastMessage: "Welcome! Let me know if you have any questions.",
    lastTime: "1h",
    unread: 0,
    messages: [
      { id: "m1", from: "them", text: "Welcome! Let me know if you have any questions.", time: "Yesterday" },
    ],
  },
];

export interface AppNotification {
  id: string;
  type: "booking" | "chat" | "system";
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

export const mockNotifications: AppNotification[] = [
  { id: "n1", type: "booking", title: "Booking accepted 🎉", body: "Rahul accepted your request for Modern 1BHK in Koramangala.", time: "2m ago", unread: true },
  { id: "n2", type: "chat", title: "New message from Priya", body: "Welcome! Let me know if you have any questions.", time: "1h ago", unread: true },
  { id: "n3", type: "system", title: "AI tip", body: "We found 3 new rooms near IIT Bombay matching your budget.", time: "3h ago", unread: false },
];
