"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, RefreshCw } from "lucide-react"

// Mock data - this would come from your API
const mockObjects = [
  {
    id: 1,
    name: "Vintage Camera",
    description: "A beautiful vintage film camera in excellent condition.",
    category: "Electronics",
    owner: "John Doe",
    location: "Paris",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Mountain Bike",
    description: "Adult mountain bike, barely used, perfect for trails.",
    category: "Sports",
    owner: "Alice Smith",
    location: "Lyon",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Coffee Table Book",
    description: "Photography book about national parks.",
    category: "Books",
    owner: "Bob Johnson",
    location: "Marseille",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Acoustic Guitar",
    description: "Beginner acoustic guitar with case and accessories.",
    category: "Music",
    owner: "Charlie Brown",
    location: "Toulouse",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "Cooking Blender",
    description: "High-powered blender, perfect for smoothies and soups.",
    category: "Kitchen",
    owner: "Diana Prince",
    location: "Nice",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "Yoga Mat",
    description: "Thick yoga mat, non-slip surface, barely used.",
    category: "Sports",
    owner: "Eva Green",
    location: "Bordeaux",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const categories = [
  "All Categories",
  "Electronics",
  "Sports",
  "Books",
  "Music",
  "Kitchen",
  "Furniture",
  "Clothing",
  "Other",
]

export default function ObjectsPage() {
  const [objects, setObjects] = useState(mockObjects)
  const [filteredObjects, setFilteredObjects] = useState(mockObjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let result = objects

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (obj) =>
          obj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          obj.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "All Categories") {
      result = result.filter((obj) => obj.category === selectedCategory)
    }

    setFilteredObjects(result)
  }, [searchTerm, selectedCategory, objects])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-600">Loading objects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Objects</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search objects..." value={searchTerm} onChange={handleSearch} className="pl-10" />
        </div>

        <div className="w-full md:w-64">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </div>
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
          <Button
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("All Categories")
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredObjects.map((object) => (
            <Link href={`/objects/${object.id}`} key={object.id}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={object.image || "/placeholder.svg"}
                      alt={object.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{object.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{object.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {object.category}
                      </span>
                      <span className="text-gray-600 text-sm">{object.location}</span>
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

