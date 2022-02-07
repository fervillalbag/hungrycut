import useAuth from '@/hooks/useAuth'
import React from 'react'

const Home: React.FC = () => {
  const { logout } = useAuth()

  return (
    <div>
      <h1>Starting the project</h1>

      <button onClick={logout}>Cerrar sesión</button>
    </div>
  )
}

export default Home
