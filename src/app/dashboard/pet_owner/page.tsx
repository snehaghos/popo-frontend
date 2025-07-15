"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Search, Plus, Eye, Activity, ShoppingBag, Dog, Cat, Bird } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const defaultPets = [
  {
    id: 1,
    name: "Buddy",
    type: "dog",
    breed: "Golden Retriever",
    age: "3 years",
    image: "/images/Dog.jpg",
    status: "healthy",
  },
  {
    id: 2,
    name: "Whiskers",
    type: "cat",
    breed: "Persian",
    age: "2 years",
    image: "/images/cat.jpg",
    status: "checkup-due",
  },
  {
    id: 3,
    name: "Charlie",
    type: "dog",
    breed: "Beagle",
    age: "5 years",
    image: "/images/dog2.jpg",
    status: "healthy",
  },
  {
    id: 4,
    name: "Luna",
    type: "cat",
    breed: "Siamese",
    age: "1 year",
    image: "/images/cat2.jpg",
    status: "healthy",
  },
]

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
    const [pets, setPets] = useState(defaultPets)

      useEffect(() => {
    const stored = localStorage.getItem("pets")
    if (stored) {
      setPets(JSON.parse(stored))
    }
  }, [])


  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || pet.type === filterType
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "checkup-due":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getTypeIcon = (type: string) => {
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Pet Dashboard</h1>
            <p className="text-muted-foreground">Manage and monitor all your pets in one place</p>
          </div>
          <Link href="/add-pet">
            <Button className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="mr-2 h-4 w-4" />
              Add New Pet
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search pets by name or breed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant={filterType === "all" ? "default" : "outline"} onClick={() => setFilterType("all")}>
              All
            </Button>
            <Button variant={filterType === "dog" ? "default" : "outline"} onClick={() => setFilterType("dog")}>
              <Dog className="mr-2 h-4 w-4" />
              Dogs
            </Button>
            <Button variant={filterType === "cat" ? "default" : "outline"} onClick={() => setFilterType("cat")}>
              <Cat className="mr-2 h-4 w-4" />
              Cats
            </Button>
          </div>
        </div>

        {/* Pet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPets.map((pet) => (
            <Card key={pet.id} className="pet-card-hover border-0 shadow-lg overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
                <Image src={pet.image || "/placeholder.svg"} alt={pet.name} fill className="object-cover" />
                <div className="absolute top-3 right-3">
                  <Badge className={getStatusColor(pet.status)}>
                    {pet.status === "healthy" ? "Healthy" : "Checkup Due"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{pet.name}</h3>
                  <div className="flex items-center text-muted-foreground">{getTypeIcon(pet.type)}</div>
                </div>
                <p className="text-muted-foreground mb-1">{pet.breed}</p>
                <p className="text-sm text-muted-foreground mb-4">{pet.age}</p>

                <div className="flex gap-2">
                  <Link href={`/pet/${pet.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Eye className="mr-2 h-4 w-4" />
                      View Profile
                    </Button>
                  </Link>
                  <Link href={`/activity?pet=${pet.id}`}>
                    <Button variant="outline" size="sm">
                      <Activity className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/pharmacy">
                    <Button variant="outline" size="sm">
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPets.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No pets found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Add your first pet to get started"}
            </p>
            <Link href="/add-pet">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Pet
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <Link href="/add-pet">
        <Button
          size="lg"
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  )
}
