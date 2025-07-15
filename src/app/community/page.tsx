"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { MessageCircle, Share2, Camera, Video, Plus, ThumbsUp, Eye, Upload, X } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

const mockPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "/images/per1.jpg",
      location: "New York",
    },
    content: "Look at my golden retriever Max enjoying his morning walk! He's such a good boy 🐕",
    media: {
      type: "image",
      url: "/images/media1.jpg",
    },
    likes: 24,
    comments: 8,
    shares: 3,
    timestamp: "2 hours ago",
    tags: ["#GoldenRetriever", "#MorningWalk", "#GoodBoy"],
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      avatar: "/images/per2.jpg",
      location: "California",
    },
    content: "Training session with my German Shepherd Rocky! He's learning new tricks every day 🎾",
    media: {
      type: "video",
      url: "https://www.google.com/search?sa=X&sca_esv=59ea90568060e0cb&sxsrf=AE3TifMFIROQ_u1tGpId2iGY_SDJcHhU-g:1751949667077&udm=7&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIepxPkVkiyvcVCXrRQKSfjcQaZDIJ_rZS9U2lXSeywwkx2RqfGgrn_WzrZShdTAOSET0CWyMnbzePrJvONRs1ZL0xdAzmkkTiHEpIO7bN6yCl3xWE_Y46mff7yOQV6qj_QVhmn9zopKh1JcFRYM2vExThYdZOLRyWYoiX87x5iNV4XXTjxA&q=petcare+video&ved=2ahUKEwiv_ceMuayOAxXZSmwGHaJbF-8QtKgLegQIDBAB&biw=1536&bih=730&dpr=1.25#fpstate=ive&vld=cid:cb6cd75a,vid:Zb3Wzs2FcFE,st:0",
      thumbnail: "/placeholder.svg?height=400&width=600",
    },
    likes: 45,
    comments: 12,
    shares: 7,
    timestamp: "4 hours ago",
    tags: ["#GermanShepherd", "#Training", "#SmartDog"],
  },
  {
    id: 3,
    user: {
      name: "Emma Wilson",
      avatar: "/images/per1.jpg",
      location: "Texas",
    },
    content: "My cats Luna and Shadow having their afternoon nap together. They're inseparable! 😴",
    media: {
      type: "image",
      url: "/images/media2.png",
    },
    likes: 67,
    comments: 15,
    shares: 4,
    timestamp: "6 hours ago",
    tags: ["#CatsOfInstagram", "#Siblings", "#NapTime"],
  },
  {
    id: 4,
    user: {
      name: "David Rodriguez",
      avatar: "/images/per2.jpg",
      location: "Florida",
    },
    content: "Beach day with my rescue pup Charlie! First time seeing the ocean and he loves it! 🌊",
    media: {
      type: "image",
      url: "/images/dog2.jpg",
      thumbnail: "/placeholder.svg?height=400&width=600",
    },
    likes: 89,
    comments: 23,
    shares: 12,
    timestamp: "8 hours ago",
    tags: ["#BeachDog", "#RescuePup", "#FirstTime"],
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState(mockPosts)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    content: "",
    tags: "",
    media: null as File | null,
    mediaPreview: null as string | null,
    mediaType: null as "image" | "video" | null,
  })
  const { toast } = useToast()

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const isVideo = file.type.startsWith("video/")
      const isImage = file.type.startsWith("image/")

      if (!isVideo && !isImage) {
        toast({
          title: "Invalid File Type",
          description: "Please upload only images or videos.",
          variant: "destructive",
        })
        return
      }

      setNewPost((prev) => ({
        ...prev,
        media: file,
        mediaType: isVideo ? "video" : "image",
      }))

      const reader = new FileReader()
      reader.onload = (e) => {
        setNewPost((prev) => ({
          ...prev,
          mediaPreview: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreatePost = () => {
    if (!newPost.content.trim()) {
      toast({
        title: "Missing Content",
        description: "Please write something about your pet!",
        variant: "destructive",
      })
      return
    }

    const post = {
      id: posts.length + 1,
      user: {
        name: "Demo User",
        avatar: "/placeholder.svg?height=50&width=50",
        location: "Your Location",
      },
      content: newPost.content,
      media: newPost.mediaPreview && newPost.mediaType
        ? {
            type: newPost.mediaType,
            url: newPost.mediaPreview,
            thumbnail: newPost.mediaType === "video" ? newPost.mediaPreview : undefined,
          }
        : undefined,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: "Just now",
      tags: newPost.tags
        .split(" ")
        .filter((tag) => tag.startsWith("#"))
        .slice(0, 3),
    }

    setPosts([post, ...posts])
    setNewPost({
      content: "",
      tags: "",
      media: null,
      mediaPreview: null,
      mediaType: null,
    })
    setIsCreateDialogOpen(false)

    toast({
      title: "Post Created!",
      description: "Your post has been shared with the community.",
    })
  }

  const handleLike = (postId: number) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  const clearMedia = () => {
    setNewPost((prev) => ({
      ...prev,
      media: null,
      mediaPreview: null,
      mediaType: null,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Pet Community 🐾</h1>
            <p className="text-muted-foreground">Share your pet's moments and connect with fellow pet lovers</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Share Your Pet's Moment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    What's happening with your pet?
                  </label>
                  <Textarea
                    id="content"
                    placeholder="Share something amazing about your furry friend..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="tags" className="text-sm font-medium">
                    Tags (optional)
                  </label>
                  <Input
                    id="tags"
                    placeholder="#GoldenRetriever #PlayTime #Cute"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  />
                </div>

                {/* Media Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Add Photo or Video</label>
                  {newPost.mediaPreview ? (
                    <div className="relative">
                      {newPost.mediaType === "image" ? (
                        <img
                          src={newPost.mediaPreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="relative w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Video className="w-12 h-12 text-gray-400" />
                          <span className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                            Video Preview
                          </span>
                        </div>
                      )}
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={clearMedia}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex space-x-4">
                          <Camera className="w-8 h-8 text-muted-foreground" />
                          <Video className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground">Upload a photo or video of your pet</p>
                        <Input
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleMediaUpload}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreatePost} className="flex-1">
                    <Upload className="mr-2 h-4 w-4" />
                    Share Post
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={post.user.avatar || "/placeholder.svg"}
                      alt={post.user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{post.user.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{post.user.location}</span>
                      <span className="mx-2">•</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">{post.content}</p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Media */}
                {post.media && (
                  <div className="relative rounded-lg overflow-hidden bg-muted">
                    {post.media.type === "image" ? (
                      <Image
                        src={post.media.url || "/placeholder.svg"}
                        alt="Pet photo"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                      />
                    ) : (
                      <div className="relative">
                        <video
        controls
        width={600}
        height={400}
        className="w-full h-auto object-cover"
        poster={post.media.thumbnail || "/placeholder.svg"}
      >
        <source src={post.media.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-red-500"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 text-muted-foreground hover:text-blue-500"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 text-muted-foreground hover:text-green-500"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </Button>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>{post.likes + post.comments * 2 + 15} views</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="bg-transparent">
            Load More Posts
          </Button>
        </div>
        </div>
    </div>
  )
}