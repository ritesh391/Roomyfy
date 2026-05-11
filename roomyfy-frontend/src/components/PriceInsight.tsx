import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Room } from "@/data/rooms";
import { priceInsight } from "@/lib/insights";
import { cn } from "@/lib/utils";

export const PriceInsightTag = ({ room, size = "sm" }: { room: Room; size?: "sm" | "md" }) => {
  const ins = priceInsight(room);
  const Icon = ins.verdict === "great" ? TrendingDown : ins.verdict === "high" ? TrendingUp : Minus;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold",
        ins.verdict === "great" && "bg-success/10 text-success",
        ins.verdict === "fair" && "bg-secondary text-muted-foreground",
        ins.verdict === "high" && "bg-destructive/10 text-destructive",
        size === "md" ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[10px]"
      )}
    >
      <Icon className={size === "md" ? "h-3.5 w-3.5" : "h-3 w-3"} />
      {ins.label}
    </span>
  );
};
