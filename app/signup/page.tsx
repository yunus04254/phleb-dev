'use client'

import { signup } from '../login/actions'
import Link from 'next/link'
import { useActionState } from 'react'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signup, { error: '' })
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        router.push('/dashboard')
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    if (state?.error) {
      // Reset form on error
      formRef.current?.reset()
    }
  }, [state?.error])

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
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem'
      }}>
        <h2 style={{ textAlign: 'center', margin: 0 }}>Create your account</h2>
        
        {state?.error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '0.75rem',
            borderRadius: '4px',
            fontSize: '0.875rem'
          }}>
            {state.error}
          </div>
        )}

        <form ref={formRef} action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="name" style={{ fontWeight: 500 }}>Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="email" style={{ fontWeight: 500 }}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="password" style={{ fontWeight: 500 }}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            style={{
              padding: '0.6rem 0',
              background: isPending ? '#9ca3af' : '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: isPending ? 'not-allowed' : 'pointer',
              marginTop: '1rem',
              opacity: isPending ? 0.7 : 1
            }}
          >
            {isPending ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <p style={{ margin: 0, color: '#666' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#2563eb', textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
