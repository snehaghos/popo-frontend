"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"
import { Search, MapPin, MessageCircle, UserPlus, Dog, Cat, Bird } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

const mockOwners = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "Central Park Area",
    distance: "0.5 miles",
    pets: [
      { name: "Max", type: "dog", breed: "Labrador" },
      { name: "Bella", type: "cat", breed: "Persian" },
    ],
    bio: "Love taking my dogs for morning walks! Always looking for playmates.",
    joinedDate: "2023-08-15",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "Downtown",
    distance: "1.2 miles",
    pets: [{ name: "Rocky", type: "dog", breed: "German Shepherd" }],
    bio: "Professional dog trainer. Happy to share tips and advice!",
    joinedDate: "2023-06-20",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "Riverside",
    distance: "2.1 miles",
    pets: [
      { name: "Tweety", type: "bird", breed: "Canary" },
      { name: "Polly", type: "bird", breed: "Parrot" },
    ],
    bio: "Bird enthusiast and veterinary student. Love connecting with fellow pet owners!",
    joinedDate: "2023-09-10",
    rating: 4.7,
  },
  {
    id: 4,
    name: "David Rodriguez",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "Westside",
    distance: "1.8 miles",
    pets: [
      { name: "Luna", type: "cat", breed: "Maine Coon" },
      { name: "Shadow", type: "cat", breed: "British Shorthair" },
    ],
    bio: "Cat dad of two beautiful felines. Always up for pet care discussions!",
    joinedDate: "2023-07-05",
    rating: 4.6,
  },
]

export default function ConnectPage() {
  const [owners, setOwners] = useState(mockOwners)
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [petTypeFilter, setPetTypeFilter] = useState("all")
  const [selectedOwner, setSelectedOwner] = useState<(typeof mockOwners)[0] | null>(null)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [message, setMessage] = useState("")
  const { toast } = useToast()

  const filteredOwners = owners.filter((owner) => {
    const matchesSearch =
      owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.pets.some((pet) => pet.breed.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesLocation =
      locationFilter === "all" || owner.location.toLowerCase().includes(locationFilter.toLowerCase())
    const matchesPetType = petTypeFilter === "all" || owner.pets.some((pet) => pet.type === petTypeFilter)
    return matchesSearch && matchesLocation && matchesPetType
  })

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Empty Message",
        description: "Please write a message before sending.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Message Sent!",
      description: `Your message has been sent to ${selectedOwner?.name}.`,
    })
    setMessage("")
    setIsMessageDialogOpen(false)
    setSelectedOwner(null)
  }

  const handleSendRequest = (owner: (typeof mockOwners)[0]) => {
    toast({
      title: "Friend Request Sent!",
      description: `Friend request sent to ${owner.name}.`,
    })
  }

  const getPetTypeIcon = (type: string) => {
    switch (type) {
      case "dog":
        return <Dog className="h-4 w-4" />
      case "cat":
        return <Cat className="h-4 w-4" />
      case "bird":
        return <Bird className="h-4 w-4" />
      default:
        return <Dog className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Connect with Pet Owners</h1>
          <p className="text-muted-foreground">Find nearby pet owners and build a community</p>
        </div>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name or pet breed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="central">Central Park Area</SelectItem>
              <SelectItem value="downtown">Downtown</SelectItem>
              <SelectItem value="riverside">Riverside</SelectItem>
              <SelectItem value="westside">Westside</SelectItem>
            </SelectContent>
          </Select>
          <Select value={petTypeFilter} onValueChange={setPetTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by pet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pet Types</SelectItem>
              <SelectItem value="dog">Dogs</SelectItem>
              <SelectItem value="cat">Cats</SelectItem>
              <SelectItem value="bird">Birds</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Owner Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOwners.map((owner) => (
            <Card key={owner.id} className="border-0 shadow-lg pet-card-hover overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
                    <Image src={owner.avatar || "/placeholder.svg"} alt={owner.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{owner.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{owner.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{owner.distance} away</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{owner.bio}</p>

                <div>
                  <h4 className="text-sm font-medium mb-2">Pets:</h4>
                  <div className="flex flex-wrap gap-2">
                    {owner.pets.map((pet, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        {getPetTypeIcon(pet.type)}
                        <span>
                          {pet.name} ({pet.breed})
                        </span>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Joined {new Date(owner.joinedDate).toLocaleDateString()}</span>
                  <span>⭐ {owner.rating}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => {
                      setSelectedOwner(owner)
                      setIsMessageDialogOpen(true)
                    }}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => handleSendRequest(owner)}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOwners.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No pet owners found</h3>
            <p className="text-muted-foreground">Try adjusting your search filters</p>
          </div>
        )}
      </div>

      {/* Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Message to {selectedOwner?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={selectedOwner?.avatar || "/placeholder.svg"}
                  alt={selectedOwner?.name || ""}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold">{selectedOwner?.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedOwner?.location}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Your Message
              </label>
              <textarea
                id="message"
                placeholder="Hi! I'd love to connect and maybe arrange a playdate for our pets..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full p-3 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSendMessage} className="flex-1">
                <MessageCircle className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
