"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, MessageCircle, Loader2, Heart } from "lucide-react"

interface Message {
  role: "user" | "therapist" | "system"
  content: string
}

const SYSTEM_PROMPT: Message = {
  role: "system",
  content:
    "You are a compassionate AI therapist with a Gen Z personality. Use supportive language, occasional emojis, and terms like 'bestie' when appropriate. Respond with empathy and support. Focus on helping with sadness, depression, anxiety, and mental health. Keep responses concise but caring.",
}

const WELCOME_MESSAGE: Message = {
  role: "therapist",
  content:
    "Hey bestie! 👩‍⚕️ I'm your AI Therapist and I'm here to support you through anything on your mind! Whether it's sadness, anxiety, depression, or just need someone to talk to - I've got you! How are you feeling today? 💕",
}

export function TherapistChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, open])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)
    setError(null)

    try {
      // Always prepend the system prompt for the AI therapist persona
      const apiMessages = [
        SYSTEM_PROMPT,
        ...messages.map((m) => (m.role === "therapist" ? { ...m, role: "assistant" } : m)),
        { role: "user", content: input },
      ]

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from AI")
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "therapist", content: data.text }])
    } catch (err) {
      setError("Oops bestie! Something went wrong. Please try again! 💕")
      setMessages((prev) => [
        ...prev,
        {
          role: "therapist",
          content:
            "Sorry bestie, something went wrong on my end! 😅 Can you try again? I promise I'm usually better at this! 💕",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Helper to get bubble styling based on role
  const getBubbleClass = (role: Message["role"]) => {
    switch (role) {
      case "user":
        return "bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold ml-auto rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-300"
      case "therapist":
        return "bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 font-medium mr-auto rounded-3xl border-2 border-purple-200 shadow-lg transform hover:scale-105 transition-all duration-300"
      case "system":
        return "bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 font-medium mx-auto rounded-3xl border-2 border-orange-200"
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-medium mr-auto rounded-3xl"
    }
  }

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full p-4 shadow-2xl flex items-center transform hover:scale-110 transition-all duration-300 border-4 border-white animate-pulse"
          onClick={() => setOpen(true)}
          aria-label="Open AI Therapist Chatbot"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <Heart className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300 animate-bounce" />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full">
          <Card className="shadow-2xl border-4 border-purple-400 rounded-3xl bg-gradient-to-br from-white/95 to-purple-100/95 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-pink-500 to-purple-600 rounded-t-2xl p-4">
              <CardTitle className="text-white text-lg font-black flex items-center gap-3">
                <div className="relative">
                  <span role="img" aria-label="Therapist" className="text-2xl animate-bounce">
                    👩‍⚕️
                  </span>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-ping"></div>
                </div>
                💕 AI Therapist
              </CardTitle>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="text-white hover:bg-white/20 rounded-full transform hover:scale-110 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>

            <CardContent className="bg-gradient-to-br from-white to-purple-50 p-4 h-80 flex flex-col rounded-b-2xl">
              <div ref={chatRef} className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
                {messages.map((msg, i) => (
                  <div key={i} className={`text-sm p-4 max-w-[85%] ${getBubbleClass(msg.role)}`}>
                    {msg.content}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-3 text-purple-600 font-semibold">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="animate-pulse">AI is thinking... 🤔✨</span>
                  </div>
                )}

                {error && (
                  <div className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-2xl border-2 border-red-200">
                    {error}
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Share what's on your mind bestie... 💭"
                  className="flex-1 border-3 border-purple-300 rounded-2xl focus:border-pink-500 focus:ring-4 focus:ring-pink-200 bg-white font-medium"
                  disabled={loading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-4 py-2 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-white"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "💌"}
                </Button>
              </div>

              <div className="text-xs text-purple-600 font-semibold text-center mt-2 bg-purple-50 p-2 rounded-lg">
                🔒 Your conversations are private and secure bestie! 💕
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
