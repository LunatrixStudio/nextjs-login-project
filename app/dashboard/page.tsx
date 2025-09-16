'use client'
import React, { useEffect, useState } from 'react'
import { loadUser, clearUser } from '../../lib/session'
import { useRouter } from 'next/navigation'
import type { StoredUser } from '../../types/user'
import { Button } from '@/components/ui/Button'

export default function DashboardPage() {
  const [user, setUser] = useState<StoredUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    const u = loadUser()
    if (!u) {
      router.replace('/')
      return
    }
    setUser(u)
  }, [router])

  function onLogout() {
    clearUser()
    router.replace('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Redirecting...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 ">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome, {user.name}
        </h2>
        <p className="text-sm text-gray-500 mb-6">Welcome to your dashboard</p>
        <img
          src={user.picture}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
        />
        <p className="text-sm text-gray-800 mb-6">{user.email}</p>
        <Button
          onClick={onLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
        >
          Logout
        </Button>
      </div>
    </div>
  )
}
