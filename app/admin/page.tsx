"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Shield, AlertTriangle, TrendingUp, BookOpen, Users, Eye } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [moodData, setMoodData] = useState<any[]>([])
  const [journalData, setJournalData] = useState<any[]>([])
  const [crisisIncidents, setCrisisIncidents] = useState<any[]>([])
  const [communityPosts, setCommunityPosts] = useState<any[]>([])
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [password, setPassword] = useState("")

  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth === "authenticated") {
      setIsAuthorized(true)
      loadAdminData()
    }
  }, [])

  const handleAdminLogin = () => {
    // Simple password check (in production, use proper authentication)
    if (password === "admin123") {
      setIsAuthorized(true)
      localStorage.setItem("adminAuth", "authenticated")
      loadAdminData()
    } else {
      alert("Invalid password bestie! Try again! 🔐")
    }
  }

  const loadAdminData = () => {
    // Load anonymized data from localStorage
    const moods = JSON.parse(localStorage.getItem("moodHistory") || "[]")
    const journals = JSON.parse(localStorage.getItem("journalEntries") || "[]")
    const incidents = JSON.parse(localStorage.getItem("crisisIncidents") || "[]")
    const posts = JSON.parse(localStorage.getItem("communityPosts") || "[]")

    // Anonymize data
    const anonymizedMoods = moods.map((entry: any, index: number) => ({
      ...entry,
      userId: `user_${(index % 10) + 1}`, // Simulate multiple users
      id: entry.id,
    }))

    const anonymizedJournals = journals.map((entry: any, index: number) => ({
      ...entry,
      userId: `user_${(index % 10) + 1}`,
      content: entry.content.length > 100 ? entry.content.substring(0, 100) + "..." : entry.content,
    }))

    setMoodData(anonymizedMoods)
    setJournalData(anonymizedJournals)
    setCrisisIncidents(incidents)
    setCommunityPosts(posts)
  }

  const getMoodTrends = () => {
    if (moodData.length === 0) return { average: 0, trend: "stable" }

    const average = moodData.reduce((sum, entry) => sum + entry.mood, 0) / moodData.length

    // Calculate trend (simplified)
    const recent = moodData.slice(0, Math.floor(moodData.length / 2))
    const older = moodData.slice(Math.floor(moodData.length / 2))

    if (recent.length === 0 || older.length === 0) return { average: average.toFixed(1), trend: "stable" }

    const recentAvg = recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length
    const olderAvg = older.reduce((sum, entry) => sum + entry.mood, 0) / older.length

    let trend = "stable"
    if (recentAvg > olderAvg + 0.3) trend = "improving"
    else if (recentAvg < olderAvg - 0.3) trend = "declining"

    return { average: average.toFixed(1), trend }
  }

  const getSentimentDistribution = () => {
    const distribution: { [key: string]: number } = {}
    journalData.forEach((entry) => {
      distribution[entry.sentiment] = (distribution[entry.sentiment] || 0) + 1
    })
    return distribution
  }

  const getUnresolvedIncidents = () => {
    return crisisIncidents.filter((incident) => !incident.resolved)
  }

  const markIncidentResolved = (incidentId: number) => {
    const updatedIncidents = crisisIncidents.map((incident) =>
      incident.id === incidentId ? { ...incident, resolved: true } : incident,
    )
    setCrisisIncidents(updatedIncidents)
    localStorage.setItem("crisisIncidents", JSON.stringify(updatedIncidents))
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-purple-600 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full animate-pulse"></div>
          <div className="absolute top-60 right-32 w-24 h-24 bg-green-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-orange-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-60 right-1/4 w-20 h-20 bg-blue-400 rounded-full animate-spin"></div>
        </div>

        <Card className="w-full max-w-md bg-gradient-to-br from-white/95 to-red-100/95 backdrop-blur-sm border-4 border-white shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300 relative z-10">
          <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-t-2xl">
            <CardTitle className="flex items-center space-x-3 font-black text-xl">
              <Shield className="h-6 w-6 animate-pulse" />
              <span>🔐 Admin Access</span>
            </CardTitle>
            <CardDescription className="text-red-100 font-semibold">
              Enter admin password to access the super secret dashboard bestie! ✨
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <Input
              type="password"
              placeholder="🔑 Admin password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-3 border-red-300 rounded-2xl focus:border-pink-500 focus:ring-4 focus:ring-pink-200 bg-white font-medium text-lg py-3"
              onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
            />
            <Button
              onClick={handleAdminLogin}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-black text-xl py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-3 border-white"
            >
              🚀 Login
            </Button>
            <p className="text-xs text-red-600 text-center font-semibold bg-red-50 p-3 rounded-2xl">
              💡 Demo password: admin123
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const moodTrends = getMoodTrends()
  const sentimentDist = getSentimentDistribution()
  const unresolvedIncidents = getUnresolvedIncidents()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-400 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-blue-400 rounded-full animate-spin"></div>
      </div>

      <header className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 shadow-2xl border-b-4 border-white relative z-10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/90 hover:bg-white text-purple-600 border-2 border-yellow-400 rounded-full font-bold transform hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <Shield className="h-10 w-10 text-white animate-pulse" />
                <h1 className="text-4xl font-black text-white drop-shadow-lg">🛡️ Admin Dashboard</h1>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem("adminAuth")
                setIsAuthorized(false)
              }}
              className="bg-white/20 hover:bg-white/30 text-white border-2 border-white rounded-full font-bold transform hover:scale-110 transition-all duration-300"
            >
              🚪 Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-white/95 to-blue-100/95 backdrop-blur-sm border-4 border-blue-400 shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-3 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-t-2xl">
              <CardTitle className="text-sm font-black flex items-center gap-2">
                <Users className="h-4 w-4 animate-pulse" />👥 Total Users
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-4xl font-black text-blue-700 mb-2">127</div>
              <p className="text-xs font-semibold text-blue-600 bg-blue-50 p-2 rounded-lg">+12 this week! 🚀</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/95 to-green-100/95 backdrop-blur-sm border-4 border-green-400 shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-t-2xl">
              <CardTitle className="text-sm font-black flex items-center gap-2">
                <TrendingUp className="h-4 w-4 animate-pulse" />😊 Average Mood
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-4xl font-black text-green-700 mb-2">{moodTrends.average}/5</div>
              <p className="text-xs font-semibold text-green-600 bg-green-50 p-2 rounded-lg capitalize">
                {moodTrends.trend === "improving"
                  ? "📈 Improving!"
                  : moodTrends.trend === "declining"
                    ? "📉 Declining"
                    : "➡️ Stable"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/95 to-red-100/95 backdrop-blur-sm border-4 border-red-400 shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-3 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-t-2xl">
              <CardTitle className="text-sm font-black flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 animate-pulse" />🚨 Crisis Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-4xl font-black text-red-700 mb-2">{unresolvedIncidents.length}</div>
              <p className="text-xs font-semibold text-red-600 bg-red-50 p-2 rounded-lg">
                {unresolvedIncidents.length === 0 ? "✅ All resolved!" : "⚠️ Needs attention"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/95 to-purple-100/95 backdrop-blur-sm border-4 border-purple-400 shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-t-2xl">
              <CardTitle className="text-sm font-black flex items-center gap-2">
                <Eye className="h-4 w-4 animate-pulse" />💬 Community Posts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-4xl font-black text-purple-700 mb-2">{communityPosts.length}</div>
              <p className="text-xs font-semibold text-purple-600 bg-purple-50 p-2 rounded-lg">Total discussions ✨</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-transparent p-0 mb-8">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-white hover:bg-white/20 transition-all duration-300 rounded-2xl font-bold text-lg py-4 mx-1 border-3 border-blue-400"
            >
              📊 Overview
            </TabsTrigger>
            <TabsTrigger
              value="mood-trends"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-white hover:bg-white/20 transition-all duration-300 rounded-2xl font-bold text-lg py-4 mx-1 border-3 border-green-400"
            >
              📈 Mood Trends
            </TabsTrigger>
            <TabsTrigger
              value="crisis-alerts"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-white hover:bg-white/20 transition-all duration-300 rounded-2xl font-bold text-lg py-4 mx-1 border-3 border-red-400"
            >
              🚨 Crisis Alerts
            </TabsTrigger>
            <TabsTrigger
              value="flagged-content"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-white hover:bg-white/20 transition-all duration-300 rounded-2xl font-bold text-lg py-4 mx-1 border-3 border-purple-400"
            >
              🚩 Flagged Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-white/95 to-blue-100/95 backdrop-blur-sm border-4 border-blue-400 shadow-2xl rounded-3xl">
                <CardHeader className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-t-2xl">
                  <CardTitle className="flex items-center space-x-3 font-black text-xl">
                    <TrendingUp className="h-6 w-6 animate-pulse" />
                    <span>📊 Mood Distribution</span>
                  </CardTitle>
                  <CardDescription className="text-blue-100 font-semibold">
                    User mood patterns across the platform bestie! ✨
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((mood) => {
                      const count = moodData.filter((entry) => entry.mood === mood).length
                      const percentage = moodData.length > 0 ? ((count / moodData.length) * 100).toFixed(1) : 0
                      const labels = ["😢 Terrible", "😔 Poor", "😐 Okay", "😊 Good", "😄 Excellent"]
                      const colors = [
                        "bg-gradient-to-r from-red-400 to-red-500",
                        "bg-gradient-to-r from-orange-400 to-orange-500",
                        "bg-gradient-to-r from-yellow-400 to-yellow-500",
                        "bg-gradient-to-r from-green-400 to-green-500",
                        "bg-gradient-to-r from-emerald-400 to-emerald-500",
                      ]

                      return (
                        <div
                          key={mood}
                          className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 transform hover:scale-105 transition-all duration-300"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full ${colors[mood - 1]}`}></div>
                            <span className="font-bold text-blue-800">{labels[mood - 1]}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-bold text-blue-700">{count}</span>
                            <Badge className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-bold px-3 py-1 rounded-full">
                              {percentage}%
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white/95 to-green-100/95 backdrop-blur-sm border-4 border-green-400 shadow-2xl rounded-3xl">
                <CardHeader className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-t-2xl">
                  <CardTitle className="flex items-center space-x-3 font-black text-xl">
                    <BookOpen className="h-6 w-6 animate-pulse" />
                    <span>📝 Journal Sentiment</span>
                  </CardTitle>
                  <CardDescription className="text-green-100 font-semibold">
                    Emotional patterns from journal analysis bestie! 💕
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {Object.entries(sentimentDist).map(([sentiment, count]) => {
                      const total = Object.values(sentimentDist).reduce((a: any, b: any) => a + b, 0)
                      const percentage = total > 0 ? (((count as number) / total) * 100).toFixed(1) : 0
                      const colors: { [key: string]: string } = {
                        positive: "bg-gradient-to-r from-green-400 to-green-500",
                        negative: "bg-gradient-to-r from-red-400 to-red-500",
                        anxious: "bg-gradient-to-r from-orange-400 to-orange-500",
                        neutral: "bg-gradient-to-r from-gray-400 to-gray-500",
                        hopeful: "bg-gradient-to-r from-blue-400 to-blue-500",
                      }

                      const emojis: { [key: string]: string } = {
                        positive: "💚",
                        negative: "💔",
                        anxious: "😰",
                        neutral: "😐",
                        hopeful: "🌟",
                      }

                      return (
                        <div
                          key={sentiment}
                          className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 transform hover:scale-105 transition-all duration-300"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-4 h-4 rounded-full ${colors[sentiment] || "bg-gradient-to-r from-gray-400 to-gray-500"}`}
                            ></div>
                            <span className="font-bold text-green-800 capitalize">
                              {emojis[sentiment] || "🤔"} {sentiment}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-bold text-green-700">{count}</span>
                            <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold px-3 py-1 rounded-full">
                              {percentage}%
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mood-trends" className="mt-8">
            <Card className="bg-gradient-to-br from-white/95 to-green-100/95 backdrop-blur-sm border-4 border-green-400 shadow-2xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-t-2xl">
                <CardTitle className="font-black text-xl">📈 Anonymized Mood Data</CardTitle>
                <CardDescription className="text-green-100 font-semibold">
                  Recent mood entries across all users bestie! ✨
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {moodData.slice(0, 20).map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 transform hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold px-3 py-1 rounded-full">
                          👤 {entry.userId}
                        </Badge>
                        <span className="text-3xl">{["😢", "😔", "😐", "😊", "😄"][entry.mood - 1]}</span>
                        <span className="font-black text-green-800">
                          {["Terrible", "Poor", "Okay", "Good", "Excellent"][entry.mood - 1]}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-green-600 bg-white p-2 rounded-lg">
                        📅 {new Date(entry.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                  {moodData.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-green-600 font-bold text-lg mb-2">No mood data yet bestie! 📊</p>
                      <p className="text-green-500 font-semibold">Users will start tracking soon! ✨</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crisis-alerts" className="mt-8">
            <Card className="bg-gradient-to-br from-white/95 to-red-100/95 backdrop-blur-sm border-4 border-red-400 shadow-2xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-t-2xl">
                <CardTitle className="flex items-center space-x-3 font-black text-xl">
                  <AlertTriangle className="h-6 w-6 animate-pulse" />
                  <span>🚨 Crisis Incidents</span>
                </CardTitle>
                <CardDescription className="text-red-100 font-semibold">
                  Flagged content requiring immediate attention bestie! 💕
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {crisisIncidents.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-red-600 font-bold text-lg mb-2">No crisis incidents reported bestie! 🎉</p>
                      <p className="text-red-500 font-semibold">Everyone is staying safe! ✨</p>
                    </div>
                  ) : (
                    crisisIncidents.map((incident) => (
                      <div
                        key={incident.id}
                        className={`p-6 rounded-3xl border-4 transform hover:scale-105 transition-all duration-300 ${
                          incident.resolved
                            ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-400"
                            : "bg-gradient-to-br from-red-50 to-pink-50 border-red-400"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Badge
                              className={`font-bold px-4 py-2 rounded-full ${
                                incident.resolved
                                  ? "bg-gradient-to-r from-green-400 to-emerald-400 text-white"
                                  : "bg-gradient-to-r from-red-400 to-pink-400 text-white"
                              }`}
                            >
                              {incident.resolved ? "✅ Resolved" : "🚨 Urgent"}
                            </Badge>
                            <span className="text-sm font-semibold text-gray-600 bg-white p-2 rounded-lg">
                              📅 {new Date(incident.timestamp).toLocaleString()}
                            </span>
                          </div>
                          {!incident.resolved && (
                            <Button
                              size="sm"
                              onClick={() => markIncidentResolved(incident.id)}
                              className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold px-4 py-2 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                              ✅ Mark Resolved
                            </Button>
                          )}
                        </div>
                        <p className="text-sm font-medium text-gray-700 bg-white p-4 rounded-2xl border-2 border-gray-200">
                          {incident.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flagged-content" className="mt-8">
            <Card className="bg-gradient-to-br from-white/95 to-purple-100/95 backdrop-blur-sm border-4 border-purple-400 shadow-2xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-t-2xl">
                <CardTitle className="font-black text-xl">🚩 Flagged Community Posts</CardTitle>
                <CardDescription className="text-purple-100 font-semibold">
                  Posts that require moderation review bestie! 👀
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {communityPosts.filter((post) => post.flagged).length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-purple-600 font-bold text-lg mb-2">No flagged posts bestie! 🎉</p>
                      <p className="text-purple-500 font-semibold">Community is being respectful! ✨</p>
                    </div>
                  ) : (
                    communityPosts
                      .filter((post) => post.flagged)
                      .map((post) => (
                        <div
                          key={post.id}
                          className="p-6 bg-gradient-to-br from-red-50 to-pink-50 border-4 border-red-400 rounded-3xl transform hover:scale-105 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-black text-lg text-red-800 mb-2">{post.title}</h4>
                              <div className="flex items-center space-x-3">
                                <Badge className="bg-gradient-to-r from-red-400 to-pink-400 text-white font-bold px-3 py-1 rounded-full">
                                  🚩 Flagged
                                </Badge>
                                <span className="text-sm font-semibold text-red-600 bg-white p-2 rounded-lg">
                                  👤 by {post.author}
                                </span>
                                <span className="text-sm font-semibold text-red-600 bg-white p-2 rounded-lg">
                                  📅 {new Date(post.timestamp).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-red-700 bg-white p-4 rounded-2xl border-2 border-red-200">
                            {post.content}
                          </p>
                        </div>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
