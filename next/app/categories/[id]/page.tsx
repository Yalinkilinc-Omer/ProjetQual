"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"

interface CategoryDetailPageProps {
    params: { id: string }
}

export default function CategoryDetailPage({ params }: CategoryDetailPageProps) {
    const { id } = params
    const [category, setCategory] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            if (!id) return
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}/objects`)
                if (!response.ok) {
                    throw new Error("Failed to fetch category details")
                }
                const data = await response.json()
                console.log(data)
                setCategory(data)
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
            <div className="flex justify-center items-center h-screen">
                <RefreshCw className="animate-spin h-8 w-8 text-blue-600" />
                <p className="ml-4 text-gray-600">Loading category...</p>
            </div>
        )
    }

    if (!category) {
        return <p className="text-center text-red-600">Category not found.</p>
    }

    // Vérification si category.objects existe et est un tableau
    const objects = category.objects || []

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">{category.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {objects.length === 0 ? (
                    <p className="text-center text-gray-600">No objects found in this category.</p>
                ) : (
                    objects.map((obj: any) => (
                        <Card key={obj.id} className="hover:shadow-lg transition duration-300">
                            <CardContent className="p-4">
                                <h3 className="text-lg font-semibold">{obj.name}</h3>
                                <p className="text-gray-600 mt-2">{obj.description}</p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
