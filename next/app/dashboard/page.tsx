"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, RefreshCw } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function Dashboard() {
  const [myObjects, setMyObjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchObjects = async () => {
      if (!user) {
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/object/user/${user.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch objects")
        }
        const data = await response.json()
        console.log(data)
        setMyObjects(data)
      } catch (error) {
        console.error("Error fetching objects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchObjects()
  }, [user])

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
              {myObjects.map((object) => {
                const { id, name, description, availability, category, user } = object

                return (
                  <Card key={id}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold">{name}</h3>
                      <p className="text-sm text-gray-600">{description}</p>
                      <p className="text-sm text-gray-600">Category: {category?.name || 'No category'}</p>
                      <p className={`text-sm mt-2 ${availability ? "text-green-600" : "text-red-600"}`}>
                        {availability ? 'Available' : 'Not Available'}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">Owner: {user?.username || 'Unknown'}</p>
                      <Link href={`/objects/${id}`}>
                        <Button className="mt-4 bg-blue-600 hover:bg-blue-700">View Object</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
