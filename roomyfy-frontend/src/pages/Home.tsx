import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, Search, Sparkles, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import { cities, popularColleges } from "@/data/rooms";
import { RoomCard } from "@/components/RoomCard";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

const Home = () => {
  const navigate = useNavigate();

  const [backendRooms, setBackendRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
      const data = await api.getProperties();
        const formattedRooms = (data || []).map((property: any) => ({
          id: property._id,
          title: property.title,
          description: property.description,
          price: property.rent,
          rent: property.rent,
          location: property.location,
          city: property.location,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          image:
            Array.isArray(property.images) && property.images.length > 0
              ? property.images[0]
              : "/placeholder.svg",
          images: Array.isArray(property.images) ? property.images : [],
          featured: true,
          recommended: true,
          type: property.type || "Flat",
          amenities: property.amenities || [],
          owner: property.owner,
        }));

        setBackendRooms(formattedRooms);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const allRooms = backendRooms;

  const featured = allRooms.filter((r: any) => r.featured);
  const recommended = allRooms.filter((r: any) => r.recommended);

  return (
    <div>
      <header className="bg-gradient-soft px-5 pt-6 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between">
          <Logo size={28} />

          <Link
            to="/notifications"
            aria-label="Notifications"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-soft"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
          </Link>
        </div>

        <div className="mt-5">
          <p className="text-sm text-muted-foreground">Hey there 👋</p>

          <h1 className="font-display text-2xl font-bold leading-tight">
            Find your next <span className="text-primary">happy place</span>
          </h1>
        </div>

        <button
          onClick={() => navigate("/search")}
          className="mt-4 flex w-full items-center gap-3 rounded-2xl bg-card px-4 py-3.5 shadow-soft text-left"
        >
          <Search className="h-5 w-5 text-muted-foreground" />

          <span className="text-sm text-muted-foreground flex-1">
            Search by city, area or college…
          </span>

          <span className="text-[11px] rounded-full bg-primary-soft px-2 py-1 font-semibold text-primary">
            Filters
          </span>
        </button>
      </header>

      <section className="px-5 mt-6">
        <h2 className="font-display text-base font-semibold mb-3">
          Popular cities
        </h2>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5">
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => navigate(`/search?city=${encodeURIComponent(c)}`)}
              className="shrink-0 inline-flex items-center gap-1 rounded-full bg-card px-4 py-2 text-sm font-medium shadow-soft hover:bg-primary-soft transition"
            >
              <MapPin className="h-3.5 w-3.5 text-primary" /> {c}
            </button>
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-5 mt-6 rounded-3xl bg-gradient-hero p-5 text-primary-foreground shadow-glow relative overflow-hidden"
      >
        <Sparkles className="absolute -right-2 -top-2 h-24 w-24 opacity-20" />

        <div className="text-xs uppercase tracking-wider font-semibold opacity-90">
          Roomyfy AI
        </div>

        <h3 className="font-display text-xl font-bold mt-1 leading-tight">
          Smart picks based on your preferences
        </h3>

        <p className="text-sm opacity-90 mt-1">
          {backendRooms.length} verified rooms matched your vibe today.
        </p>

        <Button
          variant="soft"
          size="sm"
          className="mt-3 bg-white text-primary hover:bg-white/90"
          asChild
        >
          <Link to="/search?ai=1">See AI picks →</Link>
        </Button>
      </motion.section>

      <section className="mt-7">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="font-display text-base font-semibold">
            Featured rooms
          </h2>

          <Link to="/search" className="text-xs font-semibold text-primary">
            See all
          </Link>
        </div>

        {loading ? (
          <p className="px-5 text-sm text-muted-foreground">Loading rooms...</p>
        ) : featured.length === 0 ? (
          <p className="px-5 text-sm text-muted-foreground">
            No listings found. Add your first listing 🚀
          </p>
        ) : (
          <div className="flex gap-4 overflow-x-auto scrollbar-hide px-5 pb-2">
            {featured.map((r: any) => (
              <RoomCard key={r.id} room={r} variant="featured" />
            ))}
          </div>
        )}
      </section>

      <section className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-base font-semibold inline-flex items-center gap-1.5">
            Recommended for you <Sparkles className="h-4 w-4 text-accent" />
          </h2>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">
            Loading recommendations...
          </p>
        ) : recommended.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recommended rooms available.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {recommended.map((r: any) => (
              <RoomCard key={r.id} room={r} />
            ))}
          </div>
        )}
      </section>

      <section className="px-5 mt-7">
        <h2 className="font-display text-base font-semibold mb-3">
          Near top colleges
        </h2>

        <div className="grid grid-cols-2 gap-2">
          {popularColleges.map((c) => (
            <button
              key={c}
              onClick={() =>
                navigate(`/search?college=${encodeURIComponent(c)}`)
              }
              className="rounded-2xl bg-secondary p-3 text-left text-sm font-medium hover:bg-primary-soft transition"
            >
              🎓 {c}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;