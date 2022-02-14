import React from 'react'

import Layout from '@/components/Layout'
import { useRouter } from 'next/router'

const Options: React.FC = () => {
  const router = useRouter()

  return (
    <Layout>
      <header className="p-5">
        <span className="block text-xl font-semibold text-primary">
          Opciones avanzadas
        </span>
      </header>

      <div className="grid grid-cols-2 gap-4 px-5">
        <button
          className="block w-full rounded border border-slate-300 bg-white py-3 text-center text-primary"
          onClick={() => router.push('/history')}
        >
          Reportes
        </button>
        <button
          className="block w-full rounded border border-slate-300 bg-white py-3 text-center text-primary"
          onClick={() => router.push('/calendar')}
        >
          Calendario
        </button>
        <button className="block w-full rounded border border-slate-300 bg-white py-3 text-center text-primary">
          Estadística
        </button>
      </div>
    </Layout>
  )
}

export default Options
