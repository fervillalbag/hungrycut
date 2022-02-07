import useAuth from '@/hooks/useAuth'
import React from 'react'

const Home: React.FC = () => {
  const { isLogged = false, logout } = useAuth()

  console.log(isLogged)

  return (
    <div>
      <h1>Starting the project</h1>

      <button onClick={logout}>Cerrar sesión</button>
    </div>
  )
}

export default Home
