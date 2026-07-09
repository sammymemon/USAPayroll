'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { logout } from '@/app/login/actions'
import { LogOut, User as UserIcon } from 'lucide-react'

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  if (loading) {
    return <div className="h-9 w-20 bg-white/10 animate-pulse rounded-md"></div>
  }

  if (user) {
    return (
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 rounded-full p-1.5">
            <UserIcon size={14} className="text-white" />
          </div>
          <span className="text-sm font-medium text-white hidden sm:block max-w-[150px] truncate">
            {user.email}
          </span>
        </div>
        <div className="w-[1px] h-4 bg-white/20"></div>
        <button 
          onClick={() => logout()}
          className="text-xs font-semibold text-emerald-100 hover:text-white transition-colors flex items-center gap-1"
          title="Sign Out"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    )
  }

  return (
    <Link 
      href="/login"
      className="bg-white text-emerald-800 hover:bg-emerald-50 px-4 py-2 rounded-full text-sm font-bold shadow-sm transition-all active:scale-95"
    >
      Sign In
    </Link>
  )
}
