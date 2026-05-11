import { Link } from "react-router-dom";
import { ArrowLeft, Bell, MessageCircle, CheckCircle2, Sparkles } from "lucide-react";
import { mockNotifications } from "@/data/rooms";

const iconFor = (type: string) =>
  type === "booking" ? CheckCircle2 : type === "chat" ? MessageCircle : Sparkles;

const Notifications = () => {
  return (
    <div>
      <header className="flex items-center gap-3 px-5 pt-6 pb-4">
        <Link to="/" className="-ml-2 p-2"><ArrowLeft className="h-5 w-5" /></Link>
        <h1 className="font-display text-xl font-bold flex-1">Notifications</h1>
        <Bell className="h-5 w-5 text-muted-foreground" />
      </header>
      <div className="px-5 space-y-2">
        {mockNotifications.map((n) => {
          const Icon = iconFor(n.type);
          return (
            <div
              key={n.id}
              className={`rounded-2xl bg-card p-4 flex gap-3 shadow-soft ${n.unread ? "ring-1 ring-primary/30" : ""}`}
            >
              <div className="h-10 w-10 rounded-xl bg-primary-soft inline-flex items-center justify-center text-primary shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm">{n.title}</h3>
                  <span className="text-[11px] text-muted-foreground shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
