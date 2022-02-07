import React from 'react'

import useAuth from '@/hooks/useAuth'
import Layout from '@/components/Layout'
import CardReport from '@/components/CardReport'

const Home: React.FC = () => {
  const { isLogged } = useAuth()

  console.log(isLogged)

  return (
    <Layout>
      <header className="p-5">
        <span className="block text-2xl font-bold text-primary">Inicio</span>
      </header>

      <div className="px-5">
        <CardReport />
      </div>
    </Layout>
  )
}

export default Home
