"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Heart, PlusCircle, LayoutDashboard, Users, Sparkles, Shield, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">POPO</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Your comprehensive pet care companion. Track health, connect with other pet owners, and keep your furry
                friends happy and healthy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/add-pet">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Your Pet
                </Button>
              </Link>
              <Link href="/dashboard/pet_owner">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  View Dashboard
                </Button>
              </Link>
              <Link href="/connect">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Users className="mr-2 h-5 w-5" />
                  Connect with Owners
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800">
              <Image
                src="/images/Dog.jpg"
                alt="Happy pets illustration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent" />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose POPO?</h2>
          <p className="text-muted-foreground text-lg">Everything you need to care for your beloved pets</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="pet-card-hover border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Tracking</h3>
              <p className="text-muted-foreground">
                Keep track of feeding, walks, vet visits, and more with our intelligent activity tracker.
              </p>
            </CardContent>
          </Card>

          <Card className="pet-card-hover border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Health Records</h3>
              <p className="text-muted-foreground">
                Maintain complete medical records, vaccination schedules, and health history.
              </p>
            </CardContent>
          </Card>

          <Card className="pet-card-hover border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                Connect with nearby pet owners, share experiences, and build lasting friendships.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Pet Care Journey?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of pet owners who trust POPO for their pet care needs.
            </p>
            <Link href="/add-pet">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Your First Pet
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
