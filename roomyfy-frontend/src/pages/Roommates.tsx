import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Users, MessageCircle, Cigarette, Wine, Moon, Sun, Sparkles, Dog, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { defaultPreferences, matchScore, MyPreferences, roommates } from "@/data/roommates";
import { cities } from "@/data/rooms";
import { cn } from "@/lib/utils";

const Roommates = () => {
  const [prefs, setPrefs] = useState<MyPreferences>(defaultPreferences);
  const [showPrefs, setShowPrefs] = useState(false);

  const ranked = useMemo(
    () =>
      roommates
        .map((r) => ({ r, score: matchScore(prefs, r) }))
        .sort((a, b) => b.score - a.score),
    [prefs]
  );

  return (
    <div className="pb-24 md:pb-6">
      <header className="px-5 pt-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold leading-tight flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" /> Find a roommate
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Compatibility scored on lifestyle, budget & location.</p>
          </div>
          <Button variant="soft" size="sm" onClick={() => setShowPrefs((v) => !v)}>
            {showPrefs ? "Hide" : "My preferences"}
          </Button>
        </div>
      </header>

      {showPrefs && (
        <motion.section
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-5 mt-4 rounded-3xl bg-card shadow-soft p-4 space-y-5"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">City</Label>
              <Select value={prefs.city} onValueChange={(v) => setPrefs({ ...prefs, city: v })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Profession</Label>
              <Select value={prefs.profession} onValueChange={(v) => setPrefs({ ...prefs, profession: v as MyPreferences["profession"] })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Working Professional">Working Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <Label>Budget (₹/mo)</Label>
              <span className="font-semibold">₹{prefs.budget.toLocaleString()}</span>
            </div>
            <Slider value={[prefs.budget]} onValueChange={(v) => setPrefs({ ...prefs, budget: v[0] })} min={3000} max={40000} step={500} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Sleep</Label>
              <Select value={prefs.lifestyle.sleep} onValueChange={(v) => setPrefs({ ...prefs, lifestyle: { ...prefs.lifestyle, sleep: v as any } })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Early bird">Early bird</SelectItem>
                  <SelectItem value="Night owl">Night owl</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Food</Label>
              <Select value={prefs.lifestyle.food} onValueChange={(v) => setPrefs({ ...prefs, lifestyle: { ...prefs.lifestyle, food: v as any } })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Veg">Veg</SelectItem>
                  <SelectItem value="Non-veg">Non-veg</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Cleanliness</Label>
              <Select value={prefs.lifestyle.cleanliness} onValueChange={(v) => setPrefs({ ...prefs, lifestyle: { ...prefs.lifestyle, cleanliness: v as any } })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tidy">Tidy</SelectItem>
                  <SelectItem value="Average">Average</SelectItem>
                  <SelectItem value="Relaxed">Relaxed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2 items-end">
              <label className="flex items-center justify-between rounded-xl bg-secondary px-3 py-2 text-xs">
                <span>Smoker</span>
                <Switch checked={prefs.lifestyle.smoking} onCheckedChange={(c) => setPrefs({ ...prefs, lifestyle: { ...prefs.lifestyle, smoking: c } })} />
              </label>
              <label className="flex items-center justify-between rounded-xl bg-secondary px-3 py-2 text-xs">
                <span>Pets ok</span>
                <Switch checked={prefs.lifestyle.pets} onCheckedChange={(c) => setPrefs({ ...prefs, lifestyle: { ...prefs.lifestyle, pets: c } })} />
              </label>
            </div>
          </div>
        </motion.section>
      )}

      <section className="px-5 mt-5 space-y-3">
        {ranked.map(({ r, score }) => (
          <motion.div
            key={r.id}
            whileHover={{ y: -2 }}
            className="rounded-3xl bg-card shadow-soft p-4"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={r.avatar} alt={r.name} className="h-14 w-14 rounded-2xl object-cover" />
                <span className={cn(
                  "absolute -bottom-1 -right-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ring-2 ring-card",
                  score >= 85 ? "bg-success text-success-foreground" : score >= 65 ? "bg-warning text-warning-foreground" : "bg-secondary text-secondary-foreground"
                )}>
                  {score}%
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display font-semibold text-base truncate">{r.name}, {r.age}</h3>
                  <span className="text-xs font-medium text-muted-foreground shrink-0">{r.city}</span>
                </div>
                <div className="text-xs text-muted-foreground">{r.profession} · ₹{r.budget.toLocaleString()}/mo</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-foreground/85 leading-relaxed">{r.bio}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Chip icon={r.lifestyle.sleep === "Early bird" ? Sun : Moon} label={r.lifestyle.sleep} />
              <Chip icon={Utensils} label={r.lifestyle.food} />
              <Chip icon={Sparkles} label={r.lifestyle.cleanliness} />
              {r.lifestyle.smoking && <Chip icon={Cigarette} label="Smokes" />}
              {r.lifestyle.drinking && <Chip icon={Wine} label="Drinks" />}
              {r.lifestyle.pets && <Chip icon={Dog} label="Pets" />}
            </div>
            <div className="mt-4 flex gap-2">
              <Button asChild variant="soft" className="flex-1">
                <Link to="/chats"><MessageCircle className="h-4 w-4" /> Message</Link>
              </Button>
              <Button variant="hero" className="flex-1">Connect</Button>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

const Chip = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
    <Icon className="h-3 w-3" /> {label}
  </span>
);

export default Roommates;
