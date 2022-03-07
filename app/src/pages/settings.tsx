import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'

const Settings: React.FC = () => {
  const router = useRouter()
  const { logout } = useAuth()

  return (
    <div className="bg-slate-50">
      <header className="flex items-center p-5">
        <button
          className="rounded border border-slate-200 bg-white p-3 text-xl"
          onClick={() => router.back()}
        >
          <FaAngleLeft />
        </button>

        <span className="ml-4 block text-xl font-semibold text-primary">
          Configuración
        </span>
      </header>

      <div className="px-5">
        <button
          className="block w-full rounded border bg-white py-3 font-semibold text-primary"
          onClick={() => {
            logout()
            router.push('/')
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}

module.exports = Settings
