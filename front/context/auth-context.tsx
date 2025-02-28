"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import axios from "axios"

type User = {
    id: string
    username: string
    // Add other user properties as needed
}

type AuthContextType = {
    user: User | null
    isLoading: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check if user is already logged in on page load
        const checkAuthStatus = async () => {
            try {
                // Try to get user data from localStorage first for immediate UI update
                const storedUser = localStorage.getItem("user")
                if (storedUser) {
                    setUser(JSON.parse(storedUser))
                }

                // Then verify with the server (optional, for added security)
                // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`)
                // setUser(response.data)
            } catch (error) {
                // If server verification fails, clear local storage
                localStorage.removeItem("user")
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }

        checkAuthStatus()
    }, [])

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
                { username, password }
            )

            const userData = response.data
            setUser(userData)

            // Store user data in localStorage for persistence
            localStorage.setItem("user", JSON.stringify(userData))

            return userData
        } catch (error) {
            throw error
        }
    }

    const logout = () => {
        // Clear user from state and localStorage
        setUser(null)
        localStorage.removeItem("user")

        // Optional: Call logout endpoint
        // axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/logout`)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
