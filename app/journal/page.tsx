"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react"
import Link from "next/link"

export default function JournalPage() {
  const [entry, setEntry] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [journalEntries, setJournalEntries] = useState<any[]>([])

  useEffect(() => {
    const entries = localStorage.getItem("journalEntries")
    if (entries) {
      setJournalEntries(JSON.parse(entries))
    }
  }, [])

  const analyzeSentiment = async (text: string) => {
    const sentiments = ["positive", "negative", "neutral", "anxious", "hopeful", "sad", "excited"]
    const emotions = ["happy", "sad", "anxious", "calm", "frustrated", "grateful", "worried"]

    const lowerText = text.toLowerCase()
    let sentiment = "neutral"
    let emotion = "calm"
    let confidence = 0.7

    if (lowerText.includes("happy") || lowerText.includes("great") || lowerText.includes("wonderful")) {
      sentiment = "positive"
      emotion = "happy"
      confidence = 0.9
    } else if (lowerText.includes("sad") || lowerText.includes("terrible") || lowerText.includes("awful")) {
      sentiment = "negative"
      emotion = "sad"
      confidence = 0.85
    } else if (lowerText.includes("anxious") || lowerText.includes("worried") || lowerText.includes("stress")) {
      sentiment = "anxious"
      emotion = "anxious"
      confidence = 0.8
    }

    return { sentiment, emotion, confidence }
  }

  const handleSaveEntry = async () => {
    if (!entry.trim()) return

    setIsAnalyzing(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const analysis = await analyzeSentiment(entry)

    const newEntry = {
      id: Date.now(),
      content: entry,
      date: new Date().toISOString(),
      timestamp: new Date().toLocaleString(),
      sentiment: analysis.sentiment,
      emotion: analysis.emotion,
      confidence: analysis.confidence,
    }

    const updatedEntries = [newEntry, ...journalEntries]
    setJournalEntries(updatedEntries)
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries))

    setEntry("")
    setIsAnalyzing(false)
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-gradient-to-r from-green-400 to-emerald-400 text-white"
      case "negative":
        return "bg-gradient-to-r from-red-400 to-pink-400 text-white"
      case "anxious":
        return "bg-gradient-to-r from-orange-400 to-yellow-400 text-white"
      case "hopeful":
        return "bg-gradient-to-r from-blue-400 to-cyan-400 text-white"
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-400 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-400 rounded-full animate-ping"></div>
      </div>

      <header className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 shadow-2xl border-b-4 border-white relative z-10 sticky top-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="mr-4 bg-white/90 hover:bg-white text-purple-600 border-2 border-yellow-400 rounded-full font-bold transform hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <BookOpen className="h-10 w-10 text-white animate-pulse" />
              <div>
                <h1 className="text-4xl font-black text-white drop-shadow-lg">📖 AI Journal</h1>
                <p className="text-yellow-200 text-sm font-semibold">Express yourself with AI insights ✨</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-white/95 to-yellow-100/95 backdrop-blur-sm border-4 border-yellow-400 shadow-2xl rounded-3xl">
            <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-t-2xl">
              <CardTitle className="flex items-center space-x-3 font-black text-xl">
                <Sparkles className="h-6 w-6 animate-pulse" />
                <span>✍️ Write Your Entry</span>
              </CardTitle>
              <CardDescription className="text-yellow-100 font-semibold">
                Express your thoughts and feelings bestie! AI will analyze the vibes ✨
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <Textarea
                placeholder="How are you feeling today bestie? What's on your mind? Spill the tea! ☕💭"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                rows={12}
                className="resize-none border-3 border-yellow-300 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 bg-white font-medium text-lg"
              />

              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-yellow-700">{entry.length} characters ✨</div>
                <Button
                  onClick={handleSaveEntry}
                  disabled={!entry.trim() || isAnalyzing}
                  className="min-w-[140px] bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-black px-6 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Analyzing vibes... 🤖</span>
                    </div>
                  ) : (
                    "💾 Save Entry"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/95 to-purple-100/95 backdrop-blur-sm border-4 border-purple-400 shadow-2xl rounded-3xl">
            <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-t-2xl">
              <CardTitle className="font-black text-xl">📚 Recent Entries</CardTitle>
              <CardDescription className="text-purple-100 font-semibold">
                Your journal entries with AI sentiment analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {journalEntries.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-purple-600 font-bold text-lg mb-2">No journal entries yet bestie! 📝</p>
                    <p className="text-purple-500 font-semibold">Start writing to see your sentiment analysis! ✨</p>
                  </div>
                ) : (
                  journalEntries.map((journalEntry) => (
                    <div
                      key={journalEntry.id}
                      className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl space-y-3 border-2 border-purple-200 transform hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-purple-600">{journalEntry.timestamp}</span>
                        <div className="flex space-x-2">
                          <Badge
                            className={getSentimentColor(journalEntry.sentiment) + " font-bold px-3 py-1 rounded-full"}
                          >
                            {journalEntry.sentiment}
                          </Badge>
                          <Badge className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold px-3 py-1 rounded-full">
                            {journalEntry.emotion}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-purple-700 line-clamp-3 font-medium">{journalEntry.content}</p>
                      <div className="text-xs font-semibold text-purple-500">
                        AI Confidence: {Math.round(journalEntry.confidence * 100)}% 🤖✨
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {journalEntries.length > 0 && (
          <Card className="mt-8 bg-gradient-to-br from-white/95 to-cyan-100/95 backdrop-blur-sm border-4 border-cyan-400 shadow-2xl rounded-3xl">
            <CardHeader className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-t-2xl">
              <CardTitle className="font-black text-xl">🧠 Sentiment Insights</CardTitle>
              <CardDescription className="text-cyan-100 font-semibold">
                AI-powered analysis of your emotional patterns bestie!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-3 border-green-300 transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-black text-green-600 mb-2">
                    {journalEntries.filter((e) => e.sentiment === "positive").length}
                  </div>
                  <div className="text-sm font-bold text-green-700">💚 Positive Vibes</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border-3 border-orange-300 transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-black text-orange-600 mb-2">
                    {journalEntries.filter((e) => e.sentiment === "anxious").length}
                  </div>
                  <div className="text-sm font-bold text-orange-700">😰 Anxious Moments</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border-3 border-gray-300 transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-black text-gray-600 mb-2">
                    {journalEntries.filter((e) => e.sentiment === "neutral").length}
                  </div>
                  <div className="text-sm font-bold text-gray-700">😐 Neutral Vibes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
