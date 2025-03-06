"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, ArrowLeft, Upload, RefreshCw } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import ProtectedRoute from "@/components/protected-route"

type Category = {
    id: string
    name: string
}

type ObjectData = {
    id: string | number
    name: string
    description: string
    category?: {
        id: string
        name: string
    }
    categoryId?: string
    availability: boolean
    user?: {
        id: string
        username: string
    }
    userId?: string
}

export default function EditObjectPage() {
    const router = useRouter()
    const params = useParams()
    const { user } = useAuth()
    const [formData, setFormData] = useState<ObjectData>({
        id: "",
        name: "",
        description: "",
        categoryId: "",
        availability: true,
    })
    const [originalObject, setOriginalObject] = useState<ObjectData | null>(null)
    const [image, setImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoadingCategories, setIsLoadingCategories] = useState(true)
    const [objectError, setObjectError] = useState<string | null>(null)
    const [categoriesError, setCategoriesError] = useState<string | null>(null)

    // Fetch object data
    useEffect(() => {
        const fetchObject = async () => {
            if (!params.id) return

            setIsLoading(true)
            setObjectError(null)

            try {
                // Check if API base URL is defined
                if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
                    throw new Error("API base URL is not defined. Please check your environment variables.")
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/object/${params.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    signal: AbortSignal.timeout(10000), // 10 second timeout
                })

                if (!response.ok) {
                    throw new Error(`Failed to fetch object: ${response.status} ${response.statusText}`)
                }

                const data = await response.json()
                setOriginalObject(data)

                // Set form data from fetched object
                setFormData({
                    id: data.id,
                    name: data.name || "",
                    description: data.description || "",
                    categoryId: data.category?.id || data.categoryId || "",
                    availability: data.availability === undefined ? true : data.availability,
                })

                // Set preview image if available
                if (data.image) {
                    setPreviewUrl(data.image)
                }
            } catch (error: any) {
                console.error("Error fetching object:", error)
                setObjectError(`Failed to load object: ${error.message}`)
            } finally {
                setIsLoading(false)
            }
        }

        fetchObject()
    }, [params.id])

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoadingCategories(true)
            setCategoriesError(null)

            try {
                // Check if API base URL is defined
                if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
                    throw new Error("API base URL is not defined. Please check your environment variables.")
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    signal: AbortSignal.timeout(10000), // 10 second timeout
                })

                if (!response.ok) {
                    throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`)
                }

                const data = await response.json()
                setCategories(data)
            } catch (error: any) {
                console.error("Error fetching categories:", error)
                setCategoriesError(`Failed to load categories: ${error.message}`)
            } finally {
                setIsLoadingCategories(false)
            }
        }

        fetchCategories()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    const handleCategoryChange = (value: string) => {
        setFormData((prev) => ({ ...prev, categoryId: value }))
        if (errors.categoryId) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors.categoryId
                return newErrors
            })
        }
    }

    const handleAvailabilityChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, availability: checked }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImage(file)
            setPreviewUrl(URL.createObjectURL(file))

            if (errors.image) {
                setErrors((prev) => {
                    const newErrors = { ...prev }
                    delete newErrors.image
                    return newErrors
                })
            }
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required"
        }

        if (!formData.categoryId) {
            newErrors.categoryId = "Category is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        if (!user) {
            setErrors({ form: "You must be logged in to edit an object" })
            return
        }

        // Check if the user is the owner of the object
        if (originalObject?.user?.id && originalObject.user.id !== user.id) {
            setErrors({ form: "You can only edit your own objects" })
            return
        }

        setIsSubmitting(true)

        try {
            // Check if API base URL is defined
            if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
                throw new Error("API base URL is not defined. Please check your environment variables.")
            }

            // Create object data for update
            const objectData = {
                name: formData.name,
                description: formData.description,
                categoryId: formData.categoryId,
                availability: formData.availability,
                userId: originalObject?.user?.id || originalObject?.userId || user.id,
            }

            // Send the updated object data to the API
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/object/${formData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    // Add any auth headers if needed
                },
                body: JSON.stringify(objectData),
            })

            if (!response.ok) {
                throw new Error(`Failed to update object: ${response.status} ${response.statusText}`)
            }

            const data = await response.json()
            console.log("Object updated successfully:", data)

            // Handle image upload if needed (this would be a separate API call)
            // if (image) {
            //   const formData = new FormData()
            //   formData.append('image', image)
            //
            //   const imageResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/object/${data.id}/image`, {
            //     method: 'POST',
            //     body: formData
            //   })
            //
            //   if (!imageResponse.ok) {
            //     console.error("Failed to upload image:", imageResponse.status, imageResponse.statusText)
            //   }
            // }

            // Redirect to object detail page after successful update
            router.push(`/objects/${formData.id}?updated=true`)
        } catch (error: any) {
            console.error("Error updating object:", error)
            setErrors({ form: `Failed to update object: ${error.message}` })
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading || isLoadingCategories) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (objectError) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>

                <Card className="max-w-2xl mx-auto">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
                            <h2 className="text-xl font-semibold mb-2">Error Loading Object</h2>
                            <p className="text-gray-600 mb-6">{objectError}</p>
                            <Button asChild>
                                <Link href="/dashboard">Return to Dashboard</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <ProtectedRoute>
            <div className="container mx-auto px-4 py-8">
                <Link
                    href={`/objects/${params.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Object Details
                </Link>

                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">Edit Object</CardTitle>
                        <CardDescription>Update the details of your object</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {categoriesError && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
                                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                <p className="text-red-700">{categoriesError}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Object Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="e.g., Vintage Camera"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={errors.name ? "border-red-500" : ""}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm flex items-center mt-1">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe your object, its condition, and any other relevant details"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className={errors.description ? "border-red-500" : ""}
                                    rows={4}
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm flex items-center mt-1">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select value={formData.categoryId} onValueChange={handleCategoryChange}>
                                    <SelectTrigger className={errors.categoryId ? "border-red-500" : ""}>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.categoryId && (
                                    <p className="text-red-500 text-sm flex items-center mt-1">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        {errors.categoryId}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="availability">Availability</Label>
                                    <Switch
                                        id="availability"
                                        checked={formData.availability}
                                        onCheckedChange={handleAvailabilityChange}
                                    />
                                </div>
                                <p className="text-sm text-gray-500">
                                    {formData.availability
                                        ? "This object is available for exchange"
                                        : "This object is not available for exchange"}
                                </p>
                            </div>

                            {errors.form && (
                                <div className="bg-red-50 p-3 rounded-md border border-red-200">
                                    <p className="text-red-500 text-sm flex items-center">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        {errors.form}
                                    </p>
                                </div>
                            )}
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => router.push(`/objects/${params.id}`)} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                            {isSubmitting ? "Updating Object..." : "Update Object"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </ProtectedRoute>
    )
}

