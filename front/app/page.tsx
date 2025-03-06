"use client"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth()
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-800 mb-4">ObjectXchange</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A platform where you can exchange your unused items with others. Give your objects a second life and find
            what you need!
          </p>
        </header>

        {!isAuthenticated ? (
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">Already a member?</h2>
              <p className="text-gray-600 mb-6 text-center">
                Sign in to your account to continue exchanging objects with the community.
              </p>
              <Link href="/login" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Login</Button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">New to ObjectXchange?</h2>
              <p className="text-gray-600 mb-6 text-center">
                Create an account to start sharing and exchanging objects with others.
              </p>
              <Link href="/register" className="w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700">Register</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
          </div>
        )}

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Register & Add Items</h3>
              <p className="text-gray-600">Create an account and add items you want to exchange with others.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse & Request</h3>
              <p className="text-gray-600">Search for items you're interested in and request an exchange.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Exchange & Enjoy</h3>
              <p className="text-gray-600">Once the owner accepts, arrange the exchange and enjoy your new item!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

