import { login, signup } from './actions'
import { Shield } from 'lucide-react'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const error = params.error as string | undefined
  const message = params.message as string | undefined

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-emerald-100/50 border border-emerald-100">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-2xl shadow-lg mb-4 text-white">
            <Shield size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Welcome Back</h1>
          <p className="text-sm text-emerald-600/80 mt-2">Sign in to your USA Payroll Learning account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl text-sm mb-6 border border-emerald-100">
            {message}
          </div>
        )}

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              className="px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all text-gray-800"
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all text-gray-800"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              formAction={login}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all active:scale-95"
            >
              Sign In
            </button>
            <button
              formAction={signup}
              className="flex-1 bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold py-3 rounded-xl transition-all active:scale-95"
            >
              Sign Up
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center text-xs text-gray-400">
          <p>By signing in, you agree to our Terms of Service.</p>
        </div>
      </div>
    </div>
  )
}
