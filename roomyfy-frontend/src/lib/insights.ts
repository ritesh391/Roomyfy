import { Room, rooms } from "@/data/rooms";

export type TrustTier = "high" | "moderate" | "risky";

export const trustTier = (score: number): TrustTier =>
  score >= 90 ? "high" : score >= 75 ? "moderate" : "risky";

export const trustMeta = (tier: TrustTier) =>
  ({
    high: { label: "Highly Verified", emoji: "🟢", color: "text-success", bg: "bg-success/10", ring: "ring-success/30" },
    moderate: { label: "Moderate Trust", emoji: "🟡", color: "text-warning", bg: "bg-warning/15", ring: "ring-warning/30" },
    risky: { label: "Risky Listing", emoji: "🔴", color: "text-destructive", bg: "bg-destructive/10", ring: "ring-destructive/30" },
  }[tier]);

export interface TrustFactor {
  label: string;
  score: number; // 0-100
  weight: number;
}

export const trustFactors = (room: Room): TrustFactor[] => {
  const reviewScore = Math.min(100, 40 + room.reviews * 0.4);
  const ownerScore = (room.owner.responseRate + (room.verified ? 10 : 0)) * 0.95;
  const imageScore = Math.min(100, 60 + room.images.length * 10);
  const locationScore = room.coords ? 95 : 60;
  const avg = cityAverage(room.city, room.type);
  const diff = Math.abs(room.price - avg) / avg;
  const priceScore = Math.max(40, 100 - diff * 120);
  return [
    { label: "Owner verification", score: Math.round(ownerScore), weight: 25 },
    { label: "Image authenticity", score: Math.round(imageScore), weight: 15 },
    { label: "Reviews", score: Math.round(reviewScore), weight: 25 },
    { label: "Location consistency", score: Math.round(locationScore), weight: 15 },
    { label: "Price anomaly check", score: Math.round(priceScore), weight: 20 },
  ];
};

export const cityAverage = (city: string, type?: Room["type"]) => {
  const peers = rooms.filter((r) => r.city === city && (!type || r.type === type));
  if (!peers.length) return 10000;
  return peers.reduce((s, r) => s + r.price, 0) / peers.length;
};

export type PriceVerdict = "great" | "fair" | "high";

export interface PriceInsight {
  verdict: PriceVerdict;
  pct: number; // negative = cheaper
  label: string;
  color: string;
}

export const priceInsight = (room: Room): PriceInsight => {
  const avg = cityAverage(room.city, room.type);
  const pct = Math.round(((room.price - avg) / avg) * 100);
  if (pct <= -8) return { verdict: "great", pct, label: `${Math.abs(pct)}% cheaper than average`, color: "text-success" };
  if (pct >= 12) return { verdict: "high", pct, label: `${pct}% above average`, color: "text-destructive" };
  return { verdict: "fair", pct, label: "Fair price for the area", color: "text-foreground" };
};

// Smart commute: pseudo-distance from coords
export const haversineKm = (a: [number, number], b: [number, number]) => {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

// Famous destination presets for demo
export const destinationPresets: { name: string; coords: [number, number] }[] = [
  { name: "IIT Bombay", coords: [19.1334, 72.9133] },
  { name: "Koramangala Office Hub", coords: [12.9352, 77.6245] },
  { name: "MIT Pune", coords: [18.5074, 73.8077] },
  { name: "Delhi University", coords: [28.6850, 77.2089] },
  { name: "HITEC City", coords: [17.4485, 78.3908] },
];

export const commuteFor = (room: Room, dest: [number, number]) => {
  const km = haversineKm(room.coords, dest);
  const minutes = Math.max(5, Math.round(km * 3.2 + 5)); // ~3.2 min/km city traffic
  return { km: Math.round(km * 10) / 10, minutes };
};

// Safety / area insights (deterministic per city)
export const areaInsight = (city: string) => {
  const seed = city.length;
  const safety = 70 + ((seed * 7) % 25); // 70-95
  return {
    safety,
    label: safety >= 85 ? "Safe for students" : safety >= 75 ? "Generally safe" : "Stay alert at night",
    nearby: [
      { name: "Police station", dist: `${0.4 + (seed % 9) / 10}km` },
      { name: "Hospital", dist: `${0.6 + (seed % 7) / 10}km` },
      { name: "Metro / Bus", dist: `${0.2 + (seed % 5) / 10}km` },
      { name: "Grocery", dist: `${0.3 + (seed % 6) / 10}km` },
    ],
  };
};
