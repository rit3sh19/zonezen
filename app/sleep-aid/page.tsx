"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Moon, Play, Pause, Volume2, Clock, Sunrise } from "lucide-react"
import Link from "next/link"

const meditations = [
  {
    id: 1,
    title: "Deep Sleep Meditation",
    duration: "30 min",
    type: "youtube",
    url: "https://www.youtube.com/embed/1ZYbU82GVz4",
    description: "Guided meditation for deep, restful sleep",
  },
  {
    id: 2,
    title: "Body Scan for Sleep",
    duration: "20 min",
    type: "youtube",
    url: "https://www.youtube.com/embed/15q17_VLnV8",
    description: "Progressive muscle relaxation",
  },
  {
    id: 3,
    title: "Anxiety Relief Sleep",
    duration: "25 min",
    type: "youtube",
    url: "https://www.youtube.com/embed/aEqlQvczMJQ",
    description: "Calm anxious thoughts before bed",
  },
]

const soundscapes = [
  { id: 1, name: "Rain", file: "rain.mp3", icon: "🌧️" },
  { id: 2, name: "Ocean Waves", file: "ocean.mp3", icon: "🌊" },
  { id: 3, name: "Forest", file: "forest.mp3", icon: "🌲" },
  { id: 4, name: "White Noise", file: "whitenoise.mp3", icon: "📻" },
  { id: 5, name: "Thunderstorm", file: "thunder.mp3", icon: "⛈️" },
  { id: 6, name: "Fireplace", file: "fireplace.mp3", icon: "🔥" },
]

const affirmations = [
  "I am peaceful and ready for restful sleep",
  "My mind is calm and my body is relaxed",
  "I release all worries from today",
  "I am grateful for this moment of rest",
  "Tomorrow brings new opportunities",
  "I am safe and at peace",
]

export default function SleepAidPage() {
  const [sleepTimer, setSleepTimer] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [isTracking, setIsTracking] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [currentSound, setCurrentSound] = useState<any>(null)
  const [volume, setVolume] = useState([50])
  const [isPlaying, setIsPlaying] = useState(false)
  const [alarmTime, setAlarmTime] = useState("")
  const [selectedAffirmation, setSelectedAffirmation] = useState(affirmations[0])
  const [sleepHistory, setSleepHistory] = useState<any[]>([])

  const audioRef = useRef<HTMLAudioElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const history = localStorage.getItem("sleepHistory")
    if (history) {
      setSleepHistory(JSON.parse(history))
    }
  }, [])

  useEffect(() => {
    if (isTracking && startTime) {
      intervalRef.current = setInterval(() => {
        const now = new Date()
        const diff = now.getTime() - startTime.getTime()
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setSleepTimer({ hours, minutes, seconds })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isTracking, startTime])

  const startSleepTracking = () => {
    setStartTime(new Date())
    setIsTracking(true)
    setSleepTimer({ hours: 0, minutes: 0, seconds: 0 })
  }

  const stopSleepTracking = () => {
    if (startTime) {
      const endTime = new Date()
      const duration = endTime.getTime() - startTime.getTime()
      const hours = Math.floor(duration / (1000 * 60 * 60))
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))

      const sleepEntry = {
        id: Date.now(),
        date: startTime.toISOString(),
        duration: { hours, minutes },
        quality: 0,
        notes: "",
      }

      const updatedHistory = [sleepEntry, ...sleepHistory]
      setSleepHistory(updatedHistory)
      localStorage.setItem("sleepHistory", JSON.stringify(updatedHistory))
    }

    setIsTracking(false)
    setStartTime(null)
    setSleepTimer({ hours: 0, minutes: 0, seconds: 0 })
  }

  const playSound = (sound: any) => {
    if (currentSound?.id === sound.id && isPlaying) {
      setIsPlaying(false)
      if (audioRef.current) {
        audioRef.current.pause()
      }
    } else {
      setCurrentSound(sound)
      setIsPlaying(true)
    }
  }

  const setAlarm = () => {
    if (alarmTime) {
      const alarm = {
        id: Date.now(),
        time: alarmTime,
        affirmation: selectedAffirmation,
        active: true,
      }

      const alarms = JSON.parse(localStorage.getItem("alarms") || "[]")
      alarms.push(alarm)
      localStorage.setItem("alarms", JSON.stringify(alarms))

      setAlarmTime("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Animated stars */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-60 right-1/4 w-2 h-2 bg-yellow-200 rounded-full animate-ping"></div>
      </div>

      <header className="bg-black/30 backdrop-blur-sm border-b-4 border-purple-400 relative z-10 sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="mr-4 bg-white/20 hover:bg-white/30 text-white border-2 border-purple-400 rounded-full font-bold transform hover:scale-110 transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Moon className="h-10 w-10 text-purple-300 animate-pulse" />
              <div>
                <h1 className="text-4xl font-black text-white drop-shadow-lg">🌙 Sleep Aid</h1>
                <p className="text-purple-200 text-sm font-semibold">Your nighttime wellness companion ✨</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Tabs defaultValue="tracker" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-transparent p-0 mb-8">
            <TabsTrigger
              value="tracker"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-white hover:bg-white/20 transition-all duration-300 rounded-2xl font-bold text-lg py-4 mx-1 border-3 border-purple-400"
            >
              🕐 Sleep Tracker
            </TabsTrigger>
            <TabsTrigger
              value="meditation"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-white hover:bg-white/20 transition-all duration-300 rounded-2xl font-bold text-lg py-4 mx-1 border-3 border-green-400"
            >
              🧘‍♀️ Meditation
            </TabsTrigger>
            <TabsTrigger
              value="sounds"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-white hover:bg-white/20 transition-all duration-300 rounded-2xl font-bold text-lg py-4 mx-1 border-3 border-cyan-400"
            >
              🎵 Soundscapes
            </TabsTrigger>
            <TabsTrigger
              value="alarm"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-white hover:bg-white/20 transition-all duration-300 rounded-2xl font-bold text-lg py-4 mx-1 border-3 border-yellow-400"
            >
              ⏰ Smart Alarm
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tracker" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-4 border-purple-400 text-white shadow-2xl rounded-3xl">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-2xl">
                  <CardTitle className="flex items-center space-x-3 font-black text-xl">
                    <Clock className="h-6 w-6 animate-pulse" />
                    <span>🕐 Sleep Timer</span>
                  </CardTitle>
                  <CardDescription className="text-purple-100 font-semibold">
                    Track your sleep duration bestie!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 p-6">
                  <div className="text-center">
                    <div className="text-7xl font-mono font-black mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                      {String(sleepTimer.hours).padStart(2, "0")}:{String(sleepTimer.minutes).padStart(2, "0")}:
                      {String(sleepTimer.seconds).padStart(2, "0")}
                    </div>
                    <div className="text-purple-200 font-semibold text-lg">
                      {isTracking ? "💤 Sleep in progress..." : "😴 Ready to track sleep"}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    {!isTracking ? (
                      <Button
                        onClick={startSleepTracking}
                        className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-black py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        🚀 Start Sleep Tracking
                      </Button>
                    ) : (
                      <Button
                        onClick={stopSleepTracking}
                        className="flex-1 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-black py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        ⏹️ Stop & Save
                      </Button>
                    )}
                  </div>

                  {startTime && (
                    <div className="text-center text-sm text-purple-200 font-semibold bg-purple-500/20 p-3 rounded-2xl">
                      Started at: {startTime.toLocaleTimeString()} ✨
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-4 border-blue-400 text-white shadow-2xl rounded-3xl">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-t-2xl">
                  <CardTitle className="font-black text-xl">📊 Sleep History</CardTitle>
                  <CardDescription className="text-blue-100 font-semibold">
                    Your recent sleep patterns bestie!
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {sleepHistory.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-blue-200 font-bold text-lg mb-2">No sleep data yet bestie! 😴</p>
                        <p className="text-blue-300 font-semibold">Start tracking tonight! ✨</p>
                      </div>
                    ) : (
                      sleepHistory.slice(0, 5).map((entry) => (
                        <div
                          key={entry.id}
                          className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border-2 border-blue-300 transform hover:scale-105 transition-all duration-300"
                        >
                          <div>
                            <div className="font-black text-blue-200">{new Date(entry.date).toLocaleDateString()}</div>
                            <div className="text-sm text-blue-300 font-semibold">
                              {entry.duration.hours}h {entry.duration.minutes}m
                            </div>
                          </div>
                          <Badge className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-bold px-3 py-1 rounded-full">
                            💤 Sleep
                          </Badge>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="meditation" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {meditations.map((meditation) => (
                <Card
                  key={meditation.id}
                  className="bg-white/10 backdrop-blur-sm border-4 border-purple-400 text-white shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300"
                >
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-2xl">
                    <CardTitle className="text-lg font-black">{meditation.title}</CardTitle>
                    <CardDescription className="text-purple-100 font-semibold">
                      {meditation.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div className="aspect-video bg-black/30 rounded-2xl flex items-center justify-center border-2 border-purple-300">
                      <iframe
                        src={meditation.url}
                        title={meditation.title}
                        className="w-full h-full rounded-2xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold px-3 py-1 rounded-full">
                        ⏱️ {meditation.duration}
                      </Badge>
                      <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold px-4 py-2 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                        <Play className="h-4 w-4 mr-2" />
                        ▶️ Play
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sounds" className="mt-8">
            <Card className="bg-white/10 backdrop-blur-sm border-4 border-cyan-400 text-white shadow-2xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-t-2xl">
                <CardTitle className="flex items-center space-x-3 font-black text-xl">
                  <Volume2 className="h-6 w-6 animate-pulse" />
                  <span>🎵 Relaxation Soundscapes</span>
                </CardTitle>
                <CardDescription className="text-cyan-100 font-semibold">
                  Choose calming sounds to help you sleep bestie!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {soundscapes.map((sound) => (
                    <button
                      key={sound.id}
                      onClick={() => playSound(sound)}
                      className={`p-6 rounded-3xl border-4 transition-all transform hover:scale-110 ${
                        currentSound?.id === sound.id && isPlaying
                          ? "border-cyan-400 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 shadow-2xl scale-110"
                          : "border-white/30 hover:border-white/50 bg-white/10 shadow-lg"
                      }`}
                    >
                      <div className="text-4xl mb-3">{sound.icon}</div>
                      <div className="text-sm font-black">{sound.name}</div>
                      {currentSound?.id === sound.id && isPlaying && (
                        <div className="mt-3">
                          <Pause className="h-5 w-5 mx-auto text-cyan-300 animate-pulse" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {currentSound && (
                  <div className="space-y-6 p-6 bg-white/10 rounded-3xl border-2 border-cyan-300">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-lg">🎵 Now Playing: {currentSound.name}</span>
                      <Button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold px-4 py-2 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-bold">🔊 Volume: {volume[0]}%</Label>
                      <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-full" />
                    </div>
                  </div>
                )}

                <audio ref={audioRef} loop>
                  {currentSound && <source src={`/sounds/${currentSound.file}`} type="audio/mpeg" />}
                </audio>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alarm" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-4 border-yellow-400 text-white shadow-2xl rounded-3xl">
                <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-t-2xl">
                  <CardTitle className="flex items-center space-x-3 font-black text-xl">
                    <Sunrise className="h-6 w-6 animate-pulse" />
                    <span>⏰ Smart Alarm</span>
                  </CardTitle>
                  <CardDescription className="text-yellow-100 font-semibold">
                    Wake up with positive affirmations bestie!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 p-6">
                  <div className="space-y-3">
                    <Label htmlFor="alarm-time" className="font-bold text-lg">
                      🕐 Alarm Time
                    </Label>
                    <Input
                      id="alarm-time"
                      type="time"
                      value={alarmTime}
                      onChange={(e) => setAlarmTime(e.target.value)}
                      className="bg-white/20 border-3 border-yellow-300 text-white rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 font-bold text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="font-bold text-lg">💕 Morning Affirmation</Label>
                    <div className="space-y-3">
                      {affirmations.map((affirmation, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedAffirmation(affirmation)}
                          className={`w-full p-4 text-left rounded-2xl border-3 transition-all transform hover:scale-105 ${
                            selectedAffirmation === affirmation
                              ? "border-yellow-400 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 shadow-2xl"
                              : "border-white/30 hover:border-white/50 bg-white/10"
                          }`}
                        >
                          <div className="text-sm font-semibold">{affirmation}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={setAlarm}
                    disabled={!alarmTime}
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-black text-xl py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white"
                  >
                    ⏰ Set Alarm ✨
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-4 border-green-400 text-white shadow-2xl rounded-3xl">
                <CardHeader className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-t-2xl">
                  <CardTitle className="font-black text-xl">📋 Active Alarms</CardTitle>
                  <CardDescription className="text-green-100 font-semibold">
                    Your scheduled wake-up times bestie!
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {JSON.parse(localStorage.getItem("alarms") || "[]").length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-green-200 font-bold text-lg mb-2">No alarms set bestie! ⏰</p>
                        <p className="text-green-300 font-semibold">Set your first alarm above! ✨</p>
                      </div>
                    ) : (
                      JSON.parse(localStorage.getItem("alarms") || "[]").map((alarm: any) => (
                        <div
                          key={alarm.id}
                          className="p-4 bg-white/10 rounded-2xl border-2 border-green-300 transform hover:scale-105 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-mono text-2xl font-black text-green-200">{alarm.time}</div>
                            <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold px-3 py-1 rounded-full">
                              ✅ Active
                            </Badge>
                          </div>
                          <div className="text-sm font-semibold text-green-300 bg-green-500/20 p-3 rounded-lg">
                            💕 {alarm.affirmation}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
