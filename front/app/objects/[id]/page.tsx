"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RefreshCw, User, MapPin, Calendar, ArrowLeft, MessageCircle } from "lucide-react"

export default function ObjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [object, setObject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [exchangeMessage, setExchangeMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const fetchObject = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/object/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch object details")
        }
        const data = await response.json()

        setObject({
          id: data.id,
          name: data.name ?? "Unnamed object",
          description: data.description ?? "No description available.",
          category: data.category?.name ?? "No category",
          owner: data.owner?.username ?? "Unknown owner",
          location: data.owner?.location ?? "Unknown location",
          createdAt: data.createdAt ?? "Date unknown",
          image: data.image ?? "/placeholder.svg?height=400&width=600",
        })
      } catch (error) {
        console.error("Error fetching object:", error)
        router.push("/objects")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchObject()
    }
  }, [params.id, router])

  const handleExchangeRequest = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/exchange`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objectId: object.id, message: exchangeMessage }),
      })

      if (!response.ok) {
        throw new Error("Failed to send exchange request")
      }

      setIsDialogOpen(false)
      alert("Exchange request sent successfully!")
      setExchangeMessage("")
    } catch (error) {
      console.error("Error sending exchange request:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
        <p className="ml-4 text-gray-600">Loading object details...</p>
      </div>
    )
  }

  if (!object) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Object Not Found</h1>
        <p className="text-gray-600 mb-8">The object you're looking for doesn't exist or has been removed.</p>
        <Link href="/objects">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Objects
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/objects" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Objects
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="rounded-lg overflow-hidden shadow-md">
            <img src={object.image} alt={object.name} className="w-full h-auto" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{object.name}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{object.category}</span>
          </div>

          <p className="text-gray-700 mb-6 whitespace-pre-line">{object.description}</p>

          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Details</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span>Owner: {object.owner}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Location: {object.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Listed on: {object.createdAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="mr-2 h-4 w-4" />
                Request Exchange
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Exchange for {object.name}</DialogTitle>
                <DialogDescription>
                  Send a message to the owner explaining what you'd like to exchange for this item.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <Textarea
                  placeholder="I'm interested in your item and would like to exchange it for..."
                  value={exchangeMessage}
                  onChange={(e) => setExchangeMessage(e.target.value)}
                  rows={5}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  onClick={handleExchangeRequest}
                  disabled={!exchangeMessage.trim() || isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? "Sending..." : "Send Request"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
