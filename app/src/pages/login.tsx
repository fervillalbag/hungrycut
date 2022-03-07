import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaAngleLeft } from 'react-icons/fa'
import { useRouter } from 'next/router'

import useAuth from '@/hooks/useAuth'
import { LOGIN } from '@/graphql/mutations/user'
import { useMutation } from '@apollo/client'
import { UserLoginType } from '@/types/User'

const Login: React.FC = () => {
  const router = useRouter()
  const { login, user } = useAuth()

  const [userData, setUserData] = useState<UserLoginType>({
    email: '',
    password: ''
  })
  const [loginMutation] = useMutation(LOGIN)

  useEffect(() => {
    ;(async () => {
      if (user) {
        return router.push('/')
      }
    })()
  }, [user])

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const response = await loginMutation({
        variables: {
          input: {
            email: userData.email,
            password: userData.password
          }
        }
      })
      login(response?.data?.login?.token)
      router.push('/')
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

      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-between px-5 pt-3"
      >
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
              autoComplete="off"
              autoCapitalize="off"
              onChange={e =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <input
              type="password"
              className="w-full rounded border border-slate-200 py-3 px-4 focus:outline-primary"
              placeholder="Contraseña"
              value={userData.password}
              autoComplete="off"
              autoCapitalize="off"
              onChange={e =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
        </div>

        <div className="my-6">
          <div className="mb-3 flex justify-center">
            <p className="text-primary">¿Aún no tienes una cuenta? </p>
            <Link href="/register">
              <a className="ml-1 block font-semibold">Regístrate</a>
            </Link>
          </div>

          <button
            type="submit"
            className="h-12 w-full rounded bg-primary text-white"
          >
            Inicia Sesión
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
