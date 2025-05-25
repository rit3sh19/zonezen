"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, MessageCircle, ThumbsUp, Flag, Plus, Reply } from "lucide-react"
import Link from "next/link"

const topics = [
  { id: "anxiety", name: "Anxiety", color: "bg-gradient-to-r from-orange-400 to-red-400 text-white", count: 24 },
  { id: "depression", name: "Depression", color: "bg-gradient-to-r from-blue-400 to-purple-400 text-white", count: 18 },
  {
    id: "relationships",
    name: "Relationships",
    color: "bg-gradient-to-r from-pink-400 to-rose-400 text-white",
    count: 31,
  },
  {
    id: "school",
    name: "School Pressure",
    color: "bg-gradient-to-r from-purple-400 to-indigo-400 text-white",
    count: 15,
  },
  { id: "work", name: "Work Stress", color: "bg-gradient-to-r from-green-400 to-emerald-400 text-white", count: 22 },
  {
    id: "family",
    name: "Family Issues",
    color: "bg-gradient-to-r from-yellow-400 to-orange-400 text-white",
    count: 12,
  },
]

const generateUsername = () => {
  const adjectives = ["Brave", "Kind", "Strong", "Gentle", "Wise", "Calm", "Bright", "Hope"]
  const nouns = ["Soul", "Heart", "Mind", "Spirit", "Light", "Star", "Moon", "Sun"]
  const numbers = Math.floor(Math.random() * 999) + 1
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${numbers}`
}

const checkForFlaggedContent = (text: string) => {
  const flaggedWords = [
    "suicide",
    "kill myself",
    "end it all",
    "want to die",
    "hurt myself",
    "self harm",
    "cutting",
    "overdose",
    "jump off",
    "hang myself",
  ]
  const lowerText = text.toLowerCase()
  return flaggedWords.some((word) => lowerText.includes(word))
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [selectedTopic, setSelectedTopic] = useState("all")
  const [newPost, setNewPost] = useState({ title: "", content: "", topic: "anxiety" })
  const [showNewPost, setShowNewPost] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [userVotes, setUserVotes] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    const savedPosts = localStorage.getItem("communityPosts")
    const savedVotes = localStorage.getItem("userVotes")

    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    } else {
      const samplePosts = [
        {
          id: 1,
          title: "Dealing with exam anxiety",
          content: "I have my finals coming up and I'm feeling overwhelmed. Any tips for managing stress?",
          topic: "anxiety",
          author: "StudyWarrior123",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          upvotes: 5,
          replies: [
            {
              id: 1,
              content: "Try the 4-7-8 breathing technique! It really helps me calm down before tests.",
              author: "CalmMind456",
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
              upvotes: 3,
            },
          ],
          flagged: false,
        },
        {
          id: 2,
          title: "Feeling isolated lately",
          content: "I've been struggling to connect with friends and family. Anyone else going through this?",
          topic: "relationships",
          author: "LonelyHeart789",
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          upvotes: 8,
          replies: [],
          flagged: false,
        },
      ]
      setPosts(samplePosts)
      localStorage.setItem("communityPosts", JSON.stringify(samplePosts))
    }

    if (savedVotes) {
      setUserVotes(JSON.parse(savedVotes))
    }
  }, [])

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return

    const isFlagged = checkForFlaggedContent(newPost.content)

    if (isFlagged) {
      triggerCrisisAlert(newPost.content)
    }

    const post = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      topic: newPost.topic,
      author: generateUsername(),
      timestamp: new Date().toISOString(),
      upvotes: 0,
      replies: [],
      flagged: isFlagged,
    }

    const updatedPosts = [post, ...posts]
    setPosts(updatedPosts)
    localStorage.setItem("communityPosts", JSON.stringify(updatedPosts))

    setNewPost({ title: "", content: "", topic: "anxiety" })
    setShowNewPost(false)
  }

  const handleUpvote = (postId: number) => {
    if (userVotes[postId]) return

    const updatedPosts = posts.map((post) => (post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post))
    setPosts(updatedPosts)
    localStorage.setItem("communityPosts", JSON.stringify(updatedPosts))

    const updatedVotes = { ...userVotes, [postId]: true }
    setUserVotes(updatedVotes)
    localStorage.setItem("userVotes", JSON.stringify(updatedVotes))
  }

  const handleReply = (postId: number) => {
    if (!replyContent.trim()) return

    const isFlagged = checkForFlaggedContent(replyContent)

    if (isFlagged) {
      triggerCrisisAlert(replyContent)
    }

    const reply = {
      id: Date.now(),
      content: replyContent,
      author: generateUsername(),
      timestamp: new Date().toISOString(),
      upvotes: 0,
      flagged: isFlagged,
    }

    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, replies: [...post.replies, reply] } : post,
    )
    setPosts(updatedPosts)
    localStorage.setItem("communityPosts", JSON.stringify(updatedPosts))

    setReplyContent("")
    setReplyingTo(null)
  }

  const triggerCrisisAlert = (content: string) => {
    const incident = {
      id: Date.now(),
      content,
      timestamp: new Date().toISOString(),
      type: "flagged_content",
      resolved: false,
    }

    const incidents = JSON.parse(localStorage.getItem("crisisIncidents") || "[]")
    incidents.push(incident)
    localStorage.setItem("crisisIncidents", JSON.stringify(incidents))

    alert(
      "Hey bestie, we noticed your message contains some concerning language 💕 Please remember that support is available! If you're in crisis, contact 988 Suicide & Crisis Lifeline. You're not alone! ✨",
    )
  }

  const filteredPosts = selectedTopic === "all" ? posts : posts.filter((post) => post.topic === selectedTopic)

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
              <Users className="h-10 w-10 text-white animate-pulse" />
              <div>
                <h1 className="text-4xl font-black text-white drop-shadow-lg">👥 Peer Support Community</h1>
                <p className="text-yellow-200 text-sm font-semibold">Safe space for mental health discussions ✨</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-white/95 to-purple-100/95 backdrop-blur-sm border-4 border-white shadow-2xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-2xl">
                <CardTitle className="text-xl font-black">🏷️ Topics</CardTitle>
                <CardDescription className="text-purple-100 font-semibold">Browse discussions by vibe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 p-6">
                <button
                  onClick={() => setSelectedTopic("all")}
                  className={`w-full text-left p-3 rounded-2xl transition-all font-bold transform hover:scale-105 ${
                    selectedTopic === "all"
                      ? "bg-gradient-to-r from-indigo-400 to-purple-500 text-white shadow-lg"
                      : "bg-white/50 hover:bg-white/80 text-purple-700"
                  }`}
                >
                  ✨ All Topics ({posts.length})
                </button>
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`w-full text-left p-3 rounded-2xl transition-all font-bold transform hover:scale-105 ${
                      selectedTopic === topic.id
                        ? topic.color + " shadow-lg"
                        : "bg-white/50 hover:bg-white/80 text-purple-700"
                    }`}
                  >
                    {topic.name} ({topic.count})
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6 bg-gradient-to-br from-white/95 to-green-100/95 backdrop-blur-sm border-4 border-white shadow-2xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-t-2xl">
                <CardTitle className="text-xl font-black">📋 Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3 p-6 font-semibold text-green-800">
                <p className="flex items-center gap-2">💕 Be respectful and supportive</p>
                <p className="flex items-center gap-2">🚫 No personal attacks or harassment</p>
                <p className="flex items-center gap-2">🩺 Share experiences, not medical advice</p>
                <p className="flex items-center gap-2">⚠️ Use content warnings when needed</p>
                <p className="flex items-center gap-2">🚨 Report concerning content</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-white drop-shadow-lg">
                {selectedTopic === "all"
                  ? "✨ All Discussions"
                  : `💬 ${topics.find((t) => t.id === selectedTopic)?.name}`}
              </h2>
              <Button
                onClick={() => setShowNewPost(true)}
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-black px-6 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 border-3 border-white"
              >
                <Plus className="h-5 w-5 mr-2" />✨ New Post
              </Button>
            </div>

            {showNewPost && (
              <Card className="mb-6 bg-gradient-to-br from-white/95 to-yellow-100/95 backdrop-blur-sm border-4 border-yellow-400 shadow-2xl rounded-3xl">
                <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-t-2xl">
                  <CardTitle className="font-black text-xl">✍️ Create New Post</CardTitle>
                  <CardDescription className="text-yellow-100 font-semibold">
                    Share your thoughts with the community bestie!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <Input
                    placeholder="What's your post title? ✨"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="border-3 border-yellow-300 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 bg-white font-medium text-lg"
                  />

                  <select
                    value={newPost.topic}
                    onChange={(e) => setNewPost({ ...newPost, topic: e.target.value })}
                    className="w-full p-3 border-3 border-yellow-300 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 bg-white font-medium text-lg"
                  >
                    {topics.map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.name}
                      </option>
                    ))}
                  </select>

                  <Textarea
                    placeholder="Share your thoughts bestie... 💭"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={4}
                    className="border-3 border-yellow-300 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 bg-white font-medium"
                  />

                  <div className="flex space-x-3">
                    <Button
                      onClick={handleCreatePost}
                      className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-black px-6 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      🚀 Post It!
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowNewPost(false)}
                      className="border-3 border-gray-300 rounded-2xl font-bold hover:bg-gray-100"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className={`bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-sm border-4 shadow-2xl rounded-3xl transform hover:scale-[1.02] transition-all duration-300 ${post.flagged ? "border-red-400 bg-gradient-to-br from-red-50/95 to-pink-50/95" : "border-white"}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-black text-purple-800">{post.title}</CardTitle>
                        <div className="flex items-center space-x-3 mt-3 flex-wrap gap-2">
                          <Badge
                            className={
                              topics.find((t) => t.id === post.topic)?.color + " font-bold px-3 py-1 rounded-full"
                            }
                          >
                            {topics.find((t) => t.id === post.topic)?.name}
                          </Badge>
                          <span className="text-sm font-semibold text-purple-600">by {post.author}</span>
                          <span className="text-sm text-purple-500">{new Date(post.timestamp).toLocaleString()}</span>
                          {post.flagged && (
                            <Badge className="bg-gradient-to-r from-red-400 to-pink-400 text-white font-bold">
                              <Flag className="h-3 w-3 mr-1" />🚨 Flagged
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-700 mb-6 font-medium text-lg">{post.content}</p>

                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpvote(post.id)}
                        disabled={userVotes[post.id]}
                        className={`font-bold rounded-2xl px-4 py-2 transition-all transform hover:scale-105 ${userVotes[post.id] ? "text-blue-600 bg-blue-100" : "hover:bg-purple-100"}`}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />💙 {post.upvotes}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                        className="font-bold rounded-2xl px-4 py-2 hover:bg-purple-100 transition-all transform hover:scale-105"
                      >
                        <Reply className="h-4 w-4 mr-2" />💬 Reply ({post.replies.length})
                      </Button>
                    </div>

                    {replyingTo === post.id && (
                      <div className="mt-6 space-y-3 p-4 bg-purple-50 rounded-2xl border-2 border-purple-200">
                        <Textarea
                          placeholder="Write a supportive reply bestie... 💕"
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          rows={3}
                          className="border-2 border-purple-300 rounded-2xl focus:border-purple-500 bg-white font-medium"
                        />
                        <div className="flex space-x-3">
                          <Button
                            size="sm"
                            onClick={() => handleReply(post.id)}
                            className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-2xl px-4 py-2"
                          >
                            💌 Post Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setReplyingTo(null)}
                            className="border-2 border-gray-300 rounded-2xl font-bold"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {post.replies.length > 0 && (
                      <div className="mt-6 space-y-4 border-l-4 border-purple-300 pl-6">
                        {post.replies.map((reply: any) => (
                          <div
                            key={reply.id}
                            className={`p-4 rounded-2xl shadow-lg ${reply.flagged ? "bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200" : "bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200"}`}
                          >
                            <div className="flex items-center space-x-3 mb-3">
                              <span className="font-black text-purple-700">{reply.author}</span>
                              <span className="text-xs text-purple-500 font-semibold">
                                {new Date(reply.timestamp).toLocaleString()}
                              </span>
                              {reply.flagged && (
                                <Badge className="bg-gradient-to-r from-red-400 to-pink-400 text-white text-xs font-bold">
                                  <Flag className="h-2 w-2 mr-1" />🚨 Flagged
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-purple-700 font-medium">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {filteredPosts.length === 0 && (
                <Card className="bg-gradient-to-br from-white/95 to-purple-100/95 backdrop-blur-sm border-4 border-white shadow-2xl rounded-3xl">
                  <CardContent className="text-center py-12">
                    <MessageCircle className="h-16 w-16 text-purple-400 mx-auto mb-6" />
                    <p className="text-purple-600 font-bold text-xl">No posts in this category yet bestie! 💕</p>
                    <p className="text-purple-500 font-semibold mt-2">Be the first to start a discussion! ✨</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
