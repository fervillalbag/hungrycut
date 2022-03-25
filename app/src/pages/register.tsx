import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaAngleLeft } from 'react-icons/fa'
import { useMutation } from '@apollo/client'

import { REGISTER } from '@/graphql/mutations/user'
import useAuth from '@/hooks/useAuth'
import { UserRegisterType } from '@/types/User'

const Register: React.FC = () => {
  const router = useRouter()
  const { user } = useAuth()

  const [userData, setUserData] = useState<UserRegisterType>({
    name: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: ''
  })

  const [registerMutation] = useMutation(REGISTER)

  useEffect(() => {
    ;(async () => {
      if (user) {
        return router.push('/')
      }
    })()
  }, [user])

  const handleRegister = async e => {
    e.preventDefault()
    try {
      if (userData.password !== userData.passwordConfirm) {
        return
      }

      await registerMutation({
        variables: {
          input: {
            name: userData.name,
            username: userData.username,
            email: userData.email,
            password: userData.password
          }
        }
      })
      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="mx-auto flex max-w-xl p-5">
        <button
          className="flex items-center justify-center rounded border border-slate-300 py-2 px-3 text-2xl text-primary"
          onClick={() => router.back()}
        >
          <FaAngleLeft />
        </button>
      </div>

      <form onSubmit={handleRegister} className="mx-auto max-w-xl px-5 pt-3">
        <div>
          <h3 className="mb-2 text-2xl font-bold text-primary">Regístrate</h3>

          <p className="text-primary ">
            Únete a la comunidad de gastronomía emergente del Paraguay.
          </p>

          <div className="mt-6">
            <input
              type="text"
              className="mb-5 w-full rounded border border-slate-200 py-3 px-4 focus:outline-primary"
              placeholder="Nombre y apellido"
              autoComplete="off"
              autoCapitalize="off"
              value={userData.name}
              onChange={e => setUserData({ ...userData, name: e.target.value })}
            />
            <input
              type="text"
              className="mb-5 w-full rounded border border-slate-200 py-3 px-4 focus:outline-primary"
              placeholder="Nombre de usuario"
              autoComplete="off"
              autoCapitalize="off"
              value={userData.username}
              onChange={e =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
            <input
              type="text"
              className="mb-5 w-full rounded border border-slate-200 py-3 px-4 focus:outline-primary"
              placeholder="Correo electrónico"
              autoComplete="off"
              autoCapitalize="off"
              value={userData.email}
              onChange={e =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <input
              type="password"
              className="mb-5 w-full rounded border border-slate-200 py-3 px-4 focus:outline-primary"
              placeholder="Contraseña"
              autoComplete="off"
              autoCapitalize="off"
              value={userData.password}
              onChange={e =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <input
              type="password"
              className="w-full rounded border border-slate-200 py-3 px-4 focus:outline-primary"
              placeholder="Confirmar contraseña"
              autoComplete="off"
              autoCapitalize="off"
              value={userData.passwordConfirm}
              onChange={e =>
                setUserData({ ...userData, passwordConfirm: e.target.value })
              }
            />
          </div>
        </div>

        <div className="my-6">
          <div className="mb-4 flex justify-center">
            <p className="password-primary text-sm">¿Ya tienes una cuenta? </p>
            <Link href="/login">
              <a className="ml-1 block text-sm font-semibold">Inicia sesión</a>
            </Link>
          </div>

          <button
            type="submit"
            className="h-12 w-full rounded bg-primary text-white"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
