"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
import type { User } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase/config"

type AuthContextType = {
  user: User | null
  loading: boolean
  error: Error | undefined
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: false, error: undefined })

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, loading, error] = useAuthState(auth)

  useEffect(() => {
    console.log("Auth state changed:", {
      user: user ? { email: user.email, uid: user.uid } : null,
      loading,
      error: error ? error.message : undefined,
    })
  }, [user, loading, error])

  return <AuthContext.Provider value={{ user, loading, error }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

