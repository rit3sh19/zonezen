"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Send, Loader2, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface CrisisAlert {
  flagged: boolean
  message: string
  resources: {
    crisis_hotline: string
    text_support: string
    emergency: string
  }
  selfCareChecklist: string[]
}

const WELCOME_MESSAGE = {
  role: "assistant" as const,
  content:
    "👋 Hey bestie! I'm your AI companion and I'm literally here for you 24/7! ✨ How are you vibing today? Spill the tea - I'm here to listen and support you through whatever! 💫🫶",
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [crisisAlert, setCrisisAlert] = useState<CrisisAlert | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)
    setCrisisAlert(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get response from AI")
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.text,
      }
      setMessages((prev) => [...prev, assistantMessage])

      if (data.crisisAlert) {
        setCrisisAlert(data.crisisAlert)
      }
    } catch (error) {
      console.error("Chat Error:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Oops bestie! Something went wrong on my end 😅 Can you try again? I promise I'm usually better at this! 💕",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-400 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-32 w-24 h-24 bg-green-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-orange-400 rounded-full animate-ping"></div>
      </div>

      <Card className="w-full max-w-4xl mx-auto h-[85vh] flex flex-col bg-gradient-to-br from-white/95 to-purple-100/95 backdrop-blur-sm border-4 border-white shadow-2xl rounded-3xl relative z-10">
        <CardHeader className="flex flex-row items-center gap-3 border-b-4 border-purple-200 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-2xl p-6">
          <div className="relative">
            <MessageSquare className="w-8 h-8 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
          </div>
          <div>
            <h2 className="text-2xl font-black drop-shadow-lg">💬 AI Chat Bestie</h2>
            <p className="text-purple-100 font-semibold">Your 24/7 mental health companion ✨</p>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-6">
          <ScrollArea ref={scrollRef} className="h-full pr-4">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="w-12 h-12 border-3 border-purple-300 shadow-lg">
                      <AvatarImage src="/bot-avatar.png" />
                      <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold text-lg">
                        🤖
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-3xl p-4 max-w-[80%] shadow-lg transform hover:scale-105 transition-all duration-300 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold border-3 border-white"
                        : "bg-gradient-to-r from-white to-purple-50 text-purple-800 font-medium border-3 border-purple-200"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <Avatar className="w-12 h-12 border-3 border-blue-300 shadow-lg">
                      <AvatarImage src="/user-avatar.png" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-bold text-lg">
                        😊
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-3 text-purple-600 font-semibold">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="animate-pulse">AI is thinking... 🤔✨</span>
                </div>
              )}
              {error && (
                <div className="text-red-500 font-semibold text-sm mt-2 p-3 bg-red-50 rounded-2xl border-2 border-red-200">
                  Oops! {error} 😅
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="border-t-4 border-purple-200 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-b-2xl">
          <form onSubmit={handleSubmit} className="flex w-full gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message bestie... 💕"
              className="flex-1 border-3 border-purple-300 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 bg-white font-medium text-lg py-3"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 border-3 border-white"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
            </Button>
          </form>
        </CardFooter>
      </Card>

      <Dialog open={!!crisisAlert} onOpenChange={() => setCrisisAlert(null)}>
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-red-50 to-pink-50 border-4 border-red-300 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-red-600 text-xl font-black">
              <AlertTriangle className="w-6 h-6 animate-pulse" />🚨 Important Notice
            </DialogTitle>
            <DialogDescription className="text-red-700 font-semibold text-lg">{crisisAlert?.message}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="p-4 bg-red-100 rounded-2xl border-2 border-red-300">
              <h4 className="font-black mb-3 text-red-800 text-lg">🆘 Emergency Resources:</h4>
              <ul className="space-y-2">
                {crisisAlert?.resources &&
                  Object.entries(crisisAlert.resources).map(([key, value]) => (
                    <li key={key} className="text-sm font-semibold text-red-700 bg-white p-2 rounded-lg">
                      {value}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="p-4 bg-pink-100 rounded-2xl border-2 border-pink-300">
              <h4 className="font-black mb-3 text-pink-800 text-lg">💕 Self-Care Checklist:</h4>
              <ul className="space-y-2">
                {crisisAlert?.selfCareChecklist.map((item, index) => (
                  <li key={index} className="text-sm font-semibold text-pink-700 bg-white p-2 rounded-lg">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Chatbot
