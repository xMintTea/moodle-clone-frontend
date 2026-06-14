import { useParams, Link } from "@tanstack/react-router";
import { courses, chatMessages } from "../data/mockData";
import type { ChatMessage } from "../data/mockData";
import { ChevronLeft, Send, BookOpen } from "lucide-react";
import { useState, useRef, useEffect, type KeyboardEvent, type ChangeEvent } from "react";
import { Button } from "../components/ui/button";
import { Route } from "#/routes/_app/course/$courseId/chat";

const MY_USER = {
  id: "s001",
  name: "Alex Johnson",
  role: "student" as const,
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
};

function formatTime(ts: string) {
  const d = new Date(ts);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 1) return `Yesterday ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function groupByDate(messages: ChatMessage[]) {
  const groups: { label: string; messages: ChatMessage[] }[] = [];
  let lastLabel = "";
  for (const msg of messages) {
    const d = new Date(msg.timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    const label = diffDays === 0 ? "Today" : diffDays === 1 ? "Yesterday"
      : d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    if (label !== lastLabel) {
      groups.push({ label, messages: [] });
      lastLabel = label;
    }
    groups[groups.length - 1].messages.push(msg);
  }
  return groups;
}

export function CourseChatPage() {
  const { courseId } = Route.useParams()
  const course = courses.find(c => c.id === "cs101");
  const initial = chatMessages.filter(m => m.courseId === courseId);

  const [messages, setMessages] = useState<ChatMessage[]>(initial);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">Course not found</h2>
        <Link to="/" className="text-blue-600 hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      courseId,
      authorId: MY_USER.id,
      authorName: MY_USER.name,
      authorRole: MY_USER.role,
      authorAvatar: MY_USER.avatarUrl,
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  const groups = groupByDate(messages);
  const participants = [...new Set(messages.map(m => m.authorName))];

  return (
    <div className="max-w-4xl mx-auto flex flex-col" style={{ height: "calc(100vh - 120px)" }}>
      {/* Header */}
      <div className="bg-white rounded-t-lg shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3 px-5 py-4">
          <Link
            to="/course/$courseId"
            params={{ courseId }}
            className="text-gray-500 hover:text-gray-800 mr-1"
          >
            <ChevronLeft size={22} />
          </Link>
          <div className={`${course.color} p-2 rounded-lg`}>
            <BookOpen size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-gray-900">{course.name}</h1>
            <p className="text-xs text-gray-500">{course.code} · {participants.length} participant{participants.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {/* Participants */}
        <div className="flex items-center gap-2 px-5 pb-3 overflow-x-auto">
          <span className="text-xs text-gray-400 shrink-0">In this chat:</span>
          {participants.map(name => (
            <span key={name} className="shrink-0 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full whitespace-nowrap">
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-5 py-4 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <BookOpen size={48} className="mb-4 opacity-30" />
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          groups.map(group => (
            <div key={group.label}>
              {/* Date divider */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 px-2">{group.label}</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="space-y-4">
                {group.messages.map(msg => {
                  const isMe = msg.authorId === MY_USER.id;
                  return (
                    <div key={msg.id} className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}>
                      {/* Avatar */}
                      <img
                        src={msg.authorAvatar}
                        alt={msg.authorName}
                        className="w-9 h-9 rounded-full object-cover shrink-0 self-end"
                      />
                      {/* Bubble */}
                      <div className={`max-w-[72%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                        {!isMe && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-700">{msg.authorName}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                              msg.authorRole === "teacher"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-500"
                            }`}>
                              {msg.authorRole}
                            </span>
                          </div>
                        )}
                        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                          isMe
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : msg.authorRole === "teacher"
                            ? "bg-blue-50 text-gray-800 border border-blue-100 rounded-bl-sm"
                            : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm"
                        }`}>
                          {msg.content}
                        </div>
                        <span className="text-xs text-gray-400 px-1">{formatTime(msg.timestamp)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white rounded-b-lg shadow-sm border-t border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-end gap-3">
          <img
            src={MY_USER.avatarUrl}
            alt={MY_USER.name}
            className="w-9 h-9 rounded-full object-cover shrink-0"
          />
          <div className="flex-1 border border-gray-200 rounded-2xl flex items-end gap-2 px-4 py-2 focus-within:border-blue-400 transition-colors">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Type a message… (Enter to send, Shift+Enter for new line)"
              rows={1}
              className="flex-1 resize-none text-sm focus:outline-none bg-transparent leading-relaxed"
              style={{ maxHeight: "160px" }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`shrink-0 p-1.5 rounded-full transition-colors mb-0.5 ${
                input.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-300"
              }`}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2 ml-12">
          Sending as <strong>{MY_USER.name}</strong>
        </p>
      </div>
    </div>
  );
}
