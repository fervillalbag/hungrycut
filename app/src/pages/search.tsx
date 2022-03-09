import Layout from '@/components/Layout'
import React from 'react'
import { HiSearch } from 'react-icons/hi'

const Search: React.FC = () => {
  return (
    <Layout>
      <header className="p-5">
        <span className="block text-xl font-semibold text-primary">
          Búsqueda
        </span>
      </header>

      <div className="flex px-5">
        <div className="flex-1">
          <input
            type="text"
            className="w-full rounded border border-slate-200 py-3 px-4 focus:outline-primary"
            // placeholder="Correo electrónico"
            autoComplete="off"
            autoCapitalize="off"
          />
        </div>
        <div>
          <button className="ml-4 block h-full rounded-md bg-primary px-4 text-white">
            <HiSearch />
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Search
