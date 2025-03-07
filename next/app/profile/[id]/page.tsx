"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, User, Mail, Calendar, ArrowLeft, Package, Clock, Settings, Edit } from 'lucide-react'
import { useAuth } from "@/context/auth-context"
import ProtectedRoute from "@/components/protected-route"

export default function ProfilePage() {
    const params = useParams()
    const router = useRouter()
    const { user: currentUser } = useAuth()
    const [user, setUser] = useState<any>(null)
    const [userObjects, setUserObjects] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingObjects, setIsLoadingObjects] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Check if viewing own profile
    const isOwnProfile = currentUser && currentUser.id === params.id

    // Fetch user profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!params.id) return

            setIsLoading(true)
            setError(null)

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${params.id}`)

                if (!response.ok) {
                    throw new Error(`Failed to fetch user profile: ${response.status}`)
                }

                const data = await response.json()
                setUser(data)
            } catch (error: any) {
                console.error("Error fetching user profile:", error)
                setError(`Failed to load user profile: ${error.message}`)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserProfile()
    }, [params.id])

    // Fetch user's objects
    useEffect(() => {
        const fetchUserObjects = async () => {
            if (!params.id) return

            setIsLoadingObjects(true)

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/object/user/${params.id}`)

                if (!response.ok) {
                    throw new Error(`Failed to fetch user objects: ${response.status}`)
                }

                const data = await response.json()
                setUserObjects(data)
            } catch (error) {
                console.error("Error fetching user objects:", error)
                // We don't set the main error here to still show the profile if objects fail to load
                setUserObjects([])
            } finally {
                setIsLoadingObjects(false)
            }
        }

        fetchUserObjects()
    }, [params.id])

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        )
    }

    if (error || !user) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
                <p className="text-gray-600 mb-8">{error || "The user profile you're looking for doesn't exist."}</p>
                <Link href="/">
                    <Button>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <ProtectedRoute>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                                <User className="h-8 w-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">{user.username}</h1>
                                <p className="text-gray-600">Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
                            </div>
                        </div>

                        {isOwnProfile && (
                            <div className="flex space-x-3">
                                <Link href="/profile/edit">
                                    <Button variant="outline" className="flex items-center">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Profile
                                    </Button>
                                </Link>
                                <Link href="/settings">
                                    <Button variant="outline" className="flex items-center">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center">
                                    <User className="h-5 w-5 text-gray-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Username</p>
                                        <p className="font-medium">{user.username}</p>
                                    </div>
                                </div>

                                {user.email && (
                                    <div className="flex items-center">
                                        <Mail className="h-5 w-5 text-gray-500 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{user.email}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center">
                                    <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Member Since</p>
                                        <p className="font-medium">{new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Package className="h-5 w-5 text-gray-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Objects</p>
                                        <p className="font-medium">{userObjects.length}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-2">
                        <Tabs defaultValue="objects">
                            <TabsList className="grid w-full grid-cols-2 mb-8">
                                <TabsTrigger value="objects" className="flex items-center">
                                    <Package className="mr-2 h-4 w-4" />
                                    Objects
                                </TabsTrigger>
                                <TabsTrigger value="activity" className="flex items-center">
                                    <Clock className="mr-2 h-4 w-4" />
                                    Recent Activity
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="objects">
                                {isLoadingObjects ? (
                                    <div className="flex justify-center py-8">
                                        <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
                                    </div>
                                ) : userObjects.length === 0 ? (
                                    <Card>
                                        <CardContent className="flex flex-col items-center justify-center py-10">
                                            <Package className="h-16 w-16 text-gray-400 mb-4" />
                                            <p className="text-gray-600 text-center mb-4">
                                                {isOwnProfile
                                                    ? "You haven't added any objects yet."
                                                    : `${user.username} hasn't added any objects yet.`}
                                            </p>
                                            {isOwnProfile && (
                                                <Link href="/objects/add">
                                                    <Button className="bg-blue-600 hover:bg-blue-700">Add Your First Object</Button>
                                                </Link>
                                            )}
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="grid gap-4">
                                        {userObjects.map((object) => (
                                            <Link href={`/objects/${object.id}`} key={object.id}>
                                                <Card className="hover:shadow-md transition-shadow">
                                                    <CardContent className="p-4">
                                                        <div className="flex justify-between items-center">
                                                            <div>
                                                                <h3 className="font-semibold text-lg">{object.name}</h3>
                                                                <p className="text-gray-600 text-sm line-clamp-1">{object.description}</p>
                                                                <p className="text-gray-600 text-sm">Category: {object.category?.name || "No category"}</p>
                                                                <div className="mt-2">
                                                                    <span className={`px-2 py-1 ${object.availability ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full text-xs`}>
                                                                        {object.availability ? "Available" : "Not Available"}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="activity">
                                <Card>
                                    <CardContent className="flex flex-col items-center justify-center py-10">
                                        <Clock className="h-16 w-16 text-gray-400 mb-4" />
                                        <p className="text-gray-600 text-center">
                                            Activity history is not available yet.
                                        </p>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
