import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Room } from "@/data/rooms";
import { Link } from "react-router-dom";

// Custom coral marker
const coralIcon = L.divIcon({
  className: "",
  html: `<div style="background:hsl(8 95% 65%);color:white;padding:6px 10px;border-radius:999px;font-weight:700;font-size:11px;box-shadow:0 4px 12px rgba(0,0,0,.2);white-space:nowrap;">₹</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export const MapView = ({ rooms }: { rooms: Room[] }) => {
  const center: [number, number] = rooms[0]?.coords ?? [20.5937, 78.9629];
  return (
    <div className="h-[60vh] w-full overflow-hidden rounded-3xl shadow-card">
      <MapContainer center={center} zoom={11} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {rooms.map((r) => (
          <Marker key={r.id} position={r.coords} icon={coralIcon}>
            <Popup>
              <Link to={`/room/${r.id}`} className="block w-44">
                <img src={r.images[0]} alt={r.title} className="h-20 w-full object-cover rounded-md" />
                <div className="mt-1 font-semibold text-sm">{r.title}</div>
                <div className="text-xs text-gray-500">₹{r.price.toLocaleString("en-IN")}/mo</div>
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
