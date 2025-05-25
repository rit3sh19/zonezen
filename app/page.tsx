"use client"

import { MessageSquare } from "lucide-react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Brain, BookOpen, Video, TrendingUp, Heart, Moon, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-400 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full animate-pulse"></div>
          <div className="absolute top-60 right-32 w-24 h-24 bg-green-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-orange-400 rounded-full animate-ping"></div>
        </div>

        <div className="max-w-md w-full space-y-8 relative z-10">
          <div className="text-center">
            <div className="relative inline-block">
              <Heart className="mx-auto h-20 w-20 text-white animate-pulse drop-shadow-2xl" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <h2 className="mt-6 text-5xl font-black text-white drop-shadow-2xl">💕 ZenZone</h2>
            <p className="mt-4 text-xl font-bold text-white bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              Your mental health bestie! ✨
            </p>
          </div>
          <div className="space-y-4">
            <Link href="/auth">
              <Button className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-black text-xl py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white">
                🚀 Get Started Bestie!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Heart className="h-10 w-10 text-white animate-pulse" />
              <h1 className="text-4xl font-black text-white drop-shadow-lg">💕 ZenZone</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-white/90 text-purple-600 font-bold text-lg px-4 py-2 rounded-full">
                Hey {user.name}! 👋
              </Badge>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("user")
                  setUser(null)
                }}
                className="bg-white/20 hover:bg-white/30 text-white border-2 border-white rounded-full font-bold transform hover:scale-110 transition-all duration-300"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-black text-white drop-shadow-lg mb-4">✨ Your Mental Health Dashboard</h2>
          <p className="text-white font-semibold text-xl bg-white/20 backdrop-blur-sm rounded-2xl p-4 inline-block">
            Track your mood, practice CBT techniques, and monitor your progress bestie! 💪
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          <Link href="/mood-tracker">
            <Card className="bg-gradient-to-br from-white/95 to-blue-100/95 backdrop-blur-sm border-4 border-blue-400 shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col">
              <CardHeader className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-t-2xl flex-shrink-0">
                <CardTitle className="flex items-center space-x-3 font-black text-xl min-h-[2rem]">
                  <Calendar className="h-6 w-6 animate-pulse flex-shrink-0" />
                  <span>📊 Mood Tracker</span>
                </CardTitle>
                <CardDescription className="text-blue-100 font-semibold min-h-[3rem] flex items-center">
                  Log your daily mood with emojis and vibes!
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex space-x-3 mb-6 justify-center flex-shrink-0">
                  <span className="text-6xl animate-bounce">😊</span>
                  <span className="text-6xl animate-pulse">😐</span>
                  <span className="text-6xl animate-bounce">😢</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white font-black text-lg py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 mt-auto">
                  📈 Track Mood
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/cbt-tools">
            <Card className="bg-gradient-to-br from-white/95 to-purple-100/95 backdrop-blur-sm border-4 border-purple-400 shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-2xl flex-shrink-0">
                <CardTitle className="flex items-center space-x-3 font-black text-xl min-h-[2rem]">
                  <Brain className="h-6 w-6 animate-pulse flex-shrink-0" />
                  <span>🧠 CBT Tools</span>
                </CardTitle>
                <CardDescription className="text-purple-100 font-semibold min-h-[3rem] flex items-center">
                  Cognitive behavioral therapy exercises and thought logs
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3 mb-6 flex-shrink-0">
                  <div className="text-sm font-semibold text-purple-700 bg-purple-50 p-2 rounded-lg">
                    💭 Thought Records
                  </div>
                  <div className="text-sm font-semibold text-purple-700 bg-purple-50 p-2 rounded-lg">
                    🧩 Cognitive Exercises
                  </div>
                  <div className="text-sm font-semibold text-purple-700 bg-purple-50 p-2 rounded-lg">
                    🎯 Behavioral Patterns
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-lg py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 mt-auto">
                  🚀 Start CBT
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/journal">
            <Card className="bg-gradient-to-br from-white/95 to-green-100/95 backdrop-blur-sm border-4 border-green-400 shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col">
              <CardHeader className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-t-2xl flex-shrink-0">
                <CardTitle className="flex items-center space-x-3 font-black text-xl min-h-[2rem]">
                  <BookOpen className="h-6 w-6 animate-pulse flex-shrink-0" />
                  <span>📖 AI Journal</span>
                </CardTitle>
                <CardDescription className="text-green-100 font-semibold min-h-[3rem] flex items-center">
                  Write daily entries with AI sentiment analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <div className="mb-6 flex-shrink-0">
                  <div className="text-sm font-semibold text-green-700 mb-3">Latest sentiment vibe:</div>
                  <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold px-4 py-2 rounded-full text-lg">
                    💚 Positive
                  </Badge>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-black text-lg py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 mt-auto">
                  ✍️ Write Entry
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard">
            <Card className="bg-gradient-to-br from-white/95 to-orange-100/95 backdrop-blur-sm border-4 border-orange-400 shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col">
              <CardHeader className="bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-t-2xl flex-shrink-0">
                <CardTitle className="flex items-center space-x-3 font-black text-xl min-h-[2rem]">
                  <TrendingUp className="h-6 w-6 animate-pulse flex-shrink-0" />
                  <span>📊 Analytics</span>
                </CardTitle>
                <CardDescription className="text-orange-100 font-semibold min-h-[3rem] flex items-center">
                  Visualize your mood patterns and progress
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <div className="mb-6 flex-shrink-0">
                  <div className="text-4xl font-black text-green-600 mb-2 flex items-center gap-2">📈 Improving</div>
                  <div className="text-sm font-semibold text-orange-700">7-day trend looking fire! 🔥</div>
                </div>
                <Button className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-black text-lg py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 mt-auto">
                  📈 View Analytics
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/telehealth">
            <Card className="bg-gradient-to-br from-white/95 to-red-100/95 backdrop-blur-sm border-4 border-red-400 shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col">
              <CardHeader className="bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-t-2xl flex-shrink-0">
                <CardTitle className="flex items-center space-x-3 font-black text-xl min-h-[2rem]">
                  <Video className="h-6 w-6 animate-pulse flex-shrink-0" />
                  <span>📹 Telehealth</span>
                </CardTitle>
                <CardDescription className="text-red-100 font-semibold min-h-[3rem] flex items-center">
                  Schedule appointments with mental health professionals
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <div className="mb-6 flex-shrink-0">
                  <div className="text-sm font-semibold text-red-700 mb-2">Next appointment:</div>
                  <div className="font-black text-red-800 bg-red-50 p-3 rounded-lg">
                    No appointments scheduled bestie! 📅
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-black text-lg py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 mt-auto">
                  📞 Book Session
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/sleep-aid">
            <Card className="bg-gradient-to-br from-white/95 to-indigo-100/95 backdrop-blur-sm border-4 border-indigo-400 shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-2xl flex-shrink-0">
                <CardTitle className="flex items-center space-x-3 font-black text-xl min-h-[2rem]">
                  <Moon className="h-6 w-6 animate-pulse flex-shrink-0" />
                  <span>🌙 Sleep Aid</span>
                </CardTitle>
                <CardDescription className="text-indigo-100 font-semibold min-h-[3rem] flex items-center">
                  Sleep tracking, meditations, and relaxation sounds
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3 mb-6 flex-shrink-0">
                  <div className="text-sm font-semibold text-indigo-700 bg-indigo-50 p-2 rounded-lg">
                    ⏰ Sleep Timer
                  </div>
                  <div className="text-sm font-semibold text-indigo-700 bg-indigo-50 p-2 rounded-lg">
                    🧘‍♀️ Guided Meditations
                  </div>
                  <div className="text-sm font-semibold text-indigo-700 bg-indigo-50 p-2 rounded-lg">
                    🎵 Relaxation Sounds
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black text-lg py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 mt-auto">
                  😴 Sleep Better
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/community">
            <Card className="bg-gradient-to-br from-white/95 to-purple-100/95 backdrop-blur-sm border-4 border-purple-400 shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-2xl flex-shrink-0">
                <CardTitle className="flex items-center space-x-3 font-black text-xl min-h-[2rem]">
                  <Users className="h-6 w-6 animate-pulse flex-shrink-0" />
                  <span>👥 Community</span>
                </CardTitle>
                <CardDescription className="text-purple-100 font-semibold min-h-[3rem] flex items-center">
                  Connect with peers in anonymous support groups
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <div className="mb-6 flex-shrink-0">
                  <div className="text-sm font-semibold text-purple-700 mb-3">Active discussions:</div>
                  <Badge className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold px-4 py-2 rounded-full text-lg">
                    💬 42 topics
                  </Badge>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-lg py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 mt-auto">
                  🤝 Join Community
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/chat">
            <Card className="bg-gradient-to-br from-white/95 to-cyan-100/95 backdrop-blur-sm border-4 border-cyan-400 shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col">
              <CardHeader className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-t-2xl flex-shrink-0">
                <CardTitle className="flex items-center space-x-3 font-black text-xl min-h-[2rem]">
                  <MessageSquare className="h-6 w-6 animate-pulse flex-shrink-0" />
                  <span>🤖 AI Chat</span>
                </CardTitle>
                <CardDescription className="text-cyan-100 font-semibold min-h-[3rem] flex items-center">
                  Chat with your AI mental health companion
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <div className="mb-6 flex-shrink-0">
                  <div className="text-sm font-semibold text-cyan-700 mb-3">AI Status:</div>
                  <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold px-4 py-2 rounded-full text-lg">
                    🟢 Online & Ready
                  </Badge>
                </div>
                <Button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-black text-lg py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 mt-auto">
                  💬 Start Chat
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Card className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white shadow-2xl rounded-3xl border-4 border-white transform hover:scale-105 transition-all duration-300 h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="font-black text-xl min-h-[2rem]">💡 Daily Tip</CardTitle>
              <CardDescription className="text-yellow-100 font-semibold min-h-[3rem] flex items-center">
                Mental health insight for today bestie!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col justify-between">
              <p className="text-sm font-semibold mb-6 bg-white/20 backdrop-blur-sm p-4 rounded-2xl flex-shrink-0">
                "Take 5 minutes today to practice deep breathing bestie! It can help reduce stress and improve focus.
                You've got this! 💪✨"
              </p>
              <Button className="w-full bg-white/20 hover:bg-white/30 text-white font-black text-lg py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-white mt-auto">
                🔍 Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
