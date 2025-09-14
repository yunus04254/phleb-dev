'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function PrivatePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f7f7f7'
      }}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f7f7f7'
    }}>
      <div style={{
        background: '#fff',
        padding: '2rem 2.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        minWidth: '320px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h2 style={{ margin: 0 }}>Welcome to your private area!</h2>
        <p style={{ margin: 0, color: '#666' }}>
          Hello {user?.email}
        </p>
        {user?.user_metadata?.name && (
          <p style={{ margin: 0, color: '#666' }}>
            Welcome, {user.user_metadata.name}!
          </p>
        )}
        <button
          onClick={handleLogout}
          style={{
            padding: '0.6rem 1.5rem',
            background: '#dc2626',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            marginTop: '1rem',
            alignSelf: 'center'
          }}
        >
          Log out
        </button>
      </div>
    </div>
  )
}

