"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, RefreshCw } from "lucide-react"

export default function Dashboard() {
  const [myObjects, setMyObjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/object`)
        if (!response.ok) {
          throw new Error("Failed to fetch objects")
        }
        const data = await response.json()
        const formattedData = data.map((obj: any) => ({
          id: obj.id,
          name: obj.name ?? "Unnamed object",
          description: obj.description ?? "No description",
          availability: obj.availability ? "Available" : "Unavailable",
          category: obj.category?.name ?? "No category",
        }))
        setMyObjects(formattedData)
      } catch (error) {
        console.error("Error fetching objects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchObjects()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
        <p className="ml-4 text-gray-600">Loading your objects...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Objects</h1>

      <Tabs defaultValue="my-objects" className="w-full">
        <TabsList className="grid w-full grid-cols-1 mb-8">
          <TabsTrigger value="my-objects" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            My Objects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-objects">
          {myObjects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Package className="h-16 w-16 text-gray-400 mb-4" />
                <p className="text-gray-600">No objects found.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {myObjects.map((object) => (
                <Card key={object.id}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">{object.name}</h3>
                    <p className="text-sm text-gray-600">{object.description}</p>
                    <p className="text-sm text-gray-600">Category: {object.category}</p>
                    <p className={`text-sm mt-2 ${object.availability === "Available" ? "text-green-600" : "text-red-600"}`}>
                      {object.availability}
                    </p>
                    <Link href={`/objects/${object.id}`}>
                      <Button className="mt-4 bg-blue-600 hover:bg-blue-700">View Object</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
