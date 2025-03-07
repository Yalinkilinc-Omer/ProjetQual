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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RefreshCw, User, ArrowLeft, MessageCircle, AlertCircle } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function ObjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [object, setObject] = useState<any>(null)
  const [userObjects, setUserObjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingUserObjects, setIsLoadingUserObjects] = useState(false)
  const [exchangeMessage, setExchangeMessage] = useState("")
  const [selectedObjectId, setSelectedObjectId] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch the object details
  useEffect(() => {
    const fetchObject = async () => {
      setIsLoading(true)
      setError(null)
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
          owner: data.user?.username ?? "Unknown owner",
          ownerId: data.user?.id,
          availability: data.availability ?? false,
          image: data.image || "/placeholder.svg?height=400&width=600",
        })
      } catch (error: any) {
        console.error("Error fetching object:", error)
        setError(`Failed to load object: ${error.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchObject()
    }
  }, [params.id, router])

  // Fetch user's objects when dialog opens
  const fetchUserObjects = async () => {
    if (!user) return

    setIsLoadingUserObjects(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/object/user/${user.id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch your objects")
      }
      const data = await response.json()

      // Filter out the current object and unavailable objects
      const availableObjects = data.filter(
        (obj: any) => obj.id !== Number.parseInt(params.id as string) && obj.availability === true,
      )

      setUserObjects(availableObjects)

      // Auto-select the first object if available
      if (availableObjects.length > 0) {
        setSelectedObjectId(availableObjects[0].id.toString())
      }
    } catch (error: any) {
      console.error("Error fetching user objects:", error)
      setError(`Failed to load your objects: ${error.message}`)
    } finally {
      setIsLoadingUserObjects(false)
    }
  }

  const handleDialogOpen = (open: boolean) => {
    setIsDialogOpen(open)
    if (open) {
      fetchUserObjects()
    }
  }

  const handleExchangeRequest = async () => {
    if (!user || !selectedObjectId) return

    setIsSubmitting(true)
    setError(null)

    try {
      const exchangeData = {
        proposedObject: {
          id: Number.parseInt(selectedObjectId),
        },
        requestedObject: {
          id: Number.parseInt(params.id as string),
        },
        status: "PENDING",
        userId: user.id,
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/exchanges`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exchangeData),
      })

      if (!response.ok) {
        throw new Error("Failed to send exchange request")
      }

      setIsDialogOpen(false)
      alert("Exchange request sent successfully!")
      setExchangeMessage("")
      setSelectedObjectId("")
    } catch (error: any) {
      console.error("Error sending exchange request:", error)
      setError(`Failed to send exchange request: ${error.message}`)
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

  // Check if this is the user's own object
  const isOwnObject = user && user.id === object.ownerId

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/objects" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Objects
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="rounded-lg overflow-hidden shadow-md">
            <img src={object.image || "/placeholder.svg"} alt={object.name} className="w-full h-auto" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{object.name}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{object.category}</span>
          </div>

          <p className="text-gray-700 mb-6 whitespace-pre-line">{object.description}</p>

          {/* Availability status */}
          <p className={`text-lg font-semibold mb-4 ${object.availability ? "text-green-600" : "text-red-600"}`}>
            {object.availability ? "Available for Exchange" : "Not Available for Exchange"}
          </p>

          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Details</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span>Owner: {object.owner}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {isOwnObject ? (
            <div className="flex space-x-4">
              <Link href={`/objects/${object.id}/edit`} className="flex-1">
                <Button className="w-full">Edit Object</Button>
              </Link>
              <Link href="/dashboard" className="flex-1">
                <Button variant="outline" className="w-full">
                  View in Dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <Dialog open={isDialogOpen} onOpenChange={handleDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={!object.availability}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Request Exchange
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request Exchange for {object.name}</DialogTitle>
                  <DialogDescription>Select one of your objects to propose for this exchange.</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  {isLoadingUserObjects ? (
                    <div className="flex justify-center py-4">
                      <RefreshCw className="h-6 w-6 text-blue-600 animate-spin" />
                    </div>
                  ) : userObjects.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-600 mb-2">You don't have any available objects to exchange.</p>
                      <Link href="/objects/add" className="text-blue-600 hover:underline">
                        Add an object first
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label htmlFor="object-select" className="block text-sm font-medium">
                          Select your object to exchange
                        </label>
                        <Select value={selectedObjectId} onValueChange={setSelectedObjectId}>
                          <SelectTrigger id="object-select">
                            <SelectValue placeholder="Select an object" />
                          </SelectTrigger>
                          <SelectContent>
                            {userObjects.map((obj) => (
                              <SelectItem key={obj.id} value={obj.id.toString()}>
                                {obj.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium">
                          Message (optional)
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Add a message to the owner..."
                          value={exchangeMessage}
                          onChange={(e) => setExchangeMessage(e.target.value)}
                          rows={3}
                        />
                      </div>
                    </>
                  )}

                  {error && (
                    <div className="bg-red-50 p-3 rounded-md border border-red-200">
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {error}
                      </p>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleExchangeRequest}
                    disabled={!selectedObjectId || isSubmitting || userObjects.length === 0}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? "Sending..." : "Send Exchange Request"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  )
}

