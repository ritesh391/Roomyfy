import { ShieldCheck, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Room } from "@/data/rooms";
import { trustFactors, trustMeta, trustTier } from "@/lib/insights";
import { cn } from "@/lib/utils";

interface Props {
  room: Room;
  size?: "sm" | "md" | "lg";
  showWhy?: boolean;
}

export const TrustBadge = ({ room, size = "md", showWhy = false }: Props) => {
  const tier = trustTier(room.trustScore);
  const meta = trustMeta(tier);

  const padding = size === "sm" ? "px-1.5 py-0.5 text-[10px]" : size === "lg" ? "px-3 py-1.5 text-sm" : "px-2 py-1 text-[11px]";

  const pill = (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold ring-1",
        meta.bg,
        meta.color,
        meta.ring,
        padding
      )}
    >
      <ShieldCheck className={cn(size === "lg" ? "h-4 w-4" : "h-3 w-3")} />
      Trust {room.trustScore}
    </span>
  );

  if (!showWhy) return pill;

  const factors = trustFactors(room);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="inline-flex items-center gap-1">
          {pill}
          <Info className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="start">
        <div className="flex items-center justify-between mb-2">
          <div className="font-display font-semibold text-sm">{meta.emoji} {meta.label}</div>
          <span className={cn("font-bold", meta.color)}>{room.trustScore}/100</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">Why this score?</p>
        <div className="space-y-2">
          {factors.map((f) => (
            <div key={f.label}>
              <div className="flex justify-between text-[11px] mb-1">
                <span>{f.label}</span>
                <span className="font-semibold">{f.score}</span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full",
                    f.score >= 85 ? "bg-success" : f.score >= 65 ? "bg-warning" : "bg-destructive"
                  )}
                  style={{ width: `${f.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
