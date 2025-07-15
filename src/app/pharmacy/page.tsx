"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { MapPin, Phone, Clock, ShoppingBag, Truck, CheckCircle, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockPharmacies = [
  {
    id: 1,
    name: "PetCare Pharmacy",
    address: "123 Main Street, Downtown",
    phone: "(555) 123-4567",
    distance: "0.8 miles",
    rating: 4.8,
    hours: "Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM",
    services: ["Prescription Delivery", "Emergency Orders", "Consultation"],
  },
  {
    id: 2,
    name: "Animal Health Plus",
    address: "456 Oak Avenue, Westside",
    phone: "(555) 987-6543",
    distance: "1.2 miles",
    rating: 4.6,
    hours: "Mon-Sat: 9AM-7PM, Sun: 10AM-5PM",
    services: ["Same Day Delivery", "Online Ordering", "Pet Nutrition"],
  },
  {
    id: 3,
    name: "VetMed Express",
    address: "789 Pine Road, Riverside",
    phone: "(555) 456-7890",
    distance: "2.1 miles",
    rating: 4.9,
    hours: "24/7 Emergency Service",
    services: ["24/7 Service", "Prescription Delivery", "Emergency Orders"],
  },
]

const orderStatuses = [
  {
    status: "requested",
    label: "Order Requested",
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  },
  {
    status: "processing",
    label: "Processing",
    icon: Package,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  },
  {
    status: "ready",
    label: "Ready for Pickup",
    icon: CheckCircle,
    color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  },
  {
    status: "delivered",
    label: "Delivered",
    icon: Truck,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  },
]

export default function PharmacyPage() {
  const [selectedPharmacy, setSelectedPharmacy] = useState<(typeof mockPharmacies)[0] | null>(null)
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  const [orders, setOrders] = useState<any[]>([])
  const [orderForm, setOrderForm] = useState({
    petName: "",
    medicineName: "",
    dosage: "",
    quantity: "",
    deliveryOption: "pickup",
    notes: "",
  })
  const { toast } = useToast()

  const handleOrderSubmit = () => {
    if (!orderForm.petName || !orderForm.medicineName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newOrder = {
      id: orders.length + 1,
      ...orderForm,
      pharmacy: selectedPharmacy?.name,
      status: "requested",
      orderDate: new Date().toLocaleDateString(),
      estimatedReady: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    }

    setOrders([newOrder, ...orders])
    setOrderForm({
      petName: "",
      medicineName: "",
      dosage: "",
      quantity: "",
      deliveryOption: "pickup",
      notes: "",
    })
    setIsOrderDialogOpen(false)
    setSelectedPharmacy(null)

    toast({
      title: "Order Placed Successfully!",
      description: `Your medicine order has been sent to ${selectedPharmacy?.name}.`,
    })

    // Simulate order status updates
    setTimeout(() => {
      setOrders((prev) => prev.map((order) => (order.id === newOrder.id ? { ...order, status: "processing" } : order)))
      toast({
        title: "Order Update",
        description: "Your order is now being processed.",
      })
    }, 3000)

    setTimeout(() => {
      setOrders((prev) => prev.map((order) => (order.id === newOrder.id ? { ...order, status: "ready" } : order)))
      toast({
        title: "Order Ready!",
        description: "Your medicine is ready for pickup.",
      })
    }, 8000)
  }

  const getStatusInfo = (status: string) => {
    return orderStatuses.find((s) => s.status === status) || orderStatuses[0]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Pet Pharmacy</h1>
          <p className="text-muted-foreground">Order medicines and supplies for your pets</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pharmacy List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold">Nearby Pharmacies</h2>

            <div className="space-y-4">
              {mockPharmacies.map((pharmacy) => (
                <Card key={pharmacy.id} className="border-0 shadow-lg pet-card-hover">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{pharmacy.name}</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{pharmacy.address}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            <span>{pharmacy.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{pharmacy.hours}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-medium mr-1">⭐ {pharmacy.rating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{pharmacy.distance}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {pharmacy.services.map((service, index) => (
                          <Badge key={index} variant="secondary">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      onClick={() => {
                        setSelectedPharmacy(pharmacy)
                        setIsOrderDialogOpen(true)
                      }}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Order Medicine
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Status */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Your Orders</h2>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => {
                  const statusInfo = getStatusInfo(order.status)
                  const StatusIcon = statusInfo.icon
                  return (
                    <Card key={order.id} className="border-0 shadow-lg">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">Order #{order.id}</h4>
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusInfo.label}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-medium">Pet:</span> {order.petName}
                          </p>
                          <p>
                            <span className="font-medium">Medicine:</span> {order.medicineName}
                          </p>
                          <p>
                            <span className="font-medium">Pharmacy:</span> {order.pharmacy}
                          </p>
                          <p>
                            <span className="font-medium">Order Date:</span> {order.orderDate}
                          </p>
                          {order.status !== "delivered" && (
                            <p>
                              <span className="font-medium">Est. Ready:</span> {order.estimatedReady}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
                  <p className="text-muted-foreground text-sm">Your medicine orders will appear here</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Order Dialog */}
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Order Medicine from {selectedPharmacy?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="petName">Pet Name *</Label>
                <Input
                  id="petName"
                  placeholder="Enter pet name"
                  value={orderForm.petName}
                  onChange={(e) => setOrderForm({ ...orderForm, petName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicineName">Medicine Name *</Label>
                <Input
                  id="medicineName"
                  placeholder="Enter medicine name"
                  value={orderForm.medicineName}
                  onChange={(e) => setOrderForm({ ...orderForm, medicineName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  placeholder="e.g., 10mg"
                  value={orderForm.dosage}
                  onChange={(e) => setOrderForm({ ...orderForm, dosage: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  placeholder="e.g., 30 tablets"
                  value={orderForm.quantity}
                  onChange={(e) => setOrderForm({ ...orderForm, quantity: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryOption">Delivery Option</Label>
              <Select
                value={orderForm.deliveryOption}
                onValueChange={(value) => setOrderForm({ ...orderForm, deliveryOption: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pickup">Store Pickup</SelectItem>
                  <SelectItem value="delivery">Home Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Special Instructions</Label>
              <textarea
                id="notes"
                placeholder="Any special instructions or notes..."
                value={orderForm.notes}
                onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                rows={3}
                className="w-full p-3 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleOrderSubmit} className="flex-1">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Place Order
              </Button>
              <Button variant="outline" onClick={() => setIsOrderDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
