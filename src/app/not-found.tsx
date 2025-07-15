import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
            <Image
              src="/placeholder.svg?height=128&width=128"
              alt="Lost pet illustration"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Oops! Page Not Found</h1>
              <p className="text-muted-foreground">Looks like this page went for a walk and got lost! 🐕</p>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <span>Error 404 - Page not found</span>
            </div>

            <div className="pt-4">
              <Link href="/">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Home className="mr-2 h-4 w-4" />
                  Go Back Home
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
