"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"

const moods = [
  { emoji: "😄", label: "Excellent", value: 5, color: "bg-gradient-to-r from-green-400 to-emerald-500" },
  { emoji: "😊", label: "Good", value: 4, color: "bg-gradient-to-r from-green-300 to-green-400" },
  { emoji: "😐", label: "Okay", value: 3, color: "bg-gradient-to-r from-yellow-400 to-orange-400" },
  { emoji: "😔", label: "Poor", value: 2, color: "bg-gradient-to-r from-orange-400 to-red-400" },
  { emoji: "😢", label: "Terrible", value: 1, color: "bg-gradient-to-r from-red-400 to-pink-500" },
]

export default function MoodTrackerPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [notes, setNotes] = useState("")
  const [moodHistory, setMoodHistory] = useState<any[]>([])

  useEffect(() => {
    const history = localStorage.getItem("moodHistory")
    if (history) {
      setMoodHistory(JSON.parse(history))
    }
  }, [])

  const handleSaveMood = () => {
    if (selectedMood === null) return

    const newEntry = {
      id: Date.now(),
      mood: selectedMood,
      notes,
      date: new Date().toISOString(),
      timestamp: new Date().toLocaleString(),
    }

    const updatedHistory = [newEntry, ...moodHistory]
    setMoodHistory(updatedHistory)
    localStorage.setItem("moodHistory", JSON.stringify(updatedHistory))

    setSelectedMood(null)
    setNotes("")
  }

  const getMoodData = (value: number) => {
    return moods.find((mood) => mood.value === value)
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
              <Calendar className="h-10 w-10 text-white animate-pulse" />
              <div>
                <h1 className="text-4xl font-black text-white drop-shadow-lg">📊 Mood Tracker</h1>
                <p className="text-yellow-200 text-sm font-semibold">Track your daily vibes bestie! ✨</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-white/95 to-yellow-100/95 backdrop-blur-sm border-4 border-yellow-400 shadow-2xl rounded-3xl">
            <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-t-2xl">
              <CardTitle className="font-black text-xl">😊 How are you feeling today bestie?</CardTitle>
              <CardDescription className="text-yellow-100 font-semibold">
                Select your current mood and add any notes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              <div>
                <Label className="text-lg font-black mb-6 block text-yellow-800 flex items-center gap-2">
                  🎭 Choose your mood vibe
                </Label>
                <div className="grid grid-cols-5 gap-6">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`p-8 rounded-3xl border-4 transition-all transform hover:scale-110 flex flex-col items-center justify-center min-h-[120px] ${
                        selectedMood === mood.value
                          ? "border-purple-500 bg-gradient-to-br from-purple-100 to-pink-100 shadow-2xl scale-110"
                          : "border-white hover:border-yellow-300 bg-white/80 shadow-lg"
                      }`}
                    >
                      <div className="text-5xl mb-3 flex items-center justify-center">{mood.emoji}</div>
                      <div className="text-xs font-black text-gray-700 text-center">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-lg font-black text-yellow-800 flex items-center gap-2">
                  📝 Notes (optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="What's on your mind bestie? Any specific thoughts or events affecting your mood? Spill the tea! ☕"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-3 border-3 border-yellow-300 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 bg-white font-medium"
                  rows={4}
                />
              </div>

              <Button
                onClick={handleSaveMood}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-black text-xl py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white"
                disabled={selectedMood === null}
              >
                💾 Save Mood Entry ✨
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/95 to-purple-100/95 backdrop-blur-sm border-4 border-purple-400 shadow-2xl rounded-3xl">
            <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-t-2xl">
              <CardTitle className="font-black text-xl">📈 Recent Mood History</CardTitle>
              <CardDescription className="text-purple-100 font-semibold">
                Your mood entries from the past week bestie!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {moodHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-purple-600 font-bold text-lg mb-2">No mood entries yet bestie! 📊</p>
                    <p className="text-purple-500 font-semibold">Start tracking your mood today! ✨</p>
                  </div>
                ) : (
                  moodHistory.slice(0, 10).map((entry) => {
                    const moodData = getMoodData(entry.mood)
                    return (
                      <div
                        key={entry.id}
                        className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 transform hover:scale-105 transition-all duration-300"
                      >
                        <div className="text-3xl">{moodData?.emoji}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge className={moodData?.color + " text-white font-bold px-3 py-1 rounded-full"}>
                              {moodData?.label}
                            </Badge>
                            <span className="text-sm font-semibold text-purple-600">{entry.timestamp}</span>
                          </div>
                          {entry.notes && (
                            <p className="text-sm text-purple-700 font-medium bg-white p-2 rounded-lg">{entry.notes}</p>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
