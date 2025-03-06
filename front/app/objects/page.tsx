"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, RefreshCw } from "lucide-react"

const categories = ["All Categories", "Electronics", "Sports", "Books", "Music", "Kitchen", "Furniture", "Clothing", "Other"]

export default function ObjectsPage() {
  const [objects, setObjects] = useState([])
  const [filteredObjects, setFilteredObjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
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
          category: obj.category?.name ?? "No category",
        }))
        setObjects(formattedData)
        setFilteredObjects(formattedData)
      } catch (error) {
        console.error("Error fetching objects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchObjects()
  }, [])

  useEffect(() => {
    const result = objects.filter((obj) =>
      (selectedCategory === "All Categories" || obj.category === selectedCategory) &&
      (obj.name.toLowerCase().includes(searchTerm.toLowerCase()) || obj.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setFilteredObjects(result)
  }, [searchTerm, selectedCategory, objects])

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All Categories")
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RefreshCw className="animate-spin h-8 w-8 text-blue-600" />
        <p className="ml-4 text-gray-600">Loading objects...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Browse Objects</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search objects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="w-full md:w-64">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredObjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No objects found matching your criteria.</p>
          <Button onClick={resetFilters}>Clear Filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredObjects.map((object) => (
            <Link href={`/objects/${object.id}`} key={object.id}>
              <Card className="hover:shadow-lg transition duration-300">
                <CardContent className="p-0">
                  <div className="aspect-video overflow-hidden">
                    <h4 className="text-center text-2xl font-semibold bg-blue-100 text-blue-800 py-2">
                      {object.name.charAt(0).toUpperCase()}
                    </h4>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{object.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{object.description}</p>
                    <div className="flex justify-between items-center mt-4 text-sm">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{object.category}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
