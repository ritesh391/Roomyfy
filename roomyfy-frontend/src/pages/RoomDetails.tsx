import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, Heart, Share2, ShieldCheck, MessageCircle,
  Wifi, Snowflake, Utensils, Car, Dumbbell, Battery,
  BookOpen, Sparkles, Phone, Shield, Hospital, Train,
  ShoppingBag, MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { areaInsight } from "@/lib/insights";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const amenityIcon: Record<string, any> = {
  WiFi: Wifi,
  AC: Snowflake,
  Meals: Utensils,
  Parking: Car,
  Gym: Dumbbell,
  "Power Backup": Battery,
  Library: BookOpen,
  "Study Room": BookOpen,
  Kitchen: Utensils,
  Kitchenette: Utensils,
  Laundry: Sparkles,
  Lift: Sparkles,
  Security: ShieldCheck,
  Pool: Sparkles,
};

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [liked, setLiked] = useState(false);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await api.getProperty(id!);
        setRoom(data.property);
      } catch (err) {
        console.error("Failed to fetch room:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const handleBooking = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to book a room");
      navigate("/login");
      return;
    }
    try {
      setBooking(true);
      await api.createBooking({ propertyId: id! });
      toast.success("Booking request sent! 🎉", {
        description: "The owner will respond shortly.",
      });
      setTimeout(() => navigate("/bookings"), 800);
    } catch (err: any) {
      toast.error(err?.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-3">🏠</div>
          <p className="text-sm text-muted-foreground">Loading room details...</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="p-6 text-center">
        <div className="text-4xl mb-3">😕</div>
        <p className="text-muted-foreground mb-3">Room not found.</p>
        <Link to="/" className="text-primary font-semibold">
          Back to Home
        </Link>
      </div>
    );
  }

  const images =
    Array.isArray(room.images) && room.images.length > 0
      ? room.images
      : ["/placeholder.svg"];

  return (
    <div className="pb-32">
      {/* Image Gallery */}
      <div className="relative">
        <motion.img
          key={activeImg}
          src={images[activeImg]}
          alt={room.title}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          className="h-80 w-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-full bg-background/90 inline-flex items-center justify-center shadow-soft"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            <button
              aria-label="Share"
              className="h-10 w-10 rounded-full bg-background/90 inline-flex items-center justify-center shadow-soft"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              aria-label="Save"
              onClick={() => setLiked((v) => !v)}
              className="h-10 w-10 rounded-full bg-background/90 inline-flex items-center justify-center shadow-soft"
            >
              <Heart
                className={`h-4 w-4 ${liked ? "fill-primary text-primary" : ""}`}
              />
            </button>
          </div>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            {images.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`h-1.5 flex-1 rounded-full transition ${
                  i === activeImg ? "bg-primary" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="px-5 pt-5">

        {/* Title & Price */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary">
              {room.type || "Flat"}
            </span>
            <h1 className="font-display text-2xl font-bold mt-2 leading-tight">
              {room.title}
            </h1>
            <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {room.location}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="font-display text-2xl font-bold text-foreground">
              ₹{room.rent?.toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-muted-foreground">per month</div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-secondary p-3 text-center">
            <div className="font-bold text-base">{room.bedrooms ?? 1}</div>
            <div className="text-[10px] text-muted-foreground">Bedrooms</div>
          </div>
          <div className="rounded-2xl bg-secondary p-3 text-center">
            <div className="font-bold text-sm text-success inline-flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified
            </div>
            <div className="text-[10px] text-muted-foreground">By Roomyfy</div>
          </div>
          <div className="rounded-2xl bg-secondary p-3 text-center">
            <div className="font-bold text-base">{room.bathrooms ?? 1}</div>
            <div className="text-[10px] text-muted-foreground">Bathrooms</div>
          </div>
        </div>

        {/* Description */}
        {room.description && (
          <section className="mt-6">
            <h2 className="font-display text-lg font-semibold mb-2">
              About this place
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {room.description}
            </p>
          </section>
        )}

        {/* Amenities */}
        {Array.isArray(room.amenities) && room.amenities.length > 0 && (
          <section className="mt-6">
            <h2 className="font-display text-lg font-semibold mb-3">
              Amenities
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {room.amenities.map((a: string) => {
                const Icon = amenityIcon[a] ?? Sparkles;
                return (
                  <div
                    key={a}
                    className="rounded-2xl bg-card border border-border/70 p-3 flex flex-col items-center gap-1.5 text-center"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-[11px] font-medium">{a}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Owner */}
        {room.owner && (
          <section className="mt-6 rounded-3xl bg-card shadow-soft p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary-soft inline-flex items-center justify-center font-bold text-primary text-lg shrink-0">
              {room.owner?.name?.charAt(0)?.toUpperCase() || "O"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">{room.owner?.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {room.owner?.email}
              </div>
            </div>
            {room.owner?.phone && (
              <a
                href={`tel:${room.owner.phone}`}
                className="h-10 w-10 rounded-full bg-success/10 inline-flex items-center justify-center text-success shrink-0"
              >
                <Phone className="h-4 w-4" />
              </a>
            )}
          </section>
        )}

        {/* Safety */}
        <SafetySection city={room.location || "Delhi"} />

        {/* Location */}
        <section className="mt-6">
          <h2 className="font-display text-lg font-semibold mb-3">Location</h2>
          <div className="rounded-2xl bg-secondary p-5 text-center">
            <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="font-semibold text-sm">{room.location}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Exact location shared after booking
            </p>
          </div>
        </section>

      </div>

      {/* Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-2xl bg-background/95 backdrop-blur-xl border-t border-border/60 px-5 py-3">
       <div className="flex gap-2">
       <Button
         variant="soft"
        className="flex-1"
        onClick={async () => {
        if (!isLoggedIn) { navigate("/login"); return; }
        if (!room.owner?._id) return;
        try {
        const data = await api.createOrGetChat({
          participantId: room.owner._id,
          propertyId: id!
        });
        navigate(`/chat/${data.chat._id}`);
      } catch (err) {
        toast.error("Could not open chat");
      }
    }}
  >
          <MessageCircle className="h-4 w-4 mr-1" /> Chat
          </Button>
          <Button
            variant="hero"
            className="flex-[1.5]"
            onClick={handleBooking}
            disabled={booking}
          >
            {booking
              ? "Booking..."
              : `Book now · ₹${room.rent?.toLocaleString("en-IN")}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

const safetyIcons: Record<string, any> = {
  "Police station": Shield,
  Hospital: Hospital,
  "Metro / Bus": Train,
  Grocery: ShoppingBag,
};

const SafetySection = ({ city }: { city: string }) => {
  const insight = areaInsight(city);
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-lg font-semibold">
          Safety & area insights
        </h2>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            insight.safety >= 85
              ? "bg-success/10 text-success"
              : insight.safety >= 75
              ? "bg-warning/15 text-warning"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          <Shield className="h-3 w-3" /> {insight.label}
        </span>
      </div>
      <div className="rounded-3xl bg-card shadow-soft p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-12 w-12 rounded-2xl bg-success/10 inline-flex items-center justify-center text-success font-bold shrink-0">
            {insight.safety}
          </div>
          <div>
            <div className="text-sm font-semibold">Area safety score</div>
            <div className="text-xs text-muted-foreground">
              Based on resident reviews & data signals
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {insight.nearby.map((n) => {
            const Icon = safetyIcons[n.name] ?? Sparkles;
            return (
              <div
                key={n.name}
                className="flex items-center gap-2 rounded-2xl bg-secondary px-3 py-2"
              >
                <Icon className="h-4 w-4 text-primary shrink-0" />
                <div className="flex-1 text-xs font-medium">{n.name}</div>
                <span className="text-[11px] text-muted-foreground">
                  {n.dist}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;