import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { MessageCircle } from "lucide-react";

const Chats = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await api.getMyChats();
        setChats(data.chats || []);
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  const getOtherParticipant = (chat: any) => {
    return chat.participants?.find((p: any) => p._id !== user?.id) || chat.participants?.[0];
  };

  return (
    <div>
      <header className="px-5 pt-6 pb-4">
        <h1 className="font-display text-2xl font-bold">Messages</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Chat with owners and tenants
        </p>
      </header>

      <div className="px-2">
        {loading && (
          <p className="text-sm text-muted-foreground text-center py-10">
            Loading chats...
          </p>
        )}

        {!loading && chats.length === 0 && (
          <div className="text-center py-16">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="font-display font-semibold text-base">No messages yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Book a room to start chatting with owners!
            </p>
            <Link
              to="/search"
              className="inline-block mt-4 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full"
            >
              Browse rooms
            </Link>
          </div>
        )}

        {!loading && chats.map((c) => {
          const other = getOtherParticipant(c);
          const initials = other?.name?.charAt(0)?.toUpperCase() || "?";
          const timeAgo = c.lastTime
            ? new Date(c.lastTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";

          return (
            <Link
              key={c._id}
              to={`/chat/${c._id}`}
              className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-secondary transition"
            >
              <div className="h-12 w-12 rounded-full bg-primary-soft inline-flex items-center justify-center font-bold text-primary text-lg shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">
                    {other?.name || "Unknown"}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {timeAgo}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-muted-foreground truncate">
                    {c.lastMessage || c.property?.title || "Start a conversation"}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Chats;