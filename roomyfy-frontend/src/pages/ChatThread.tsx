import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Send, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const ChatThread = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [messages, setMessages] = useState<any[]>([]);
  const [chat, setChat] = useState<any>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const [chatsData, messagesData] = await Promise.all([
          api.getMyChats(),
          api.getChatMessages(id!)
        ]);

        const currentChat = chatsData.chats?.find((c: any) => c._id === id);
        setChat(currentChat);
        setMessages(messagesData.messages || []);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [id]);

  // Poll for new messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await api.getChatMessages(id!);
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Poll failed:", err);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [id]);

  const send = async () => {
    if (!text.trim() || sending) return;
    const msgText = text.trim();
    setText("");
    setSending(true);

    try {
      const data = await api.sendMessage(id!, msgText);
      setMessages((m) => [...m, data.message]);
    } catch (err) {
      console.error("Failed to send message:", err);
      setText(msgText);
    } finally {
      setSending(false);
    }
  };

  const getOtherParticipant = () => {
    return chat?.participants?.find((p: any) => p._id !== user?.id) || chat?.participants?.[0];
  };

  const other = getOtherParticipant();

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 border-b border-border/60 bg-background/95 backdrop-blur-xl">
        <button onClick={() => navigate(-1)} className="-ml-2 p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="h-10 w-10 rounded-full bg-primary-soft inline-flex items-center justify-center font-bold text-primary shrink-0">
          {other?.name?.charAt(0)?.toUpperCase() || "?"}
        </div>

        <div className="flex-1">
          <div className="font-semibold text-sm">
            {loading ? "Loading..." : other?.name || "Chat"}
          </div>
          {chat?.property && (
            <div className="text-[11px] text-muted-foreground truncate">
              {chat.property.title}
            </div>
          )}
        </div>

        {other?.phone && (
          <a
            href={`tel:${other.phone}`}
            className="h-10 w-10 rounded-full bg-secondary inline-flex items-center justify-center"
          >
            <Phone className="h-4 w-4" />
          </a>
        )}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {loading && (
          <p className="text-center text-sm text-muted-foreground py-10">
            Loading messages...
          </p>
        )}

        {!loading && messages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">👋</p>
            <p className="text-sm text-muted-foreground">
              Say hello to start the conversation!
            </p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((m) => {
            const isMe = m.sender?._id === user?.id || m.sender === user?.id;
            const time = new Date(m.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <motion.div
                key={m._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${
                    isMe
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-secondary-foreground rounded-bl-sm"
                  }`}
                >
                  {m.text}
                  <div
                    className={`text-[10px] mt-0.5 ${
                      isMe ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    {time}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        className="sticky bottom-0 flex items-center gap-2 px-4 py-3 border-t border-border/60 bg-background safe-bottom"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 h-11 rounded-full bg-secondary px-4 text-sm outline-none focus:ring-2 focus:ring-primary/40"
        />
        <button
          type="submit"
          disabled={sending || !text.trim()}
          className="h-11 w-11 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center shadow-soft disabled:opacity-50"
          aria-label="Send"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

export default ChatThread;