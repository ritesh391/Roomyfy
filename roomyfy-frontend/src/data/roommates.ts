export interface Roommate {
  id: string;
  name: string;
  avatar: string;
  age: number;
  profession: "Student" | "Working Professional";
  city: string;
  budget: number;
  bio: string;
  lifestyle: {
    smoking: boolean;
    drinking: boolean;
    sleep: "Early bird" | "Night owl" | "Flexible";
    cleanliness: "Tidy" | "Average" | "Relaxed";
    food: "Veg" | "Non-veg" | "Both";
    pets: boolean;
  };
  interests: string[];
}

export const roommates: Roommate[] = [
  {
    id: "u1",
    name: "Aarav Singh",
    avatar: "https://i.pravatar.cc/150?img=11",
    age: 22,
    profession: "Student",
    city: "Mumbai",
    budget: 8000,
    bio: "IIT-B M.Tech, love trekking and lo-fi beats. Looking for a quiet flatmate.",
    lifestyle: { smoking: false, drinking: false, sleep: "Early bird", cleanliness: "Tidy", food: "Veg", pets: false },
    interests: ["Cricket", "Coding", "Music"],
  },
  {
    id: "u2",
    name: "Sneha Iyer",
    avatar: "https://i.pravatar.cc/150?img=45",
    age: 25,
    profession: "Working Professional",
    city: "Bangalore",
    budget: 16000,
    bio: "Product designer at a startup. Weekend baker, dog person.",
    lifestyle: { smoking: false, drinking: true, sleep: "Flexible", cleanliness: "Tidy", food: "Both", pets: true },
    interests: ["Design", "Hiking", "Coffee"],
  },
  {
    id: "u3",
    name: "Kabir Khan",
    avatar: "https://i.pravatar.cc/150?img=14",
    age: 27,
    profession: "Working Professional",
    city: "Bangalore",
    budget: 18000,
    bio: "Backend engineer. Quiet weekdays, social weekends.",
    lifestyle: { smoking: false, drinking: true, sleep: "Night owl", cleanliness: "Average", food: "Non-veg", pets: false },
    interests: ["Football", "Gaming", "Cooking"],
  },
  {
    id: "u4",
    name: "Meera Patel",
    avatar: "https://i.pravatar.cc/150?img=49",
    age: 21,
    profession: "Student",
    city: "Pune",
    budget: 6500,
    bio: "MIT Pune undergrad. Love photography and indie films.",
    lifestyle: { smoking: false, drinking: false, sleep: "Early bird", cleanliness: "Tidy", food: "Veg", pets: false },
    interests: ["Photography", "Reading", "Yoga"],
  },
  {
    id: "u5",
    name: "Rohan Das",
    avatar: "https://i.pravatar.cc/150?img=33",
    age: 24,
    profession: "Working Professional",
    city: "Delhi",
    budget: 11000,
    bio: "Analyst, gym 6 days a week, looking for an active flatmate.",
    lifestyle: { smoking: false, drinking: false, sleep: "Early bird", cleanliness: "Tidy", food: "Non-veg", pets: false },
    interests: ["Gym", "Podcasts", "Travel"],
  },
];

export interface MyPreferences {
  city: string;
  budget: number;
  profession: Roommate["profession"];
  lifestyle: Roommate["lifestyle"];
}

export const defaultPreferences: MyPreferences = {
  city: "Bangalore",
  budget: 15000,
  profession: "Working Professional",
  lifestyle: { smoking: false, drinking: false, sleep: "Flexible", cleanliness: "Tidy", food: "Both", pets: false },
};

export const matchScore = (me: MyPreferences, r: Roommate): number => {
  let score = 0;
  // City match (heavy)
  if (me.city === r.city) score += 30;
  // Budget proximity (max 25)
  const bDiff = Math.abs(me.budget - r.budget) / Math.max(me.budget, r.budget);
  score += Math.max(0, 25 - bDiff * 50);
  // Profession (10)
  if (me.profession === r.profession) score += 10;
  // Lifestyle (35)
  const ls = me.lifestyle;
  const rl = r.lifestyle;
  const checks: boolean[] = [
    ls.smoking === rl.smoking,
    ls.drinking === rl.drinking,
    ls.sleep === rl.sleep || ls.sleep === "Flexible" || rl.sleep === "Flexible",
    ls.cleanliness === rl.cleanliness,
    ls.food === rl.food || ls.food === "Both" || rl.food === "Both",
    ls.pets === rl.pets,
  ];
  score += (checks.filter(Boolean).length / checks.length) * 35;
  return Math.round(Math.min(100, score));
};
