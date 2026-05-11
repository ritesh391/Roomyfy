import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar, Clock, CheckCircle2, XCircle, Hourglass } from "lucide-react";
import { api } from "@/lib/api";

const statusConfig = {
  pending: { label: "Pending", color: "bg-warning/15 text-warning", Icon: Hourglass },
  confirmed: { label: "Confirmed", color: "bg-success/15 text-success", Icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-destructive/15 text-destructive", Icon: XCircle },
  completed: { label: "Completed", color: "bg-secondary text-muted-foreground", Icon: CheckCircle2 },
} as const;

const Bookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await api.getMyBookings();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <header className="px-5 pt-6 pb-4">
        <h1 className="font-display text-2xl font-bold">My bookings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track all your room requests in one place.
        </p>
      </header>

      <div className="px-5 flex flex-col gap-3">
        {loading && (
          <p className="text-sm text-muted-foreground text-center py-10">
            Loading bookings...
          </p>
        )}

        {!loading && bookings.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-display font-semibold text-base">No bookings yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Browse rooms and make your first booking!
            </p>
            <Link
              to="/search"
              className="inline-block mt-4 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full"
            >
              Browse rooms
            </Link>
          </div>
        )}

        {!loading && bookings.map((b) => {
          const property = b.property;
          const cfg = statusConfig[b.status as keyof typeof statusConfig] || statusConfig.pending;

          return (
            <Link
              key={b._id}
              to={`/room/${property?._id}`}
              className="rounded-3xl bg-card shadow-soft overflow-hidden flex hover:shadow-card transition"
            >
              <img
                src={
                  Array.isArray(property?.images) && property.images.length > 0
                    ? property.images[0]
                    : "/placeholder.svg"
                }
                alt={property?.title}
                className="h-32 w-32 object-cover"
              />
              <div className="flex-1 p-3.5 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-semibold text-sm leading-tight truncate">
                      {property?.title || "Room"}
                    </h3>
                    <span className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${cfg.color}`}>
                      <cfg.Icon className="h-3 w-3" /> {cfg.label}
                    </span>
                  </div>
                  <div className="mt-1.5 text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      {property?.location || "Location"}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {new Date(b.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </div>
                  </div>
                </div>
                <div className="font-display font-bold text-sm">
                  ₹{property?.rent?.toLocaleString("en-IN")}
                  <span className="text-[10px] font-medium text-muted-foreground">/mo</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Bookings;