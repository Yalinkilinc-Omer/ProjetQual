"use client"

import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Search, PlusCircle, UserCircle, LogOut, ArrowRight } from "lucide-react"

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-10 z-0"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-blue-800 mb-6 leading-tight">ObjectXchange</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed">
              Give your unused items a second life and discover treasures from others. Join our community of exchangers
              today!
            </p>

            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 h-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-200 rounded-full opacity-50"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-green-200 rounded-full opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {isAuthenticated ? (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Welcome back, {user?.username}!</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Continue your exchange journey. What would you like to do today?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Dashboard Card */}
              <Link href="/dashboard" className="group">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col items-center text-center group-hover:bg-blue-50 border border-transparent group-hover:border-blue-200">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                    <LayoutDashboard className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">My Dashboard</h3>
                  <p className="text-gray-600 mb-6">Manage your objects and exchange requests</p>
                  <Button className="mt-auto bg-blue-600 hover:bg-blue-700 w-full">Dashboard</Button>
                </div>
              </Link>

              {/* Browse Objects Card */}
              <Link href="/objects" className="group">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col items-center text-center group-hover:bg-green-50 border border-transparent group-hover:border-green-200">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-300">
                    <Search className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Browse Objects</h3>
                  <p className="text-gray-600 mb-6">Discover items available for exchange</p>
                  <Button className="mt-auto bg-green-600 hover:bg-green-700 w-full">Browse</Button>
                </div>
              </Link>

              {/* Add Object Card */}
              <Link href="/objects/add" className="group">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col items-center text-center group-hover:bg-orange-50 border border-transparent group-hover:border-orange-200">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors duration-300">
                    <PlusCircle className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Add Object</h3>
                  <p className="text-gray-600 mb-6">Share an item you'd like to exchange</p>
                  <Button className="mt-auto bg-orange-600 hover:bg-orange-700 w-full">Add Object</Button>
                </div>
              </Link>

              {/* Profile Card */}
              <Link href={`/profile/${user?.id}`} className="group">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col items-center text-center group-hover:bg-purple-50 border border-transparent group-hover:border-purple-200">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                    <UserCircle className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">My Profile</h3>
                  <p className="text-gray-600 mb-6">View and edit your profile information</p>
                  <Button className="mt-auto bg-purple-600 hover:bg-purple-700 w-full">Profile</Button>
                </div>
              </Link>
            </div>

            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-blue-200">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <UserCircle className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">Already a member?</h2>
                <p className="text-gray-600 mb-8 text-center">
                  Sign in to your account to continue exchanging objects with the community.
                </p>
                <Link href="/login" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg">Login</Button>
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-green-200">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <PlusCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">New to ObjectXchange?</h2>
                <p className="text-gray-600 mb-8 text-center">
                  Create an account to start sharing and exchanging objects with others.
                </p>
                <Link href="/register" className="w-full">
                  <Button className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg">Register</Button>
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Popular Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Link href="/categories/2">
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                        <path d="M12 18h.01" />
                      </svg>
                    </div>
                    <h3 className="font-semibold">Jeux vidéos</h3>
                  </div>
                </Link>
                <Link href="/categories/1">
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                      </svg>
                    </div>
                    <h3 className="font-semibold">Livres</h3>
                  </div>
                </Link>
                <Link href="/categories/3">
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-600"
                      >
                        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold">Vêtements</h3>
                  </div>
                </Link>
              </div>
              <div className="text-center mt-8">
                <Link href="/categories">
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                    View All Categories
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">ObjectXchange</h2>
            <p className="text-gray-600 mb-6">Join our community of exchangers today!</p>
            <div className="flex justify-center space-x-4">
              <Link href="/about">
                <span className="text-blue-600 hover:text-blue-800">About</span>
              </Link>
              <Link href="/contact">
                <span className="text-blue-600 hover:text-blue-800">Contact</span>
              </Link>
              <Link href="/privacy">
                <span className="text-blue-600 hover:text-blue-800">Privacy Policy</span>
              </Link>
              <Link href="/terms">
                <span className="text-blue-600 hover:text-blue-800">Terms of Service</span>
              </Link>
            </div>
            <p className="text-gray-500 mt-8">&copy; {new Date().getFullYear()} ObjectXchange. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

