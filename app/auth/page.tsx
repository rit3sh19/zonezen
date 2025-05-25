"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'login', email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      localStorage.setItem('user', JSON.stringify(data))
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'signup', name, email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      localStorage.setItem('user', JSON.stringify(data))
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-32 w-24 h-24 bg-green-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-orange-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-60 right-1/4 w-20 h-20 bg-red-400 rounded-full animate-spin"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <Heart className="mx-auto h-16 w-16 text-white animate-pulse drop-shadow-2xl" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full animate-bounce"></div>
          </div>
          <h1 className="mt-6 text-5xl font-black text-white drop-shadow-2xl">💕 ZenZone</h1>
          <p className="mt-4 text-xl font-bold text-white bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            Your mental health bestie! ✨
          </p>
        </div>

        <Card className="bg-gradient-to-br from-white/95 to-purple-100/95 backdrop-blur-sm border-4 border-white shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-2xl">
            <CardTitle className="font-black text-2xl text-center">🎉 Welcome Bestie!</CardTitle>
            <CardDescription className="text-purple-100 font-semibold text-center">
              Sign in to your account or create a new one to get started on your wellness journey! 🚀
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
            )}
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 mb-8">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-purple-700 hover:bg-purple-100 transition-all duration-300 rounded-2xl font-bold text-lg py-4 mx-1 border-3 border-purple-300"
                >
                  🔑 Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-cyan-700 hover:bg-cyan-100 transition-all duration-300 rounded-2xl font-bold text-lg py-4 mx-1 border-3 border-cyan-300"
                >
                  ✨ Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="bg-white/50 backdrop-blur-sm border-2 border-purple-200 focus:border-purple-500 rounded-xl p-6 text-lg placeholder:text-purple-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      className="bg-white/50 backdrop-blur-sm border-2 border-purple-200 focus:border-purple-500 rounded-xl p-6 text-lg placeholder:text-purple-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-6 text-lg font-bold hover:opacity-90 transition-all duration-300 hover:scale-105"
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      required
                      className="bg-white/50 backdrop-blur-sm border-2 border-cyan-200 focus:border-cyan-500 rounded-xl p-6 text-lg placeholder:text-cyan-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="bg-white/50 backdrop-blur-sm border-2 border-cyan-200 focus:border-cyan-500 rounded-xl p-6 text-lg placeholder:text-cyan-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      required
                      className="bg-white/50 backdrop-blur-sm border-2 border-cyan-200 focus:border-cyan-500 rounded-xl p-6 text-lg placeholder:text-cyan-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl py-6 text-lg font-bold hover:opacity-90 transition-all duration-300 hover:scale-105"
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
