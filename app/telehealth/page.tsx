"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Video, Calendar } from "lucide-react"
import Link from "next/link"
import { TherapistChatbot } from "@/components/TherapistChatbot"

const therapists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cognitive Behavioral Therapy",
    rating: 4.9,
    experience: "8 years",
    image: "/placeholder.svg?height=80&width=80",
    availability: ["Mon 2-6 PM", "Wed 10 AM-2 PM", "Fri 1-5 PM"],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Anxiety & Depression",
    rating: 4.8,
    experience: "12 years",
    image: "/placeholder.svg?height=80&width=80",
    availability: ["Tue 9 AM-1 PM", "Thu 3-7 PM", "Sat 10 AM-2 PM"],
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Trauma & PTSD",
    rating: 4.9,
    experience: "10 years",
    image: "/placeholder.svg?height=80&width=80",
    availability: ["Mon 10 AM-2 PM", "Wed 2-6 PM", "Fri 9 AM-1 PM"],
  },
]

export default function TelehealthPage() {
  const [selectedTherapist, setSelectedTherapist] = useState<any>(null)
  const [appointmentForm, setAppointmentForm] = useState({
    date: "",
    time: "",
    reason: "",
    notes: "",
  })

  const handleBookAppointment = () => {
    const appointment = {
      id: Date.now(),
      therapist: selectedTherapist,
      ...appointmentForm,
      status: "scheduled",
      createdAt: new Date().toISOString(),
    }

    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]")
    appointments.push(appointment)
    localStorage.setItem("appointments", JSON.stringify(appointments))

    setSelectedTherapist(null)
    setAppointmentForm({ date: "", time: "", reason: "", notes: "" })
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
              <Video className="h-10 w-10 text-white animate-pulse" />
              <div>
                <h1 className="text-4xl font-black text-white drop-shadow-lg">📹 Telehealth</h1>
                <p className="text-yellow-200 text-sm font-semibold">Connect with amazing therapists bestie! ✨</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {!selectedTherapist ? (
          <div>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-black text-white drop-shadow-lg mb-4">🔍 Find Your Perfect Therapist</h2>
              <p className="text-white font-semibold text-lg bg-white/20 backdrop-blur-sm rounded-2xl p-4 inline-block">
                Connect with licensed mental health professionals who get you! 💕
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {therapists.map((therapist) => (
                <Card
                  key={therapist.id}
                  className="bg-gradient-to-br from-white/95 to-purple-100/95 backdrop-blur-sm border-4 border-white shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300"
                >
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-2xl">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={therapist.image || "/placeholder.svg"}
                          alt={therapist.name}
                          className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-3 border-white flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-xl font-black drop-shadow">{therapist.name}</CardTitle>
                        <CardDescription className="text-purple-100 font-semibold">
                          {therapist.specialty}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">⭐</span>
                        <span className="font-black text-purple-700 text-xl">{therapist.rating}</span>
                      </div>
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold px-4 py-2 rounded-full text-lg">
                        {therapist.experience}
                      </Badge>
                    </div>

                    <div>
                      <div className="text-sm font-black mb-3 text-purple-700 flex items-center gap-2">
                        📅 Available Times:
                      </div>
                      <div className="space-y-2">
                        {therapist.availability.map((slot, index) => (
                          <div
                            key={index}
                            className="text-sm font-semibold text-purple-600 bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-2 rounded-2xl border-2 border-purple-200"
                          >
                            {slot}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-black text-lg py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                      onClick={() => setSelectedTherapist(therapist)}
                    >
                      📅 Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-to-br from-white/95 to-yellow-100/95 backdrop-blur-sm border-4 border-yellow-400 shadow-2xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-t-2xl">
                <CardTitle className="flex items-center space-x-3 font-black text-xl">
                  <Calendar className="h-6 w-6 animate-pulse" />
                  <span>📅 Book Appointment with {selectedTherapist.name}</span>
                </CardTitle>
                <CardDescription className="text-yellow-100 font-semibold">
                  Schedule your telehealth session bestie!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-6">
                <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-3 border-purple-200">
                  <div className="relative">
                    <img
                      src={selectedTherapist.image || "/placeholder.svg"}
                      alt={selectedTherapist.name}
                      className="w-16 h-16 rounded-full bg-white border-3 border-purple-300 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-black text-purple-800 text-lg">{selectedTherapist.name}</div>
                    <div className="text-sm font-semibold text-purple-600">{selectedTherapist.specialty}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="date" className="font-bold text-lg text-yellow-800 flex items-center gap-2">
                      📅 Preferred Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={appointmentForm.date}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                      className="border-3 border-yellow-300 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 bg-white font-medium text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="time" className="font-bold text-lg text-yellow-800 flex items-center gap-2">
                      🕐 Preferred Time
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={appointmentForm.time}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                      className="border-3 border-yellow-300 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 bg-white font-medium text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="reason" className="font-bold text-lg text-yellow-800 flex items-center gap-2">
                    💭 Reason for Visit
                  </Label>
                  <Input
                    id="reason"
                    placeholder="e.g., Anxiety management, Depression support, Stress counseling"
                    value={appointmentForm.reason}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, reason: e.target.value })}
                    className="border-3 border-yellow-300 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 bg-white font-medium text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="notes" className="font-bold text-lg text-yellow-800 flex items-center gap-2">
                    📝 Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific concerns or information you'd like to share bestie"
                    value={appointmentForm.notes}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, notes: e.target.value })}
                    rows={3}
                    className="border-3 border-yellow-300 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 bg-white font-medium"
                  />
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-3 border-blue-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <Video className="h-6 w-6 text-blue-600 animate-pulse" />
                    <span className="font-black text-blue-900 text-lg">📹 Session Details</span>
                  </div>
                  <div className="text-sm font-semibold text-blue-800 space-y-2">
                    <p className="flex items-center gap-2">
                      <span className="text-blue-600">•</span> 50-minute video session
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-blue-600">•</span> Secure, HIPAA-compliant platform
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-blue-600">•</span> Session recording available upon request
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-blue-600">•</span> 24-hour cancellation policy
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTherapist(null)}
                    className="flex-1 border-3 border-gray-300 rounded-2xl font-bold text-lg py-3 hover:bg-gray-100"
                  >
                    ← Back to Therapists
                  </Button>
                  <Button
                    onClick={handleBookAppointment}
                    disabled={!appointmentForm.date || !appointmentForm.time || !appointmentForm.reason}
                    className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-black text-lg py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    🎉 Book Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="mt-8 bg-gradient-to-br from-white/95 to-red-100/95 backdrop-blur-sm border-4 border-red-400 shadow-2xl rounded-3xl">
          <CardHeader className="bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-t-2xl">
            <CardTitle className="font-black text-xl">🆘 Emergency Resources</CardTitle>
            <CardDescription className="text-red-100 font-semibold">
              If you're experiencing a mental health emergency, please reach out immediately bestie! 💕
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border-3 border-red-300 transform hover:scale-105 transition-all duration-300">
                <div className="font-black text-red-900 mb-3 text-lg flex items-center gap-2">📞 Crisis Hotline</div>
                <div className="text-red-800 font-bold text-xl mb-2">988 Suicide & Crisis Lifeline</div>
                <div className="text-sm font-semibold text-red-700">24/7 support available ❤️</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border-3 border-orange-300 transform hover:scale-105 transition-all duration-300">
                <div className="font-black text-orange-900 mb-3 text-lg flex items-center gap-2">💬 Text Support</div>
                <div className="text-orange-800 font-bold text-xl mb-2">Text HOME to 741741</div>
                <div className="text-sm font-semibold text-orange-700">Crisis Text Line 📱</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-3 border-blue-300 transform hover:scale-105 transition-all duration-300">
                <div className="font-black text-blue-900 mb-3 text-lg flex items-center gap-2">🚨 Emergency</div>
                <div className="text-blue-800 font-bold text-xl mb-2">Call 911</div>
                <div className="text-sm font-semibold text-blue-700">Immediate danger ⚡</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <TherapistChatbot />
    </div>
  )
}
