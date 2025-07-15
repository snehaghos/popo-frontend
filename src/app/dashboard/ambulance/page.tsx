"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Navbar } from "@/components/navbar"
import { Truck, Phone, MapPin, Clock, Shield, CheckCircle, Upload, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function Ambulance() {
  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    licenseNumber: "",
    yearsInService: "",

    // Contact Information
    contactPerson: "",
    phoneNumber: "",
    emergencyPhone: "",
    email: "",

    // Location & Coverage
    address: "",
    city: "",
    state: "",
    zipCode: "",
    serviceRadius: "",

    // Services & Equipment
    services: [] as string[],
    vehicleTypes: [] as string[],
    specialEquipment: "",

    // Availability
    operatingHours: "",
    emergencyAvailable: false,

    // Credentials
    certifications: "",
    insurance: "",

    // Additional Info
    description: "",
    website: "",
  })

  const [documents, setDocuments] = useState<File[]>([])
  const { toast } = useToast()
  const router = useRouter()

  const serviceOptions = [
    "Emergency Pet Transport",
    "Veterinary Clinic Transfer",
    "Post-Surgery Transport",
    "Critical Care Transport",
    "Oxygen Support",
    "Temperature Controlled Transport",
    "Large Animal Transport",
    "Exotic Pet Transport",
  ]

  const vehicleOptions = [
    "Standard Ambulance",
    "Mobile ICU",
    "Large Animal Transport",
    "Climate Controlled Vehicle",
    "Oxygen Equipped Vehicle",
  ]

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, service],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        services: prev.services.filter((s) => s !== service),
      }))
    }
  }

  const handleVehicleChange = (vehicle: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        vehicleTypes: [...prev.vehicleTypes, vehicle],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        vehicleTypes: prev.vehicleTypes.filter((v) => v !== vehicle),
      }))
    }
  }

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setDocuments((prev) => [...prev, ...files])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.businessName || !formData.contactPerson || !formData.phoneNumber || !formData.licenseNumber) {
      toast({
        title: "Missing Required Information",
        description: "Please fill in all required fields marked with *",
        variant: "destructive",
      })
      return
    }

    if (formData.services.length === 0) {
      toast({
        title: "No Services Selected",
        description: "Please select at least one service you provide.",
        variant: "destructive",
      })
      return
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Application Submitted Successfully!",
        description: "We'll review your application and contact you within 2-3 business days.",
      })
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-teal-900/20">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-teal-500">
              <Truck className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Join as Pet Ambulance Provider</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help save pet lives by providing emergency transport services. Register your ambulance service with POPO and
            connect with pet owners in need.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {/* Business Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span>Business Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      placeholder="Pet Emergency Transport LLC"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">License Number *</Label>
                    <Input
                      id="licenseNumber"
                      placeholder="Enter your business license number"
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsInService">Years in Service</Label>
                  <Select
                    value={formData.yearsInService}
                    onValueChange={(value) => handleInputChange("yearsInService", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select years of experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-green-500" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      placeholder="John Smith"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Primary Phone *</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      placeholder="(555) 999-0000"
                      value={formData.emergencyPhone}
                      onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@petambulance.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Coverage */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-purple-500" />
                  <span>Location & Service Area</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      placeholder="10001"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceRadius">Service Radius (miles)</Label>
                  <Select
                    value={formData.serviceRadius}
                    onValueChange={(value) => handleInputChange("serviceRadius", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service radius" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">Within 10 miles</SelectItem>
                      <SelectItem value="25">Within 25 miles</SelectItem>
                      <SelectItem value="50">Within 50 miles</SelectItem>
                      <SelectItem value="100">Within 100 miles</SelectItem>
                      <SelectItem value="statewide">Statewide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Services & Equipment */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-orange-500" />
                  <span>Services & Equipment</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Services Provided *</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {serviceOptions.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.services.includes(service)}
                          onCheckedChange={(checked) => handleServiceChange(service, checked === true)}
                        />
                        <Label htmlFor={service} className="text-sm font-normal">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Vehicle Types</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {vehicleOptions.map((vehicle) => (
                      <div key={vehicle} className="flex items-center space-x-2">
                        <Checkbox
                          id={vehicle}
                          checked={formData.vehicleTypes.includes(vehicle)}
                          onCheckedChange={(checked) => handleVehicleChange(vehicle, checked as boolean)}
                        />
                        <Label htmlFor={vehicle} className="text-sm font-normal">
                          {vehicle}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialEquipment">Special Equipment</Label>
                  <Textarea
                    id="specialEquipment"
                    placeholder="List any special medical equipment, oxygen tanks, temperature control systems, etc."
                    value={formData.specialEquipment}
                    onChange={(e) => handleInputChange("specialEquipment", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-indigo-500" />
                  <span>Availability</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="operatingHours">Operating Hours</Label>
                  <Input
                    id="operatingHours"
                    placeholder="e.g., Mon-Fri 8AM-6PM, Sat-Sun 9AM-5PM"
                    value={formData.operatingHours}
                    onChange={(e) => handleInputChange("operatingHours", e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emergencyAvailable"
                    checked={formData.emergencyAvailable}
                    onCheckedChange={(checked) => handleInputChange("emergencyAvailable", checked as boolean)}
                  />
                  <Label htmlFor="emergencyAvailable">Available for 24/7 Emergency Calls</Label>
                </div>
              </CardContent>
            </Card>

            {/* Credentials & Documentation */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Credentials & Documentation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="certifications">Certifications</Label>
                  <Textarea
                    id="certifications"
                    placeholder="List relevant certifications (e.g., Pet First Aid, Animal Transport Certification, etc.)"
                    value={formData.certifications}
                    onChange={(e) => handleInputChange("certifications", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insurance">Insurance Information</Label>
                  <Textarea
                    id="insurance"
                    placeholder="Provide details about your liability insurance, coverage amounts, etc."
                    value={formData.insurance}
                    onChange={(e) => handleInputChange("insurance", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documents">Upload Documents</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground mb-2">Upload licenses, certifications, insurance documents</p>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleDocumentUpload}
                      className="cursor-pointer"
                    />
                  </div>
                  {documents.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">{documents.length} file(s) selected</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your business, experience, and what makes you special..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website (optional)</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.yourambulanceservice.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-teal-600 text-white">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ready to Save Pet Lives?</h3>
                <p className="mb-6 opacity-90">
                  Submit your application and join our network of trusted pet ambulance providers.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Submit Application
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
}
