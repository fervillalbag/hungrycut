import React from 'react'
import Layout from '@/components/Layout'

import { IoMdSettings } from 'react-icons/io'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/router'

const UserProfile: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()

  return (
    <Layout>
      <header className="flex items-center justify-between p-5">
        <span className="block text-xl font-semibold text-primary">
          {user.name}
        </span>
        <button
          className="rounded border border-slate-200 bg-white px-4 py-3 text-xl"
          onClick={() => router.push('/settings')}
        >
          <IoMdSettings />
        </button>
      </header>
    </Layout>
  )
}

module.exports = UserProfile
