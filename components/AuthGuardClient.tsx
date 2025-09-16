'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loadUser } from '../lib/session'

export default function AuthGuardClient({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  useEffect(() => {
    const u = loadUser()
    if (!u) {
      router.replace('/')
    }
  }, [router])
  return <>{children}</>
}
