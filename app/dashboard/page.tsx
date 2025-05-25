"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, Calendar, Brain, BookOpen } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [moodHistory, setMoodHistory] = useState<any[]>([])
  const [journalEntries, setJournalEntries] = useState<any[]>([])
  const [thoughtRecords, setThoughtRecords] = useState<any[]>([])

  useEffect(() => {
    const moods = localStorage.getItem("moodHistory")
    const journals = localStorage.getItem("journalEntries")
    const thoughts = localStorage.getItem("thoughtRecords")

    if (moods) setMoodHistory(JSON.parse(moods))
    if (journals) setJournalEntries(JSON.parse(journals))
    if (thoughts) setThoughtRecords(JSON.parse(thoughts))
  }, [])

  const getMoodAverage = () => {
    if (moodHistory.length === 0) return 0
    const sum = moodHistory.reduce((acc, entry) => acc + entry.mood, 0)
    return (sum / moodHistory.length).toFixed(1)
  }

  const getMoodTrend = () => {
    if (moodHistory.length < 2) return "stable"
    const recent = moodHistory.slice(0, Math.floor(moodHistory.length / 2))
    const older = moodHistory.slice(Math.floor(moodHistory.length / 2))

    if (recent.length === 0 || older.length === 0) return "stable"

    const recentAvg = recent.reduce((acc, entry) => acc + entry.mood, 0) / recent.length
    const olderAvg = older.reduce((acc, entry) => acc + entry.mood, 0) / older.length

    if (recentAvg > olderAvg + 0.5) return "improving"
    if (recentAvg < olderAvg - 0.5) return "declining"
    return "stable"
  }

  const getSentimentDistribution = () => {
    if (journalEntries.length === 0) return {}

    const distribution: { [key: string]: number } = {}
    journalEntries.forEach((entry) => {
      distribution[entry.sentiment] = (distribution[entry.sentiment] || 0) + 1
    })

    return distribution
  }

  const getStreakDays = () => {
    const today = new Date()
    let streak = 0

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(today.getDate() - i)
      const dateStr = checkDate.toDateString()

      const hasEntry =
        moodHistory.some((entry) => new Date(entry.date).toDateString() === dateStr) ||
        journalEntries.some((entry) => new Date(entry.date).toDateString() === dateStr)

      if (hasEntry) {
        streak++
      } else {
        break
      }
    }

    return streak
  }

  const trend = getMoodTrend()
  const sentimentDist = getSentimentDistribution()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-4 text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-orange-300" />
              <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-300">Average Mood</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getMoodAverage()}/5</div>
              <p className="text-xs text-blue-200 mt-1">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-blue-300">Mood Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="text-2xl">{trend === "improving" ? "📈" : trend === "declining" ? "📉" : "➡️"}</div>
                <div className="text-lg font-bold capitalize">{trend}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-orange-300">Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getStreakDays()}</div>
              <p className="text-xs text-blue-200 mt-1">Days active</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-purple-300">Total Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{moodHistory.length + journalEntries.length}</div>
              <p className="text-xs text-blue-200 mt-1">All time entries</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-300" />
                <span>Recent Mood History</span>
              </CardTitle>
              <CardDescription className="text-blue-100">Your mood entries over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {moodHistory.slice(0, 7).map((entry, index) => {
                  const moodEmojis = ["😢", "😔", "😐", "😊", "😄"]
                  const moodLabels = ["Terrible", "Poor", "Okay", "Good", "Excellent"]
                  return (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{moodEmojis[entry.mood - 1]}</span>
                        <div>
                          <div className="font-medium text-white">{moodLabels[entry.mood - 1]}</div>
                          <div className="text-sm text-blue-200">{new Date(entry.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <Badge className="bg-blue-600 text-white border-0">{entry.mood}/5</Badge>
                    </div>
                  )
                })}
                {moodHistory.length === 0 && (
                  <p className="text-blue-200 text-center py-6">No mood entries yet. Start tracking today!</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-green-300" />
                <span>Sentiment Analysis</span>
              </CardTitle>
              <CardDescription className="text-blue-100">Emotional patterns from your journal entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(sentimentDist).map(([sentiment, count]) => (
                  <div
                    key={sentiment}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          sentiment === "positive"
                            ? "bg-green-500"
                            : sentiment === "negative"
                              ? "bg-red-500"
                              : sentiment === "anxious"
                                ? "bg-orange-500"
                                : "bg-gray-500"
                        }`}
                      ></div>
                      <span className="capitalize text-white">{sentiment}</span>
                    </div>
                    <Badge className="bg-purple-600 text-white border-0">{count}</Badge>
                  </div>
                ))}
                {Object.keys(sentimentDist).length === 0 && (
                  <p className="text-blue-200 text-center py-6">No journal entries yet. Start writing!</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-300" />
                <span>CBT Progress</span>
              </CardTitle>
              <CardDescription className="text-blue-100">Your cognitive behavioral therapy activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white">Thought Records</span>
                  <Badge className="bg-purple-600 text-white border-0">{thoughtRecords.length}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white">Behavior Logs</span>
                  <Badge className="bg-purple-600 text-white border-0">
                    {JSON.parse(localStorage.getItem("behaviorLogs") || "[]").length}
                  </Badge>
                </div>
                <div className="text-sm text-blue-200 mt-4 p-3 bg-white/5 rounded-lg">
                  Keep practicing CBT techniques to build healthier thought patterns. You're doing great!
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle>Weekly Goals</CardTitle>
              <CardDescription className="text-blue-100">Track your mental health objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-sm text-white">Daily mood tracking</span>
                  <Badge
                    className={`border-0 ${moodHistory.length >= 7 ? "bg-green-600 text-white" : "bg-gray-600 text-white"}`}
                  >
                    {Math.min(moodHistory.length, 7)}/7
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-sm text-white">Journal entries</span>
                  <Badge
                    className={`border-0 ${journalEntries.length >= 3 ? "bg-green-600 text-white" : "bg-gray-600 text-white"}`}
                  >
                    {Math.min(journalEntries.length, 3)}/3
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-sm text-white">CBT exercises</span>
                  <Badge
                    className={`border-0 ${thoughtRecords.length >= 2 ? "bg-green-600 text-white" : "bg-gray-600 text-white"}`}
                  >
                    {Math.min(thoughtRecords.length, 2)}/2
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
