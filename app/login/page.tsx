'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { login } from './actions'
import { ArrowRight, ShieldAlert, Terminal } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAction = async () => {
    if (!formRef.current) return
    const formData = new FormData(formRef.current)

    setError(null)
    setLoading(true)

    try {
      const result = await login(formData)
      if (result?.success) {
        router.push('/admin')
      } else {
         // Handle failure if your server action returns success: false
         setError('Invalid credentials.')
      }
    } catch (err: any) {
      setError(err.message || 'Access denied.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e0e0e0] text-neutral-900 p-6">
      
      {/* HEADER: Technical & Cold */}
      <div className="w-full max-w-sm mb-12 text-center md:text-left">
         <div className="flex items-center gap-2 mb-4 justify-center md:justify-start text-neutral-500">
            <Terminal size={16} />
            <span className="font-mono text-xs uppercase tracking-widest">/System/Auth</span>
         </div>
         <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            Restricted<br/>Access
         </h1>
         <p className="font-mono text-xs text-neutral-500 uppercase tracking-wide">
            Authorized Personnel Only
         </p>
      </div>

      {/* FORM: Brutalist & Sharp */}
      <div className="w-full max-w-sm">
        
        {error && (
            <div className="mb-6 bg-red-600 text-white p-4 flex items-center gap-3 text-sm font-bold uppercase tracking-wide border border-red-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
               <ShieldAlert size={18} />
               {error}
            </div>
        )}

        <form ref={formRef} className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); handleAction(); }}>
          
          {/* Email Input */}
          <div className="relative group">
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 group-focus-within:text-black transition-colors">
              Identity
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="USER_ID"
              className="w-full bg-transparent border-b-2 border-neutral-300 py-3 text-lg font-mono placeholder:text-neutral-300 focus:border-black focus:outline-none transition-colors rounded-none"
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 group-focus-within:text-black transition-colors">
              Passcode
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••••••"
              className="w-full bg-transparent border-b-2 border-neutral-300 py-3 text-lg font-mono placeholder:text-neutral-300 focus:border-black focus:outline-none transition-colors rounded-none"
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full bg-neutral-900 text-white h-14 font-bold uppercase tracking-widest hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between px-6 group"
          >
            <span>{loading ? 'Verifying...' : 'Authenticate'}</span>
            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>

        </form>

        <div className="mt-12 pt-6 border-t border-neutral-300 text-center md:text-left">
           <a href="/" className="font-mono text-xs text-neutral-400 hover:text-black uppercase tracking-widest transition-colors">
              ← Return to Public Site
           </a>
        </div>

      </div>
    </div>
  )
}