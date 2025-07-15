"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Plus, Activity, Utensils, MapPin, Scissors, Stethoscope, Calendar, Clock, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockActivities = [
  {
    id: 1,
    petName: "Buddy",
    type: "walk",
    title: "Morning Walk",
    date: "2024-01-20",
    time: "08:30 AM",
    duration: "30 minutes",
    notes: "Beautiful morning walk in Central Park. Buddy was very energetic!",
    icon: MapPin,
    color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  },
  {
    id: 2,
    petName: "Whiskers",
    type: "feeding",
    title: "Breakfast",
    date: "2024-01-20",
    time: "07:00 AM",
    amount: "1/2 cup",
    notes: "Regular morning meal with new salmon flavor food",
    icon: Utensils,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  },
  {
    id: 3,
    petName: "Charlie",
    type: "vet",
    title: "Vet Checkup",
    date: "2024-01-19",
    time: "02:00 PM",
    notes: "Annual checkup completed. All vitals normal. Next appointment in 6 months.",
    icon: Stethoscope,
    color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  },
  {
    id: 4,
    petName: "Luna",
    type: "grooming",
    title: "Grooming Session",
    date: "2024-01-18",
    time: "11:00 AM",
    notes: "Full grooming at PetSpa. Nail trim, bath, and brushing completed.",
    icon: Scissors,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  },
]

const activityTypes = [
  { value: "walk", label: "Walk", icon: MapPin },
  { value: "feeding", label: "Feeding", icon: Utensils },
  { value: "vet", label: "Vet Visit", icon: Stethoscope },
  { value: "grooming", label: "Grooming", icon: Scissors },
  { value: "play", label: "Play Time", icon: Activity },
]

export default function ActivityPage() {
  const [activities, setActivities] = useState(mockActivities)
  const [filterType, setFilterType] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newActivity, setNewActivity] = useState({
    petName: "",
    type: "",
    title: "",
    date: "",
    time: "",
    duration: "",
    notes: "",
  })
  const { toast } = useToast()

  const filteredActivities = activities.filter((activity) => filterType === "all" || activity.type === filterType)

  const handleAddActivity = () => {
    if (!newActivity.petName || !newActivity.type || !newActivity.title) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const activityType = activityTypes.find((type) => type.value === newActivity.type)
    const activity = {
      id: activities.length + 1,
      ...newActivity,
      icon: activityType?.icon || Activity,
      color: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
    }

    setActivities([activity, ...activities])
    setNewActivity({
      petName: "",
      type: "",
      title: "",
      date: "",
      time: "",
      duration: "",
      notes: "",
    })
    setIsDialogOpen(false)

    toast({
      title: "Activity Added",
      description: "New activity has been logged successfully.",
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "walk":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "feeding":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "vet":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "grooming":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Activity Tracker</h1>
            <p className="text-muted-foreground">Log and monitor your pets' daily activities</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Plus className="mr-2 h-4 w-4" />
                Log Activity
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Log New Activity</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="petName">Pet Name *</Label>
                    <Input
                      id="petName"
                      placeholder="Enter pet name"
                      value={newActivity.petName}
                      onChange={(e) => setNewActivity({ ...newActivity, petName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Activity Type *</Label>
                    <Select
                      value={newActivity.type}
                      onValueChange={(value) => setNewActivity({ ...newActivity, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {activityTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center space-x-2">
                              <type.icon className="h-4 w-4" />
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Activity Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Morning Walk, Breakfast"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newActivity.date}
                      onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newActivity.time}
                      onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 30 minutes, 1 hour"
                    value={newActivity.duration}
                    onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional details about the activity..."
                    value={newActivity.notes}
                    onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddActivity} className="flex-1">
                    <Plus className="mr-2 h-4 w-4" />
                    Log Activity
                  </Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button variant={filterType === "all" ? "default" : "outline"} onClick={() => setFilterType("all")} size="sm">
            <Filter className="mr-2 h-4 w-4" />
            All Activities
          </Button>
          {activityTypes.map((type) => (
            <Button
              key={type.value}
              variant={filterType === type.value ? "default" : "outline"}
              onClick={() => setFilterType(type.value)}
              size="sm"
            >
              <type.icon className="mr-2 h-4 w-4" />
              {type.label}
            </Button>
          ))}
        </div>

        {/* Activity Timeline */}
        <div className="space-y-6">
          {filteredActivities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <Card key={activity.id} className="border-0 shadow-lg pet-card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {index !== filteredActivities.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold">{activity.title}</h3>
                          <Badge className={getTypeColor(activity.type)}>
                            {activityTypes.find((type) => type.value === activity.type)?.label}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{activity.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Pet: {activity.petName}</p>
                      {activity.duration && (
                        <p className="text-sm text-muted-foreground mb-2">Duration: {activity.duration}</p>
                      )}
                      {activity.notes && <p className="text-sm">{activity.notes}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No activities found</h3>
            <p className="text-muted-foreground mb-4">
              {filterType === "all" ? "Start logging activities for your pets" : `No ${filterType} activities found`}
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Log First Activity
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
