'use server'

import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    throw new Error(error.message || 'Login failed')
  }

  return { success: true, user: authData.user }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data: signUpData, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    throw new Error(error.message || 'Signup failed')
  }

  // Optional: Insert user into your custom `users` table
  if (signUpData.user) {
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        auth_id: signUpData.user.id,
        email: signUpData.user.email,
      })
    if (insertError) {
      console.error('Error inserting into users table:', insertError)
      throw new Error('Signup succeeded but failed to save user data')
    }
  }

  return { success: true, user: signUpData.user }
}
