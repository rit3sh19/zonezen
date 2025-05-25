"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Brain, FileText, Target } from "lucide-react"
import Link from "next/link"

export default function CBTToolsPage() {
  const [thoughtRecord, setThoughtRecord] = useState({
    situation: "",
    emotion: "",
    intensity: "",
    automaticThought: "",
    evidence: "",
    balancedThought: "",
  })

  const [behaviorLog, setBehaviorLog] = useState({
    trigger: "",
    behavior: "",
    consequence: "",
    alternative: "",
  })

  const cognitiveDistortions = [
    "All-or-Nothing Thinking",
    "Overgeneralization",
    "Mental Filter",
    "Disqualifying the Positive",
    "Jumping to Conclusions",
    "Magnification/Minimization",
    "Emotional Reasoning",
    "Should Statements",
    "Labeling",
    "Personalization",
  ]

  const handleSaveThoughtRecord = () => {
    const records = JSON.parse(localStorage.getItem("thoughtRecords") || "[]")
    const newRecord = {
      ...thoughtRecord,
      id: Date.now(),
      date: new Date().toISOString(),
    }
    records.push(newRecord)
    localStorage.setItem("thoughtRecords", JSON.stringify(records))

    setThoughtRecord({
      situation: "",
      emotion: "",
      intensity: "",
      automaticThought: "",
      evidence: "",
      balancedThought: "",
    })
  }

  const handleSaveBehaviorLog = () => {
    const logs = JSON.parse(localStorage.getItem("behaviorLogs") || "[]")
    const newLog = {
      ...behaviorLog,
      id: Date.now(),
      date: new Date().toISOString(),
    }
    logs.push(newLog)
    localStorage.setItem("behaviorLogs", JSON.stringify(logs))

    setBehaviorLog({
      trigger: "",
      behavior: "",
      consequence: "",
      alternative: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-400 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-red-400 rounded-full animate-spin"></div>
      </div>

      <header className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 shadow-2xl border-b-4 border-white relative z-10 sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Brain className="h-10 w-10 text-white animate-pulse drop-shadow-lg" />
              <div>
                <h1 className="text-4xl font-black text-white drop-shadow-lg transform hover:scale-105 transition-transform duration-300">
                  🧠 CBT Tools
                </h1>
                <p className="text-yellow-200 text-sm font-semibold">Your Mental Wellness Toolkit ✨</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Tabs defaultValue="thought-record" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 mb-8">
            <TabsTrigger
              value="thought-record"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-purple-700 hover:bg-purple-100 transition-all duration-300 rounded-2xl font-bold text-lg py-4 mx-1 border-3 border-purple-300"
            >
              📝 Thought Record
            </TabsTrigger>
            <TabsTrigger
              value="behavior-log"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-cyan-700 hover:bg-cyan-100 transition-all duration-300 rounded-2xl font-bold text-lg py-4 mx-1 border-3 border-cyan-300"
            >
              🎯 Behavior Log
            </TabsTrigger>
            <TabsTrigger
              value="exercises"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-green-700 hover:bg-green-100 transition-all duration-300 rounded-2xl font-bold text-lg py-4 mx-1 border-3 border-green-300"
            >
              ✨ Exercises
            </TabsTrigger>
          </TabsList>

          <TabsContent value="thought-record" className="mt-8">
            <Card className="bg-gradient-to-br from-white to-yellow-100 border-4 border-purple-400 shadow-2xl rounded-3xl transform hover:scale-[1.02] transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-2xl">
                <CardTitle className="flex items-center space-x-3 text-2xl font-black">
                  <FileText className="h-6 w-6 animate-bounce" />
                  <span className="drop-shadow-lg">💭 Thought Record</span>
                </CardTitle>
                <CardDescription className="text-purple-100 font-semibold text-lg">
                  Identify and challenge negative thought patterns ✨
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="situation" className="text-purple-700 font-bold text-lg flex items-center gap-2">
                      🌍 Situation
                    </Label>
                    <Textarea
                      id="situation"
                      placeholder="Describe the situation that triggered your emotion"
                      value={thoughtRecord.situation}
                      onChange={(e) => setThoughtRecord({ ...thoughtRecord, situation: e.target.value })}
                      className="border-3 border-pink-300 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 bg-gradient-to-br from-white to-pink-50 font-medium"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="emotion" className="text-purple-700 font-bold text-lg flex items-center gap-2">
                      💖 Emotion
                    </Label>
                    <Input
                      id="emotion"
                      placeholder="What emotion did you feel?"
                      value={thoughtRecord.emotion}
                      onChange={(e) => setThoughtRecord({ ...thoughtRecord, emotion: e.target.value })}
                      className="border-3 border-pink-300 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 bg-gradient-to-br from-white to-pink-50 font-medium"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="intensity" className="text-purple-700 font-bold text-lg flex items-center gap-2">
                      🔥 Intensity (1-10)
                    </Label>
                    <Input
                      id="intensity"
                      type="number"
                      min="1"
                      max="10"
                      placeholder="Rate the intensity"
                      value={thoughtRecord.intensity}
                      onChange={(e) => setThoughtRecord({ ...thoughtRecord, intensity: e.target.value })}
                      className="border-3 border-pink-300 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 bg-gradient-to-br from-white to-pink-50 font-medium"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="automaticThought"
                      className="text-purple-700 font-bold text-lg flex items-center gap-2"
                    >
                      💭 Automatic Thought
                    </Label>
                    <Textarea
                      id="automaticThought"
                      placeholder="What went through your mind?"
                      value={thoughtRecord.automaticThought}
                      onChange={(e) => setThoughtRecord({ ...thoughtRecord, automaticThought: e.target.value })}
                      className="border-3 border-pink-300 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 bg-gradient-to-br from-white to-pink-50 font-medium"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="evidence" className="text-purple-700 font-bold text-lg flex items-center gap-2">
                      🔍 Evidence Against
                    </Label>
                    <Textarea
                      id="evidence"
                      placeholder="What evidence contradicts this thought?"
                      value={thoughtRecord.evidence}
                      onChange={(e) => setThoughtRecord({ ...thoughtRecord, evidence: e.target.value })}
                      className="border-3 border-pink-300 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 bg-gradient-to-br from-white to-pink-50 font-medium"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="balancedThought"
                      className="text-purple-700 font-bold text-lg flex items-center gap-2"
                    >
                      ⚖️ Balanced Thought
                    </Label>
                    <Textarea
                      id="balancedThought"
                      placeholder="What's a more balanced way to think about this?"
                      value={thoughtRecord.balancedThought}
                      onChange={(e) => setThoughtRecord({ ...thoughtRecord, balancedThought: e.target.value })}
                      className="border-3 border-pink-300 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 bg-gradient-to-br from-white to-pink-50 font-medium"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSaveThoughtRecord}
                  className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-black text-xl py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white"
                >
                  🎉 Save Thought Record 🎉
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="behavior-log" className="mt-8">
            <Card className="bg-gradient-to-br from-white to-green-100 border-4 border-cyan-400 shadow-2xl rounded-3xl transform hover:scale-[1.02] transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-t-2xl">
                <CardTitle className="flex items-center space-x-3 text-2xl font-black">
                  <Target className="h-6 w-6 animate-spin" />
                  <span className="drop-shadow-lg">🎯 Behavior Log</span>
                </CardTitle>
                <CardDescription className="text-cyan-100 font-semibold text-lg">
                  Track behavioral patterns and identify alternatives 🚀
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="trigger" className="text-teal-700 font-bold text-lg flex items-center gap-2">
                      ⚡ Trigger
                    </Label>
                    <Textarea
                      id="trigger"
                      placeholder="What triggered this behavior?"
                      value={behaviorLog.trigger}
                      onChange={(e) => setBehaviorLog({ ...behaviorLog, trigger: e.target.value })}
                      className="border-3 border-cyan-300 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-200 bg-gradient-to-br from-white to-cyan-50 font-medium"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="behavior" className="text-teal-700 font-bold text-lg flex items-center gap-2">
                      🎭 Behavior
                    </Label>
                    <Textarea
                      id="behavior"
                      placeholder="Describe the behavior"
                      value={behaviorLog.behavior}
                      onChange={(e) => setBehaviorLog({ ...behaviorLog, behavior: e.target.value })}
                      className="border-3 border-cyan-300 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-200 bg-gradient-to-br from-white to-cyan-50 font-medium"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="consequence" className="text-teal-700 font-bold text-lg flex items-center gap-2">
                      📊 Consequence
                    </Label>
                    <Textarea
                      id="consequence"
                      placeholder="What was the result?"
                      value={behaviorLog.consequence}
                      onChange={(e) => setBehaviorLog({ ...behaviorLog, consequence: e.target.value })}
                      className="border-3 border-cyan-300 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-200 bg-gradient-to-br from-white to-cyan-50 font-medium"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="alternative" className="text-teal-700 font-bold text-lg flex items-center gap-2">
                      💡 Alternative Behavior
                    </Label>
                    <Textarea
                      id="alternative"
                      placeholder="What could you do differently next time?"
                      value={behaviorLog.alternative}
                      onChange={(e) => setBehaviorLog({ ...behaviorLog, alternative: e.target.value })}
                      className="border-3 border-cyan-300 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-200 bg-gradient-to-br from-white to-cyan-50 font-medium"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSaveBehaviorLog}
                  className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-black text-xl py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white"
                >
                  🚀 Save Behavior Log 🚀
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exercises" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-white to-purple-100 border-4 border-yellow-400 shadow-2xl rounded-3xl transform hover:scale-[1.02] transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-t-2xl">
                  <CardTitle className="text-2xl font-black drop-shadow-lg">🧠 Cognitive Distortions</CardTitle>
                  <CardDescription className="text-yellow-100 font-semibold text-lg">
                    Common thinking patterns to watch out for 👀
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {cognitiveDistortions.map((distortion, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-2xl font-bold text-white shadow-lg transform hover:scale-105 transition-all duration-300 ${
                          index % 5 === 0
                            ? "bg-gradient-to-r from-pink-400 to-red-400"
                            : index % 5 === 1
                              ? "bg-gradient-to-r from-purple-400 to-pink-400"
                              : index % 5 === 2
                                ? "bg-gradient-to-r from-blue-400 to-purple-400"
                                : index % 5 === 3
                                  ? "bg-gradient-to-r from-green-400 to-blue-400"
                                  : "bg-gradient-to-r from-yellow-400 to-green-400"
                        }`}
                      >
                        <div className="text-sm drop-shadow">{distortion}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-blue-100 border-4 border-green-400 shadow-2xl rounded-3xl transform hover:scale-[1.02] transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-t-2xl">
                  <CardTitle className="text-2xl font-black drop-shadow-lg">🌬️ Breathing Exercise</CardTitle>
                  <CardDescription className="text-green-100 font-semibold text-lg">
                    4-7-8 breathing technique for relaxation 🧘‍♀️
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <div className="text-center">
                    <div className="text-8xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-pulse drop-shadow-2xl">
                      4-7-8
                    </div>
                    <div className="space-y-4 text-lg font-bold">
                      <p className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-2xl shadow-lg">
                        <strong>Inhale</strong> for 4 counts 💨
                      </p>
                      <p className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-2xl shadow-lg">
                        <strong>Hold</strong> for 7 counts ⏸️
                      </p>
                      <p className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-3 rounded-2xl shadow-lg">
                        <strong>Exhale</strong> for 8 counts 🌬️
                      </p>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white font-black text-xl py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white">
                    ✨ Start Guided Breathing ✨
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
