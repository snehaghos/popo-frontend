"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, Edit, Save, Activity, FileText, Syringe, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

const mockPets = [
  {
    id: 1,
    name: "Buddy",
    breed: "Golden Retriever",
    age: "3 years",
    weight: "32 kg",
    gender: "Male",
    image: "/images/Dog.jpg",
    status: "healthy",
    owner: "John Doe",
    microchip: "123456789012345",
  },
  {
    id: 2,
    name: "Whiskers",
    breed: "Persian",
    age: "2 years",
    weight: "5 kg",
    gender: "Female",
    image: "/images/cat.jpg",
    status: "checkup-due",
    owner: "Jane Smith",
    microchip: "987654321098765",
  },
  {
    id: 3,
    name: "Charlie",
    breed: "Beagle",
    age: "5 years",
    weight: "12 kg",
    gender:"Male",
    image: "/images/dog2.jpg",
    status: "healthy",
    owner: "Alice Johnson",
    microchip: "112233445566778"
  },
  {
    id: 4,
    name: "Luna",
    breed: "Siamese",
    age: "1 year",
    weight: "4 kg",
      gender:"Male",
    image: "/images/dog2.jpg",
    status: "healthy",
    owner: "Alice Johnson",
    microchip: "11223445566778"
  }


  
]

const mockMedicalRecords = [
  {
    id: 1,
    date: "2024-01-15",
    type: "Checkup",
    vet: "Dr. Smith",
    notes: "Regular health checkup. All vitals normal.",
    status: "completed",
  },
  {
    id: 2,
    date: "2023-12-10",
    type: "Vaccination",
    vet: "Dr. Johnson",
    notes: "Annual vaccination booster administered.",
    status: "completed",
  },
]

const mockVaccinations = [
  {
    id: 1,
    vaccine: "Rabies",
    date: "2023-12-10",
    nextDue: "2024-12-10",
    status: "current",
  },
  {
    id: 2,
    vaccine: "DHPP",
    date: "2023-11-15",
    nextDue: "2024-11-15",
    status: "due-soon",
  },
]

const mockActivities = [
  {
    id: 1,
    type: "Walk",
    date: "2024-01-20",
    time: "08:30 AM",
    duration: "30 minutes",
    notes: "Morning walk in the park",
  },
  {
    id: 2,
    type: "Feeding",
    date: "2024-01-20",
    time: "07:00 AM",
    amount: "2 cups",
    notes: "Regular morning meal",
  },
  {
    id: 3,
    type: "Grooming",
    date: "2024-01-19",
    time: "02:00 PM",
    notes: "Full grooming session at pet salon",
  },
]

export default function PetProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()
  const { id } = React.use(params) // Unwrap the params promise
  const petId = Number(id)
  const pet = mockPets.find((p) => p.id === petId)
  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Pet Not Found</h2>
          <p className="text-muted-foreground mb-4">The pet you are looking for does not exist.</p>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Pet profile has been successfully updated.",
    })
  }

  const getVaccineStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "due-soon":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">{pet.name}'s Profile</h1>
              <p className="text-muted-foreground">Manage your pet's information and health records</p>
            </div>
          </div>
          <div className="flex space-x-2">
            {isEditing ? (
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pet Info Card */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
                    <Image src={pet.image || "/placeholder.svg"} alt={pet.name} fill className="object-cover" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{pet.name}</h2>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    Healthy
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Breed:</span>
                    <span className="font-medium">{pet.breed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age:</span>
                    <span className="font-medium">{pet.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="font-medium">{pet.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gender:</span>
                    <span className="font-medium">{pet.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Owner:</span>
                    <span className="font-medium">{pet.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Microchip:</span>
                    <span className="font-medium text-xs">{pet.microchip}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="medical" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="medical" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Medical Records</span>
                </TabsTrigger>
                <TabsTrigger value="vaccination" className="flex items-center space-x-2">
                  <Syringe className="h-4 w-4" />
                  <span>Vaccination</span>
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center space-x-2">
                  <Activity className="h-4 w-4" />
                  <span>Activity Logs</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="medical" className="space-y-4">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Medical History</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockMedicalRecords.map((record) => (
                        <div key={record.id} className="border-l-4 border-purple-500 pl-4 py-2">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{record.type}</h4>
                            <span className="text-sm text-muted-foreground">{record.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">Dr. {record.vet}</p>
                          <p className="text-sm">{record.notes}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vaccination" className="space-y-4">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Syringe className="h-5 w-5" />
                      <span>Vaccination Schedule</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockVaccinations.map((vaccine) => (
                        <div key={vaccine.id} className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                          <div>
                            <h4 className="font-semibold">{vaccine.vaccine}</h4>
                            <p className="text-sm text-muted-foreground">Last: {vaccine.date}</p>
                            <p className="text-sm text-muted-foreground">Next: {vaccine.nextDue}</p>
                          </div>
                          <Badge className={getVaccineStatusColor(vaccine.status)}>
                            {vaccine.status === "current" ? "Current" : "Due Soon"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="h-5 w-5" />
                      <span>Recent Activities</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockActivities.map((activity, index) => (
                        <div key={activity.id} className="relative">
                          {index !== mockActivities.length - 1 && (
                            <div className="absolute left-4 top-8 w-0.5 h-16 bg-border" />
                          )}
                          <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                              <Heart className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-semibold">{activity.type}</h4>
                                <span className="text-sm text-muted-foreground">{activity.time}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{activity.date}</p>
                              {activity.notes && <p className="text-sm">{activity.notes}</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
