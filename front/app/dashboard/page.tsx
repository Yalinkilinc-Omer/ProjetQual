"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, RefreshCw, Clock, CheckCircle, XCircle } from "lucide-react"

// Mock data - this would come from your API
const mockMyObjects = [
  { id: 1, name: "Vintage Camera", category: "Electronics", status: "Available", createdAt: "2023-05-15" },
  { id: 2, name: "Mountain Bike", category: "Sports", status: "Pending Exchange", createdAt: "2023-06-20" },
  { id: 3, name: "Coffee Table Book", category: "Books", status: "Available", createdAt: "2023-07-10" },
]

const mockExchangeRequests = [
  {
    id: 101,
    objectName: "Vintage Camera",
    requestedBy: "Alice",
    requestDate: "2023-08-05",
    status: "Pending",
  },
  {
    id: 102,
    objectName: "Mountain Bike",
    requestedBy: "Bob",
    requestDate: "2023-08-10",
    status: "Accepted",
  },
]

const mockMyRequests = [
  {
    id: 201,
    objectName: "Acoustic Guitar",
    owner: "Charlie",
    requestDate: "2023-08-01",
    status: "Pending",
  },
  {
    id: 202,
    objectName: "Cooking Blender",
    owner: "Diana",
    requestDate: "2023-07-25",
    status: "Rejected",
  },
  {
    id: 203,
    objectName: "Yoga Mat",
    owner: "Eva",
    requestDate: "2023-08-12",
    status: "Accepted",
  },
]

export default function Dashboard() {
  const [myObjects, setMyObjects] = useState(mockMyObjects)
  const [exchangeRequests, setExchangeRequests] = useState(mockExchangeRequests)
  const [myRequests, setMyRequests] = useState(mockMyRequests)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleAcceptRequest = (requestId: number) => {
    setExchangeRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: "Accepted" } : req)))
  }

  const handleRejectRequest = (requestId: number) => {
    setExchangeRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: "Rejected" } : req)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Available</span>
      case "Pending Exchange":
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending Exchange</span>
      case "Pending":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Pending</span>
      case "Accepted":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Accepted</span>
      case "Rejected":
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Rejected</span>
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>
    }
  }

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

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
                {myObjects.map((object) => (
                  <Card key={object.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-lg">{object.name}</h3>
                          <p className="text-gray-600 text-sm">Category: {object.category}</p>
                          <p className="text-gray-600 text-sm">Added on: {object.createdAt}</p>
                          <div className="mt-2">{getStatusBadge(object.status)}</div>
                        </div>
                        <div className="flex space-x-2">
                          <Link href={`/objects/${object.id}/edit`}>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </Link>
                          <Link href={`/objects/${object.id}`}>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="exchange-requests">
          <div className="grid gap-6">
            <h2 className="text-xl font-semibold">Exchange Requests ({exchangeRequests.length})</h2>

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
                          <h3 className="font-semibold text-lg">{request.objectName}</h3>
                          <p className="text-gray-600 text-sm">Requested by: {request.requestedBy}</p>
                          <p className="text-gray-600 text-sm">Date: {request.requestDate}</p>
                          <div className="mt-2">{getStatusBadge(request.status)}</div>
                        </div>
                        {request.status === "Pending" && (
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleAcceptRequest(request.id)}
                              className="bg-green-600 hover:bg-green-700"
                              size="sm"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                            <Button
                              onClick={() => handleRejectRequest(request.id)}
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              size="sm"
                            >
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
                          <h3 className="font-semibold text-lg">{request.objectName}</h3>
                          <p className="text-gray-600 text-sm">Owner: {request.owner}</p>
                          <p className="text-gray-600 text-sm">Requested on: {request.requestDate}</p>
                          <div className="mt-2">{getStatusBadge(request.status)}</div>
                        </div>
                        <Link href={`/objects/${request.id}`}>
                          <Button variant="outline" size="sm">
                            View Object
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
  )
}

