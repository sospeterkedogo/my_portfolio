'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { login, signup } from './actions'

export default function LoginPage() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<{ login: boolean; signup: boolean }>({ login: false, signup: false })

  const handleAction = async (action: 'login' | 'signup') => {
    if (!formRef.current) return
    const formData = new FormData(formRef.current)

    setError(null)
    setLoading((prev) => ({ ...prev, [action]: true }))

    try {
      let result
      if (action === 'login') {
        result = await login(formData)
      } else {
        result = await signup(formData)
      }

      if (result.success) {
        router.push('/admin')
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred')
    } finally {
      setLoading((prev) => ({ ...prev, [action]: false }))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Welcome Back
        </h1>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

        <form ref={formRef} className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              disabled={loading.login}
              className="w-full sm:w-1/2 px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
              onClick={() => handleAction('login')}
            >
              {loading.login ? 'Logging in...' : 'Log in'}
            </button>

            <button
              type="button"
              disabled={loading.signup}
              className="w-full sm:w-1/2 px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 transition"
              onClick={() => handleAction('signup')}
            >
              {loading.signup ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
