import { Link } from "react-router-dom";
import { Star, MapPin, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Room } from "@/data/rooms";
import { cn } from "@/lib/utils";
import { TrustBadge } from "@/components/TrustBadge";
import { PriceInsightTag } from "@/components/PriceInsight";
import { commuteFor } from "@/lib/insights";

interface RoomCardProps {
  room: Room;
  variant?: "default" | "featured" | "compact";
  destination?: [number, number] | null;
}

export const RoomCard = ({ room, variant = "default", destination = null }: RoomCardProps) => {
  const commute = destination ? commuteFor(room, destination) : null;
  if (variant === "featured") {
    return (
      <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} className="shrink-0">
        <Link
          to={`/room/${room.id}`}
          className="block w-72 overflow-hidden rounded-3xl bg-card shadow-card group"
        >
          <div className="relative h-44 overflow-hidden">
            <img
              src={room.images[0]}
              alt={room.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
            {room.verified && (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-semibold text-success">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified
              </span>
            )}
            <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-semibold">
                <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {room.rating}
              </span>
              <TrustBadge room={room} size="sm" />
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-primary-foreground">
              <h3 className="font-display text-lg font-semibold leading-tight">{room.title}</h3>
              <div className="flex items-center gap-1 text-xs opacity-90 mt-1">
                <MapPin className="h-3 w-3" /> {room.location}, {room.city}
                {commute && (
                  <span className="ml-2 inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {commute.minutes} min</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="font-display text-xl font-bold text-foreground">
                  ₹{room.price.toLocaleString("en-IN")}
                  <span className="text-xs font-medium text-muted-foreground">/mo</span>
                </div>
              </div>
              <PriceInsightTag room={room} />
            </div>
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">{room.type}</span>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>
      <Link
        to={`/room/${room.id}`}
        className={cn(
          "flex gap-3 rounded-2xl bg-card p-3 shadow-soft hover:shadow-card transition-all",
          variant === "compact" && "items-center"
        )}
      >
        <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
          <img src={room.images[0]} alt={room.title} loading="lazy" className="h-full w-full object-cover" />
          {room.recommended && (
            <span className="absolute top-1 left-1 inline-flex items-center gap-0.5 rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-bold text-accent-foreground">
              <Sparkles className="h-2.5 w-2.5" /> AI
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div>

            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display font-semibold text-sm leading-tight truncate">{room.title}</h3>
              <span className="flex items-center gap-0.5 text-xs font-semibold shrink-0">
                <Star className="h-3 w-3 fill-warning text-warning" /> {room.rating}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" /> {room.location}
              {room.verified && <ShieldCheck className="h-3 w-3 text-success ml-1" />}
              {commute && (
                <span className="ml-1.5 inline-flex items-center gap-0.5 text-primary font-semibold"><Clock className="h-3 w-3" /> {commute.minutes}m</span>
              )}
            </div>
            <div className="mt-1 flex flex-wrap gap-1">
              <TrustBadge room={room} size="sm" />
              <PriceInsightTag room={room} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-display font-bold text-base">
              ₹{room.price.toLocaleString("en-IN")}
              <span className="text-[11px] font-medium text-muted-foreground">/mo</span>
            </div>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground">
              {room.type}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
