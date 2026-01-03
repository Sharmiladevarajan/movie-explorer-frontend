// This file is deprecated - use the main /page.tsx instead
// Redirecting to main page
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NetflixPageRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/')
  }, [router])
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900 flex items-center justify-center">
      <div className="text-white text-xl">Redirecting to home page...</div>
    </div>
  )
}
