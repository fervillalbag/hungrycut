import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Register: React.FC = () => {
  const router = useRouter()

  return (
    <div>
      <div className="m-5 flex">
        <button
          className="flex items-center justify-center rounded border border-slate-300 py-2 px-3 text-2xl text-primary"
          onClick={() => router.back()}
        >
          <FaAngleLeft />
        </button>
      </div>

      <div className="px-5 pt-6">
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
            />
            <input
              type="text"
              className="mb-5 w-full rounded border border-slate-200 py-3 px-4 focus:outline-primary"
              placeholder="Nombre de usuario"
            />
            <input
              type="text"
              className="mb-5 w-full rounded border border-slate-200 py-3 px-4 focus:outline-primary"
              placeholder="Correo electrónico"
            />
            <input
              type="text"
              className="mb-5 w-full rounded border border-slate-200 py-3 px-4 focus:outline-primary"
              placeholder="Contraseña"
            />
            <input
              type="text"
              className="w-full rounded border border-slate-200 py-3 px-4 focus:outline-primary"
              placeholder="Confirmar contraseña"
            />
          </div>
        </div>

        <div className="my-8">
          <div className="mb-3 flex justify-center">
            <p className="text-primary">¿Ya tienes una cuenta? </p>
            <Link href="/login">
              <a className="ml-1 block font-semibold">Inicia sesión</a>
            </Link>
          </div>

          <button className="h-12 w-full rounded bg-primary text-white">
            Registrarse
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
