"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, Menu, X, User, Package, Bell } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would be determined by your auth state

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-blue-600">ObjectXchange</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link href="/objects" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
                  Browse Objects
                </Link>
                <Link href="/categories" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
                  Categories
                </Link>
                <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
                  How It Works
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search objects..."
                  className="w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={18} />
                </button>
              </div>

              {isLoggedIn ? (
                <>
                  <Link href="/my-objects">
                    <Button variant="ghost" size="icon" className="text-gray-600">
                      <Package size={20} />
                    </Button>
                  </Link>
                  <Link href="/notifications">
                    <Button variant="ghost" size="icon" className="text-gray-600">
                      <Bell size={20} />
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button variant="ghost" size="icon" className="text-gray-600">
                      <User size={20} />
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="text-blue-600 border-blue-600">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/objects" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
              Browse Objects
            </Link>
            <Link href="/categories" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
              Categories
            </Link>
            <Link href="/how-it-works" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
              How It Works
            </Link>

            <div className="relative mt-3">
              <input
                type="text"
                placeholder="Search objects..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </button>
            </div>

            {isLoggedIn ? (
              <div className="flex space-x-4 mt-3">
                <Link href="/my-objects" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
                  My Objects
                </Link>
                <Link href="/notifications" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
                  Notifications
                </Link>
                <Link href="/profile" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
                  Profile
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 mt-3">
                <Link href="/login">
                  <Button variant="outline" className="w-full text-blue-600 border-blue-600">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

