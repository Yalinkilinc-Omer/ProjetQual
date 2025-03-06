"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { CategoryIcon } from "@/components/category-icon"
import { Button } from "@/components/ui/button"

// Function to generate a color based on category name
function getCategoryColor(name: string): string {
    const colors = [
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-red-500",
        "bg-indigo-500",
        "bg-pink-500",
        "bg-orange-500",
        "bg-teal-500",
        "bg-cyan-500",
        "bg-lime-500",
        "bg-gray-500",
    ]

    // Use the sum of character codes to determine the color
    const sum = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[sum % colors.length]
}

interface CategoryDetailPageProps {
    params: { id: string }
}

export default function CategoryDetailPage({ params }: CategoryDetailPageProps) {
    const { id } = params
    const [categoryObjects, setCategoryObjects] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryName, setCategoryName] = useState<string>("")

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            if (!id) return
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}/objects`)
                if (!response.ok) {
                    throw new Error("Failed to fetch category details")
                }
                const data = await response.json()
                setCategoryObjects(data)

                // Set category name if objects exist
                if (data.length > 0 && data[0].category) {
                    setCategoryName(data[0].category.name)
                }
            } catch (error) {
                console.error("Error fetching category details:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCategoryDetails()
    }, [id])

    if (isLoading) {
        return (
            <div className="container mx-auto flex justify-center items-center min-h-[60vh]">
                <div className="flex flex-col items-center">
                    <RefreshCw className="animate-spin h-8 w-8 text-blue-600" />
                    <p className="mt-4 text-gray-600">Loading category...</p>
                </div>
            </div>
        )
    }

    if (!categoryObjects || categoryObjects.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Link href="/categories" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Categories
                </Link>

                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
                    <p className="text-gray-600 mb-6">This category doesn't exist or has no objects.</p>
                    <Button asChild>
                        <Link href="/categories">Browse All Categories</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const categoryColor = getCategoryColor(categoryName)

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/categories" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Categories
            </Link>

            <div className="flex items-center mb-8">
                <div className={`${categoryColor} w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                    <CategoryIcon category={categoryName} className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">{categoryName}</h1>
                    <p className="text-gray-600">
                        {categoryObjects.length} {categoryObjects.length === 1 ? "item" : "items"} available for exchange
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryObjects.map((object: any) => (
                    <Link href={`/objects/${object.id}`} key={object.id}>
                        <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-0">
                                {object.image ? (
                                    <div className="aspect-video w-full overflow-hidden">
                                        <img
                                            src={object.image || "/placeholder.svg"}
                                            alt={object.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-video w-full bg-gray-200 flex items-center justify-center">
                                        <CategoryIcon category={categoryName} className="h-12 w-12 text-gray-400" />
                                    </div>
                                )}
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-1">{object.name}</h3>
                                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{object.description}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <span
                                            className={`px-2 py-1 ${object.availability ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full text-xs`}
                                        >
                                            {object.availability ? "Available" : "Not Available"}
                                        </span>
                                        <span className="text-gray-600 text-sm">{object.user.username}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
