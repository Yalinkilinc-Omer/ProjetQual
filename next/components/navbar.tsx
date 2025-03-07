"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, User, Package, Bell, LogOut } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    // Close mobile menu if open
    setIsMenuOpen(false)
    // Redirect to home page
    window.location.href = "/"
  }

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
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">


              {isAuthenticated ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-600 rounded-full">
                        <User size={20} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        <div className="flex flex-col">
                          <span>My Account</span>
                          <span className="text-xs text-gray-500">{user?.username}</span>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/profile/${user?.id}`}>Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/notifications">
                          <Bell className="mr-2 h-4 w-4" />
                          Notifications
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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


            {isAuthenticated ? (
              <div className="space-y-2 mt-3">
                <div className="px-3 py-2">
                  <div className="font-medium">Welcome, {user?.username}</div>
                </div>
                <Link href="/dashboard" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 hover:text-red-800 px-3 py-2 rounded-md flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </button>
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
      )
      }
    </nav >
  )
}

