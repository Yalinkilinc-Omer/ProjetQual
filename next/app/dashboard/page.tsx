"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, RefreshCw, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import ProtectedRoute from "@/components/protected-route"

export default function Dashboard() {
  const [myObjects, setMyObjects] = useState<any[]>([])
  const [exchangeRequests, setExchangeRequests] = useState<any[]>([])
  const [myRequests, setMyRequests] = useState<any[]>([])
  const [isLoadingObjects, setIsLoadingObjects] = useState(true)
  const [isLoadingRequests, setIsLoadingRequests] = useState(true)
  const [isLoadingMyRequests, setIsLoadingMyRequests] = useState(true)
  const [objectsError, setObjectsError] = useState<string | null>(null)
  const [requestsError, setRequestsError] = useState<string | null>(null)
  const [myRequestsError, setMyRequestsError] = useState<string | null>(null)
  const { user } = useAuth()
  useEffect(() => {
    const fetchObjects = async (retryCount = 0) => {
      if (!user) {
        return
      }

      try {
        setIsLoadingObjects(true)
        setObjectsError(null)

        // Check if API base URL is defined
        if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
          throw new Error("API base URL is not defined. Please check your environment variables.")
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/object/user/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any auth headers if needed
          },
          signal: AbortSignal.timeout(10000), // 10 second timeout
        })

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`)
        }

        const data = await response.json()
        setMyObjects(data)
      } catch (error: any) {
        console.error("Error fetching objects:", error)
      } finally {
        setIsLoadingObjects(false)
      }
    }

    fetchObjects()
  }, [user])

  // Fetch exchange requests (requests received)
  // Fetch exchange requests (requests received)
  useEffect(() => {
    const fetchExchangeRequests = async (retryCount = 0) => {
      if (!user) return

      try {
        setIsLoadingRequests(true)
        setRequestsError(null)


        // ici je dois montrer les demandes d'échange reçues tous ce qui 
        // est en dessous n'est pas bon pour l'instant 
        if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
          throw new Error("API base URL is not defined. Please check your environment variables.")
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/exchanges/user/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`)
        }

        const data = await response.json()
        setExchangeRequests(data) // Mettre à jour le state avec les données reçues
      } catch (error: any) {
        console.error("Error fetching exchange requests:", error)
        setRequestsError(error.message)
      } finally {
        setIsLoadingRequests(false)
      }
    }

    fetchExchangeRequests()
  }, [user])


  // Fetch my requests (requests sent)
  useEffect(() => {
    const fetchMyRequests = async (retryCount = 0) => {
      if (!user) {
        return
      }

      try {
        setIsLoadingMyRequests(true)
        setMyRequestsError(null)

        // Check if API base URL is defined
        if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
          throw new Error("API base URL is not defined. Please check your environment variables.")
        }

        // In a real app, you would make an API call:
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/exchanges/user/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any auth headers if needed
          },
          signal: AbortSignal.timeout(10000), // 10 second timeout
        })

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`)
        }

        const data = await response.json()
        setMyRequests(data)


      } catch (error: any) {
        console.error("Error fetching my requests:", error)
      } finally {
        setIsLoadingMyRequests(false)
      }
    }

    fetchMyRequests()
  }, [user])

  const handleAcceptRequest = async (requestId: number) => {
    try {
      // In a real app, you would make an API call:
      // await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/exchanges/${requestId}/accept`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // Add any auth headers if needed
      //   }
      // });

      // For now, we'll just update the state
      setExchangeRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: "ACCEPTED" } : req)))
    } catch (error) {
      console.error("Error accepting request:", error)
    }
  }

  const handleRejectRequest = async (requestId: number) => {
    try {
      // In a real app, you would make an API call:
      // await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/exchanges/${requestId}/reject`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // Add any auth headers if needed
      //   }
      // });

      // For now, we'll just update the state
      setExchangeRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: "REJECTED" } : req)))
    } catch (error) {
      console.error("Error rejecting request:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    const normalizedStatus = status.toUpperCase()
    switch (normalizedStatus) {
      case "AVAILABLE":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Available</span>
      case "PENDING_EXCHANGE":
      case "PENDING":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Pending</span>
      case "ACCEPTED":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Accepted</span>
      case "REJECTED":
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Rejected</span>
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>
    }
  }

  const isLoading = isLoadingObjects || isLoadingRequests || isLoadingMyRequests

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
        {user && <p className="text-gray-600 mb-8">Welcome back, {user.username}!</p>}

        <Tabs defaultValue="my-objects" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="my-objects" className="flex items-center">
              <Package className="mr-2 h-4 w-4" />
              My Objects
            </TabsTrigger>
            <TabsTrigger value="exchange-requests" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Exchange Requests
            </TabsTrigger>
            <TabsTrigger value="my-requests" className="flex items-center">
              <RefreshCw className="mr-2 h-4 w-4" />
              My Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-objects">
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">My Objects ({myObjects.length})</h2>
                <Link href="/objects/add">
                  <Button className="bg-blue-600 hover:bg-blue-700">Add New Object</Button>
                </Link>
              </div>

              {objectsError && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-700">{objectsError}</p>
                  </div>
                </div>
              )}

              {myObjects.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Package className="h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-gray-600 text-center mb-4">You haven't added any objects yet.</p>
                    <Link href="/objects/add">
                      <Button className="bg-blue-600 hover:bg-blue-700">Add Your First Object</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {myObjects.map((object) => {
                    const { id, name, description, availability, category, user: objectUser } = object

                    return (
                      <Card key={id}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold text-lg">{name}</h3>
                              <p className="text-gray-600 text-sm">{description}</p>
                              <p className="text-gray-600 text-sm">Category: {category?.name || "No category"}</p>
                              <div className="mt-2">{getStatusBadge(availability ? "AVAILABLE" : "NOT_AVAILABLE")}</div>
                            </div>
                            <div className="flex space-x-2">
                              <Link href={`/objects/${id}/edit`}>
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                              </Link>
                              <Link href={`/objects/${id}`}>
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="exchange-requests">
            <div className="grid gap-6">
              <h2 className="text-xl font-semibold">Exchange Requests ({exchangeRequests.length})</h2>

              {requestsError && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-700">{requestsError}</p>

                  </div>
                </div>
              )}

              {exchangeRequests.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Clock className="h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-gray-600 text-center">You don't have any exchange requests yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {exchangeRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div>
                          </div>
                          {request.status === "PENDING" && (
                            <div className="flex space-x-2">
                              <Button onClick={() => handleAcceptRequest(request.id)} className="bg-green-600 hover:bg-green-700" size="sm">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                              <Button onClick={() => handleRejectRequest(request.id)} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50" size="sm">
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="my-requests">
            <div className="grid gap-6">
              <h2 className="text-xl font-semibold">My Requests ({myRequests.length})</h2>

              {myRequestsError && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-700">{myRequestsError}</p>
                  </div>
                </div>
              )}

              {myRequests.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <RefreshCw className="h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-gray-600 text-center">You haven't made any exchange requests yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {myRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-lg">Exchange Request</h3>
                            <p className="text-gray-600 text-sm">Proposed Object: {request.proposedObject.name}</p>
                            <p className="text-gray-600 text-sm">Requested Object: {request.requestedObject.name}</p>
                            <p className="text-gray-600 text-sm">Status: {request.status}</p>
                            <Link href={`/profile/${request.requestedObject.user.id}`}>
                              <p className="text-blue-600 text-sm">Requested to: {request.requestedObject.user.username}</p>
                            </Link>
                            <p className="text-gray-600 text-sm">Proposed by: {request.proposedObject.user.username}</p>

                            <div className="mt-2">{getStatusBadge(request.status)}</div>
                          </div>
                          <Link href={`/objects/${request.proposedObject.id}`}>
                            <Button variant="outline" size="sm">
                              View proposed object
                            </Button>
                          </Link>
                          <Link href={`/objects/${request.requestedObject.id}`}>
                            <Button variant="outline" size="sm">
                              View requested object
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}