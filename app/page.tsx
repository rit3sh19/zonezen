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
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="max-w-md w-full space-y-8 relative z-10">
          <div className="text-center">
            <div className="relative inline-block">
              <Heart className="mx-auto h-20 w-20 text-green-600 animate-pulse drop-shadow-2xl" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
            <h2 className="mt-6 text-5xl font-black text-green-800 drop-shadow-lg">💚 ZenZone</h2>
            <p className="mt-4 text-xl font-bold text-green-700 bg-white/80 backdrop-blur-sm rounded-2xl p-4">
              Your mental health companion! ✨
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Z</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">
                  zen<span className="text-green-600">zone</span>
                </h1>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-green-600 font-medium">Counselors</a>
              <a href="#" className="text-gray-600 hover:text-green-600 font-medium">Hospitals</a>
              <a href="#" className="text-gray-600 hover:text-green-600 font-medium">Success Story</a>
              <a href="#" className="text-gray-600 hover:text-green-600 font-medium">Blog</a>
              <a href="#" className="text-gray-600 hover:text-green-600 font-medium">About Us</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-700 font-medium px-3 py-1">
                Hey {user.name}! 👋
              </Badge>
              <Button
                variant="outline"
                className="bg-green-100 text-green-700 border-green-300 hover:bg-green-200 rounded-full px-6"
                onClick={() => {
                  localStorage.removeItem("user");
                  setUser(null);
                }}
              >
                Need Help ?
              </Button>
            </div>
          </div>
        </div>
      </header>



      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex space-x-2 mb-4">
                <Badge className="bg-green-100 text-green-700 rounded-full px-3 py-1">Psychologist</Badge>
                <Badge className="bg-blue-100 text-blue-700 rounded-full px-3 py-1">Psychiatrist</Badge>
                <Badge className="bg-purple-100 text-purple-700 rounded-full px-3 py-1">Psychoanalyst</Badge>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Mental Health <span className="text-gray-600">is not a</span><br />
                <span className="text-gray-600">Destination, but a</span><br />
                <span className="text-green-600">Process.</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Our work has resulted in positive change. We have educated millions about mental health conditions and reduced barriers to treatment and services.
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold">
                Schedule Appointment
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">95%</span>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="font-medium">We have Success</div>
                  <div>rate so far</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image & Stats */}
          <div className="relative">
            <div className="relative">
              <img 
                src="/lovable-uploads/be9d61a4-b28e-47d2-bcb2-57686e6ba067.png"
                alt="Mental Health Professional"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              
              {/* Floating Chat Bubble */}
              <div className="absolute bottom-4 left-4 bg-white rounded-2xl p-4 shadow-lg max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm font-medium">Dr</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Dr. Monet</div>
                    <div className="text-sm text-gray-600">Hello</div>
                  </div>
                </div>
                <Button size="sm" className="mt-2 bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs">
                  Chat now
                </Button>
              </div>

              {/* Stats Card */}
              <div className="absolute top-4 right-4 bg-white rounded-2xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-gray-900">10M+</div>
                <div className="text-sm text-gray-600">Every Year</div>
                <div className="text-sm text-gray-600">helping people</div>
                <div className="text-sm text-gray-600">around the world.</div>
                <div className="mt-2 w-12 h-8 bg-gray-200 rounded"></div>
                <div className="text-xs text-gray-500 mt-1">Campaign</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Card */}
          <div className="bg-green-400 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Let's make life Easier and Stressless</h3>
              <p className="text-green-100 mb-6">Being able to be your true self is one of the strongest components of good mental health.</p>
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -mb-16 -ml-16"></div>
          </div>

          {/* Right Card */}
          <div className="bg-teal-300 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Find Support</h3>
              <p className="text-teal-100 mb-6">If you or someone you know is struggling, you are not alone.</p>
              <div className="flex justify-end">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        

         <div className="grid pb-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/mood-tracker">
             <Card className="bg-white hover:shadow-lg transition-shadow rounded-2xl border border-gray-100">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="text-blue-600 w-5 h-5" />
                  </div>
                  Mood Tracker
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Record your daily feelings and track patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
                  Track Mood
                </Button>
              </CardContent>
            </Card>


          </Link>

          <Link href="/cbt-tools">
            <Card className="bg-white hover:shadow-lg transition-shadow rounded-2xl border border-gray-100">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Brain className="text-purple-600 w-5 h-5" />
                  </div>
                  CBT Tools
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Cognitive behavioral therapy exercises
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-xl">
                  Start CBT
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/journal">
             <Card className="bg-white hover:shadow-lg transition-shadow rounded-2xl border border-gray-100">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="text-green-600 w-5 h-5" />
                  </div>
                  AI Journal
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Intelligent journaling with mood insights
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl">
                  Write Entry
                </Button>
              </CardContent>
            </Card>

          </Link>

          <Link href="/dashboard">
            <Card className="bg-white hover:shadow-lg transition-shadow rounded-2xl border border-gray-100">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-pink-600 w-5 h-5" />
                  </div>
                  Analytics
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Track your mental health journey
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-xl">
                  View Stats
                </Button>
              </CardContent>
            </Card>

          </Link>

          <Link href="/telehealth">
            <Card className="bg-white hover:shadow-lg transition-shadow rounded-2xl border border-gray-100">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Video className="text-red-600 w-5 h-5" />
                  </div>
                  Telehealth
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Connect with licensed professionals
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl">
                  Book Session
                </Button>
              </CardContent>
            </Card>

          </Link>

          <Link href="/sleep-aid">
<Card className="bg-white hover:shadow-lg transition-shadow rounded-2xl border border-gray-100">  {/* Ambient blur glows */}
 

  <CardHeader className="p-6">
    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
        <Moon className="text-indigo-500 w-5 h-5 animate-pulse" />
      </div>
      Sleep Aid
    </CardTitle>
    <CardDescription className="mt-2 text-md text-gray-600 font-medium">
      Sleep tracking, calming meditations, and soothing sounds 🛌
    </CardDescription>
  </CardHeader>

  <CardContent className="px-6 pb-6 ">
    

    <Button className="mt-auto w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-md hover:brightness-110 transition-all duration-300">
      😴 Sleep Better
    </Button>
  </CardContent>
</Card>

          </Link>

          <Link href="/community">
            <Card className="bg-white hover:shadow-lg transition-shadow rounded-2xl border border-gray-100">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Users className="text-indigo-600 w-5 h-5" />
                  </div>
                  Community
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Connect with supportive peers
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl">
                  Join Community
                </Button>
              </CardContent>
            </Card>

          </Link>

          <Link href="/chat">
           <Card className="bg-white hover:shadow-lg transition-shadow rounded-2xl border border-gray-100">
  {/* Ambient glow effects */}
  <div className="absolute top-[-1rem] right-[-1rem] w-36 h-36 bg-cyan-300 opacity-20 rounded-full blur-2xl pointer-events-none"></div>
  <div className="absolute bottom-[-2rem] left-[-2rem] w-40 h-40 bg-blue-400 opacity-20 rounded-full blur-2xl pointer-events-none"></div>

  <CardHeader className="p-6 z-10">
    <CardTitle className="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
      <div className="bg-white/80 p-2 rounded-xl shadow-sm backdrop-blur-md">
        <MessageSquare className="text-cyan-600 w-5 h-5 animate-pulse" />
      </div>
      AI Chat
    </CardTitle>
    <CardDescription className="mt-2 text-md text-gray-600 font-medium">
      Chat with your AI mental health companion 🤖
    </CardDescription>
  </CardHeader>
  <CardContent className="px-6 pb-6 ">
        <Button className="mt-auto w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold py-3 rounded-xl shadow-md hover:brightness-110 transition-all duration-300">
      💬 Start Chat
    </Button>
  </CardContent>
</Card>

          </Link>

          
        </div>
      </main>
       <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Z</span>
                </div>
                <span className="text-xl font-bold text-gray-800">zenzone</span>
              </div>
              <p className="text-gray-600">Your trusted mental health companion</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-green-600">Mood Tracker</a>
                <a href="#" className="block text-gray-600 hover:text-green-600">CBT Tools</a>
                <a href="#" className="block text-gray-600 hover:text-green-600">Journal</a>
                <a href="#" className="block text-gray-600 hover:text-green-600">Community</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-green-600">Help Center</a>
                <a href="#" className="block text-gray-600 hover:text-green-600">Contact Us</a>
                <a href="#" className="block text-gray-600 hover:text-green-600">Privacy Policy</a>
                <a href="#" className="block text-gray-600 hover:text-green-600">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} ZenZone. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}




























        

        