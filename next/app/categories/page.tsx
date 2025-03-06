"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { RefreshCw } from 'lucide-react'
import { CategoryIcon } from "@/components/category-icon"

// Function to generate a color based on category name
function getCategoryColor(name: string): string {
  const colors = [
    "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500",
    "bg-red-500", "bg-indigo-500", "bg-pink-500", "bg-orange-500",
    "bg-teal-500", "bg-cyan-500", "bg-lime-500", "bg-gray-500"
  ];

  // Use the sum of character codes to determine the color
  const sum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[sum % colors.length];
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`)
        if (!response.ok) {
          throw new Error("Failed to fetch categories")
        }
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <RefreshCw className="animate-spin h-8 w-8 text-blue-600" />
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Categories</h1>
        <p className="text-gray-600">
          Explore objects by category to find exactly what you're looking for
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category: any) => {
          const categoryColor = getCategoryColor(category.name);
          return (
            <Link
              href={`/categories/${category.id}`}
              key={category.id}
              className="transition-transform hover:scale-105"
            >
              <Card className="h-full overflow-hidden border-2 hover:border-blue-500 hover:shadow-lg">
                <CardContent className="p-0">
                  <div className={`${categoryColor} h-24 flex items-center justify-center`}>
                    <CategoryIcon
                      category={category.name}
                      className="h-12 w-12 text-white"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{category.description}</p>
                    <div className="flex justify-end items-center mt-4">
                      <span className="text-blue-600 text-sm font-medium">
                        Browse
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  )
}
