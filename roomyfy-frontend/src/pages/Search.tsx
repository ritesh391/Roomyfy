import { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal, Search as SearchIcon, Map, List, Navigation } from "lucide-react";
import { RoomType } from "@/data/rooms";
import { RoomCard } from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MapView } from "@/components/MapView";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { commuteFor, destinationPresets } from "@/lib/insights";
import { api } from "@/lib/api";

const types: RoomType[] = ["PG", "Flat", "Hostel", "Studio"];

const Search = () => {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("city") || "");
  const [view, setView] = useState<"list" | "map">("list");
  const [type, setType] = useState<RoomType | "All">("All");
  const [price, setPrice] = useState<[number, number]>([3000, 25000]);
  const [furnishedOnly, setFurnishedOnly] = useState(false);
  const [acOnly, setAcOnly] = useState(false);
  const [destName, setDestName] = useState<string>("none");
  const [maxCommute, setMaxCommute] = useState<number>(60);
  const [backendRooms, setBackendRooms] = useState<any[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  const destination = destName === "none" ? null : destinationPresets.find((d) => d.name === destName) ?? null;

  useEffect(() => {
    const fetchRooms = async () => {
      setFetchLoading(true);
      try {
        const data = await api.getProperties(query);
        const formatted = (data || []).map((property: any) => ({
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
          furnished: property.furnished || false,
          ac: property.ac || false,
          nearCollege: property.nearCollege || "",
        }));
        setBackendRooms(formatted);
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchRooms();
  }, [query]);

  const results = useMemo(() => {
    return backendRooms
      .filter((r) => {
        if (type !== "All" && r.type !== type) return false;
        if (r.price < price[0] || r.price > price[1]) return false;
        if (furnishedOnly && !r.furnished) return false;
        if (acOnly && !r.ac) return false;
        if (destination) {
          const c = commuteFor(r, destination.coords);
          if (c.minutes > maxCommute) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (!destination) return 0;
        return commuteFor(a, destination.coords).minutes - commuteFor(b, destination.coords).minutes;
      });
  }, [backendRooms, type, price, furnishedOnly, acOnly, destination, maxCommute]);

  return (
    <div>
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl px-5 pt-5 pb-3 border-b border-border/60">
        <div className="flex items-center gap-3">
          <Link to="/" aria-label="Back" className="-ml-2 p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex flex-1 items-center gap-2 rounded-2xl bg-secondary px-3 py-2.5">
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="City, area or college"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="soft" aria-label="Filters">
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl max-w-md mx-auto">
              <SheetHeader>
                <SheetTitle className="font-display">Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-5 space-y-6">
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Room type
                  </Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(["All", ...types] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                          type === t
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Label>Price (₹/mo)</Label>
                    <span className="font-semibold">
                      ₹{price[0].toLocaleString()} – ₹{price[1].toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={price}
                    onValueChange={(v) => setPrice(v as [number, number])}
                    min={2000}
                    max={40000}
                    step={500}
                  />
                </div>
                <div className="rounded-2xl bg-primary-soft/60 p-3 space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-primary inline-flex items-center gap-1.5">
                    <Navigation className="h-3.5 w-3.5" /> Smart commute
                  </Label>
                  <Select value={destName} onValueChange={setDestName}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pick destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No destination</SelectItem>
                      {destinationPresets.map((d) => (
                        <SelectItem key={d.name} value={d.name}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Max commute</span>
                      <span className="font-semibold">{maxCommute} min</span>
                    </div>
                    <Slider
                      value={[maxCommute]}
                      onValueChange={(v) => setMaxCommute(v[0])}
                      min={10}
                      max={120}
                      step={5}
                      disabled={destName === "none"}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="furn">Furnished only</Label>
                  <Switch
                    id="furn"
                    checked={furnishedOnly}
                    onCheckedChange={setFurnishedOnly}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="ac">AC only</Label>
                  <Switch
                    id="ac"
                    checked={acOnly}
                    onCheckedChange={setAcOnly}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-muted-foreground">
            {fetchLoading ? "Searching..." : `${results.length} rooms found`}
          </p>
          <div className="flex rounded-full bg-secondary p-1">
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                view === "list" ? "bg-card shadow-soft" : "text-muted-foreground"
              }`}
            >
              <List className="h-3.5 w-3.5" /> List
            </button>
            <button
              onClick={() => setView("map")}
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                view === "map" ? "bg-card shadow-soft" : "text-muted-foreground"
              }`}
            >
              <Map className="h-3.5 w-3.5" /> Map
            </button>
          </div>
        </div>
      </header>

      {view === "list" ? (
        <div className="px-5 py-4 flex flex-col gap-3">
          {destination && (
            <div className="rounded-2xl bg-primary-soft/60 px-3 py-2 text-xs font-medium text-primary inline-flex items-center gap-2 w-fit">
              <Navigation className="h-3.5 w-3.5" /> Sorted by commute to{" "}
              {destination.name}
            </div>
          )}
          {fetchLoading && (
            <div className="text-center py-16 text-muted-foreground text-sm">
              Loading rooms...
            </div>
          )}
          {!fetchLoading && results.length === 0 && (
            <div className="text-center py-16 text-muted-foreground text-sm">
              No rooms match your filters.
            </div>
          )}
          {!fetchLoading &&
            results.map((r) => (
              <RoomCard
                key={r.id}
                room={r}
                destination={destination?.coords ?? null}
              />
            ))}
        </div>
      ) : (
        <div className="px-5 py-4">
          <MapView rooms={results} />
        </div>
      )}
    </div>
  );
};

export default Search;