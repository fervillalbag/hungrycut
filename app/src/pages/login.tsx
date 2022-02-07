import React, { useState } from 'react'
import Link from 'next/link'
import { FaAngleLeft } from 'react-icons/fa'
import { useRouter } from 'next/router'

import { LOGIN } from '@/graphql/mutations/user'
import { useMutation } from '@apollo/client'
import { UserLoginType } from '@/types/User'

const Login: React.FC = () => {
  const router = useRouter()

  const [userData, setUserData] = useState<UserLoginType>({
    email: '',
    password: ''
  })
  const [login] = useMutation(LOGIN)

  const handleLogin = async () => {
    try {
      const response = await login({
        variables: {
          input: {
            email: userData.email,
            password: userData.password
          }
        }
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-screen overflow-hidden">
      <div className="m-5 flex">
        <button
          className="flex items-center justify-center rounded border border-slate-300 py-2 px-3 text-2xl text-primary"
          onClick={() => router.back()}
        >
          <FaAngleLeft />
        </button>
      </div>

      <div className="flex h-[calc(100vh_-_82px)] flex-col justify-between px-5 pt-6">
        <div>
          <h3 className="mb-2 text-2xl font-bold text-primary">
            Inicia Sesión
          </h3>

          <p className="text-primary ">
            Únete a la comunidad de gastronomía emergente del Paraguay.
          </p>

          <div className="mt-6">
            <input
              type="text"
              className="mb-5 w-full rounded border border-slate-200 py-3 px-4 focus:outline-primary"
              placeholder="Correo electrónico"
              value={userData.email}
              onChange={e =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <input
              type="text"
              className="w-full rounded border border-slate-200 py-3 px-4 focus:outline-primary"
              placeholder="Contraseña"
              value={userData.password}
              onChange={e =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-3 flex justify-center">
            <p className="text-primary">¿Aún no tienes una cuenta? </p>
            <Link href="/register">
              <a className="ml-1 block font-semibold">Regístrate</a>
            </Link>
          </div>

          <button
            className="h-12 w-full rounded bg-primary text-white"
            onClick={handleLogin}
          >
            Inicia Sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
