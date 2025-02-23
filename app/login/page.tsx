"use client"

import type React from "react"

import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/config"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    console.log("Giriş denemesi, e-posta:", email)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log("Giriş başarılı:", userCredential.user)
      router.push("/")
    } catch (error) {
      console.error("Giriş hatası:", error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Bilinmeyen bir hata oluştu")
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Giriş Yap</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1">
              E-posta
            </label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Şifre
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Giriş Yap
          </Button>
        </form>
      </div>
    </div>
  )
}

