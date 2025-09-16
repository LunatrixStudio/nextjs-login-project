'use client'
import React, { useState } from 'react'
import Input from '../components/ui/input'
import Button from '../components/ui/button'
import { isValidIranMobile } from '../lib/validators'
import { saveUser } from '../lib/session'
import { useRouter } from 'next/navigation'
import type { StoredUser } from '../types/user'

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    setError(null)

    if (!isValidIranMobile(phone)) {
      setError('Invalid phone number. Allowed format: 0912xxxxxxx or +98912xxxxxxx')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('https://randomuser.me/api/?results=1&nat=us')
      if (!res.ok) throw new Error('Network error')
      const data = await res.json()
      const r = data.results?.[0]
      if (!r) throw new Error('Invalid response from API')

      const user: StoredUser = {
        name: `${r.name.first} ${r.name.last}`,
        email: r.email,
        picture: r.picture.large,
      }

      saveUser(user)
      router.replace('/dashboard')
    } catch (err) {
      console.error(err)
      setError('Failed to fetch user data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4 overflow-hidden">
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 
                      w-full max-w-sm sm:max-w-sm md:max-w-md lg:w-[500px]">
        <h1 className="text-2xl font-bold text-gray-900">Login</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in with your mobile number</p>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="mobile" className="text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <Input
              id="mobile"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Example: 0912xxxxxxx or +98912xxxxxxx"
              inputMode="tel"
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
            />
            <p className="text-xs text-red-500 h-4">
              {error ? error : ' '}
            </p>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>

  )
}
