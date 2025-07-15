"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Navbar } from "@/components/navbar"

import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Heart,
  Users,
  Stethoscope,
  Scissors,
  Building,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockJobs = [
  {
    id: 1,
    title: "Veterinary Assistant",
    company: "Happy Paws Veterinary Clinic",
    location: "New York, NY",
    type: "Full-time",
    salary: "$35,000 - $45,000",
    posted: "2 days ago",
    description:
      "We are seeking a compassionate veterinary assistant to join our team. Experience with small animals preferred.",
    requirements: [
      "High school diploma",
      "Animal handling experience",
      "Strong communication skills",
      "Ability to work weekends",
    ],
    benefits: ["Health insurance", "Paid time off", "Employee pet discounts", "Professional development"],
    category: "veterinary",
    remote: false,
    urgent: false,
  },
  {
    id: 2,
    title: "Pet Groomer",
    company: "Pampered Pets Salon",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$20 - $30/hour",
    posted: "1 day ago",
    description: "Experienced pet groomer needed for busy salon. Must be skilled in various grooming techniques.",
    requirements: ["Certified grooming training", "2+ years experience", "Own grooming tools", "Patience with animals"],
    benefits: ["Flexible schedule", "Commission bonuses", "Continuing education support"],
    category: "grooming",
    remote: false,
    urgent: true,
  },
  {
    id: 3,
    title: "Pet Sitter / Dog Walker",
    company: "POPO Pet Services",
    location: "Chicago, IL",
    type: "Freelance",
    salary: "$15 - $25/hour",
    posted: "3 hours ago",
    description: "Join our network of trusted pet sitters and dog walkers. Flexible schedule, work when you want!",
    requirements: ["Love for animals", "Reliable transportation", "Background check", "Smartphone with app"],
    benefits: ["Flexible hours", "Weekly payments", "Insurance coverage", "24/7 support"],
    category: "pet-care",
    remote: false,
    urgent: false,
  },
  {
    id: 4,
    title: "Veterinary Technician",
    company: "Animal Emergency Hospital",
    location: "Miami, FL",
    type: "Full-time",
    salary: "$45,000 - $55,000",
    posted: "5 days ago",
    description: "Licensed veterinary technician needed for emergency animal hospital. Night shifts available.",
    requirements: [
      "Licensed Vet Tech",
      "Emergency experience preferred",
      "Strong multitasking skills",
      "Compassionate nature",
    ],
    benefits: ["Competitive salary", "Health benefits", "Retirement plan", "Shift differentials"],
    category: "veterinary",
    remote: false,
    urgent: true,
  },
  {
    id: 5,
    title: "Pet Store Manager",
    company: "Pets & More Superstore",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$50,000 - $65,000",
    posted: "1 week ago",
    description: "Manage daily operations of busy pet store. Leadership experience and pet knowledge required.",
    requirements: [
      "Management experience",
      "Pet industry knowledge",
      "Customer service skills",
      "Inventory management",
    ],
    benefits: ["Management bonus", "Employee discounts", "Health insurance", "Career advancement"],
    category: "retail",
    remote: false,
    urgent: false,
  },
  {
    id: 6,
    title: "Remote Pet Content Writer",
    company: "Pet Life Magazine",
    location: "Remote",
    type: "Contract",
    salary: "$25 - $40/hour",
    posted: "4 days ago",
    description: "Write engaging content about pet care, training, and health for our online magazine and blog.",
    requirements: ["Excellent writing skills", "Pet knowledge", "SEO experience", "Portfolio of published work"],
    benefits: ["Remote work", "Flexible deadlines", "Byline credit", "Networking opportunities"],
    category: "content",
    remote: true,
    urgent: false,
  },
]

const jobCategories = [
  { value: "all", label: "All Categories", icon: Briefcase },
  { value: "veterinary", label: "Veterinary", icon: Stethoscope },
  { value: "grooming", label: "Pet Grooming", icon: Scissors },
  { value: "pet-care", label: "Pet Care", icon: Heart },
  { value: "retail", label: "Pet Retail", icon: Building },
  { value: "content", label: "Content & Marketing", icon: Users },
]

export default function job_seeker() {
  const [jobs, setJobs] = useState(mockJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedJob, setSelectedJob] = useState<(typeof mockJobs)[0] | null>(null)
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false)
  const { toast } = useToast()

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase())

    const matchesCategory = categoryFilter === "all" || job.category === categoryFilter
    const matchesType = typeFilter === "all" || job.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesLocation && matchesCategory && matchesType
  })

  const handleApply = (job: (typeof mockJobs)[0]) => {
    setSelectedJob(job)
    setIsApplicationDialogOpen(true)
  }

  const handleSubmitApplication = () => {
    toast({
      title: "Application Submitted!",
      description: `Your application for ${selectedJob?.title} has been sent to ${selectedJob?.company}.`,
    })
    setIsApplicationDialogOpen(false)
    setSelectedJob(null)
  }

  const getJobTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "full-time":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "part-time":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "contract":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "freelance":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
 
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Find Your Dream Pet Industry Job 🐾</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover amazing career opportunities in veterinary care, pet grooming, animal welfare, and more through
              POPO's job platform.
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="border-0 shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search jobs, companies, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Job Categories */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            {jobCategories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.value}
                  variant={categoryFilter === category.value ? "default" : "outline"}
                  onClick={() => setCategoryFilter(category.value)}
                  className="flex flex-col items-center space-y-2 h-auto py-4 bg-transparent"
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs text-center">{category.label}</span>
                </Button>
              )
            })}
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
            </p>
            <Select defaultValue="newest">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                <SelectItem value="salary-low">Salary: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="border-0 shadow-lg pet-card-hover">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        {job.urgent && (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Urgent</Badge>
                        )}
                        {job.remote && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                            Remote
                          </Badge>
                        )}
                      </div>
                      <p className="text-lg text-muted-foreground mb-2">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.posted}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </div>
                      </div>
                      <Badge className={getJobTypeColor(job.type)}>{job.type}</Badge>
                    </div>
                    <Button
                      onClick={() => handleApply(job)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Apply Now
                    </Button>
                  </div>

                  <p className="text-muted-foreground mb-4">{job.description}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Requirements:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {job.requirements.slice(0, 3).map((req, index) => (
                          <li key={index}>• {req}</li>
                        ))}
                        {job.requirements.length > 3 && <li>• +{job.requirements.length - 3} more...</li>}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Benefits:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {job.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index}>• {benefit}</li>
                        ))}
                        {job.benefits.length > 3 && <li>• +{job.benefits.length - 3} more...</li>}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or check back later for new opportunities.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setLocationFilter("")
                  setCategoryFilter("all")
                  setTypeFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredJobs.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline" className="bg-transparent">
                Load More Jobs
              </Button>
            </div>
          )}
        </div>

        {/* Application Dialog */}
        <Dialog open={isApplicationDialogOpen} onOpenChange={setIsApplicationDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold">{selectedJob?.company}</h4>
                <p className="text-sm text-muted-foreground">{selectedJob?.location}</p>
                <p className="text-sm text-muted-foreground">{selectedJob?.salary}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Cover Letter</label>
                  <textarea
                    placeholder="Tell us why you're perfect for this role..."
                    rows={6}
                    className="w-full p-3 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Resume/CV</label>
                  <Input type="file" accept=".pdf,.doc,.docx" className="mt-1" />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSubmitApplication} className="flex-1">
                  Submit Application
                </Button>
                <Button variant="outline" onClick={() => setIsApplicationDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    
  )
}
