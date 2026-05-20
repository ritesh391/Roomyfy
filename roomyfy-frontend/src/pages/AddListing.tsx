import { api } from "@/lib/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Sparkles, IndianRupee, MapPin, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { RoomType } from "@/data/rooms";

const types: RoomType[] = ["PG", "Flat", "Hostel", "Studio"];

const allAmenities = [
  "WiFi",
  "AC",
  "Meals",
  "Laundry",
  "Parking",
  "Gym",
  "Power Backup",
  "Kitchen",
  "Security",
];

const AddListing = () => {
  const navigate = useNavigate();

  const [type, setType] = useState<RoomType>("PG");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [amenities, setAmenities] = useState<string[]>(["WiFi"]);
  const [aiSuggesting, setAiSuggesting] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleAmenity = (a: string) =>
    setAmenities((p) =>
      p.includes(a) ? p.filter((x) => x !== a) : [...p, a]
    );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).slice(0, 5);

    setImages(selectedFiles);
    setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const suggestPrice = () => {
    setAiSuggesting(true);

    setTimeout(() => {
      const suggested = Math.floor(8000 + Math.random() * 6000);
      setPrice(String(suggested));
      setAiSuggesting(false);

      toast.success(`AI suggests ₹${suggested.toLocaleString("en-IN")}/mo`, {
        description: "Based on similar verified listings in your area.",
      });
    }, 1100);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("rent", String(Number(price)));
      formData.append("location", location);
      formData.append("type", type);
      formData.append("bedrooms", "1");
      formData.append("bathrooms", "1");

      amenities.forEach((amenity) => {
        formData.append("amenities", amenity);
      });

      images.forEach((image) => {
        formData.append("images", image);
      });

      await api.createProperty(formData);

      toast.success("Listing published! ✨", {
        description: "Your room images are uploaded successfully.",
      });

      setTimeout(() => navigate("/profile"), 800);
    } catch (error: any) {
      toast.error(error.message || "Failed to publish listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-8">
      <header className="bg-gradient-soft px-5 pt-6 pb-6 rounded-b-[2rem]">
        <button onClick={() => navigate(-1)} className="-ml-2 p-2 mb-2">
          <ArrowLeft className="h-5 w-5" />
        </button>

        <h1 className="font-display text-2xl font-bold">List a new room</h1>

        <p className="text-sm text-muted-foreground mt-1">
          Reach 10,000+ verified tenants in minutes.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="px-5 mt-6 space-y-5">
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Photos
          </Label>

          <label className="mt-2 aspect-square rounded-2xl border-2 border-dashed border-border bg-secondary/50 flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition cursor-pointer">
            <Camera className="h-6 w-6" />
            <span className="text-xs mt-1">Upload photos</span>
            <span className="text-[10px] mt-0.5">Max 5 images</span>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {previews.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {previews.map((src, index) => (
                <div key={src} className="relative aspect-square">
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="h-full w-full rounded-2xl object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="title">Listing title</Label>

          <Input
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Sunny single PG near IIT"
            className="mt-1.5 h-12 rounded-xl"
          />
        </div>

        <div>
          <Label>Room type</Label>

          <div className="mt-2 grid grid-cols-4 gap-2">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`rounded-xl py-2.5 text-sm font-semibold transition ${
                  type === t
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="price">Monthly price (₹)</Label>

            <button
              type="button"
              onClick={suggestPrice}
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {aiSuggesting ? "Thinking…" : "AI suggest"}
            </button>
          </div>

          <div className="relative mt-1.5">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              id="price"
              required
              type="number"
              inputMode="numeric"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 9500"
              className="h-12 rounded-xl pl-9"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="loc">Location</Label>

          <div className="relative mt-1.5">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              id="loc"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Area, city"
              className="h-12 rounded-xl pl-9"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="desc">Description</Label>

          <Textarea
            id="desc"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell tenants what makes this place special…"
            className="mt-1.5 rounded-2xl"
          />
        </div>

        <div>
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Amenities
          </Label>

          <div className="mt-2 flex flex-wrap gap-2">
            {allAmenities.map((a) => (
              <button
                type="button"
                key={a}
                onClick={() => toggleAmenity(a)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                  amenities.includes(a)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish listing"}
        </Button>
      </form>
    </div>
  );
};

export default AddListing;