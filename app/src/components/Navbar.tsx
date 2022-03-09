import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MdOutlineHistory } from 'react-icons/md'
import { HiHome, HiSearch, HiUser } from 'react-icons/hi'
import { BsFillPlusSquareFill, BsInfoCircleFill } from 'react-icons/bs'
import useAuth from '@/hooks/useAuth'

const Navbar: React.FC = () => {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <div className="fixed bottom-0 z-40 mx-auto flex h-16 w-full max-w-lg items-center justify-between bg-white px-8">
      <Link href="/">
        <a
          className={`block text-2xl ${
            router.pathname === '/' ? 'text-primary' : 'text-slate-300'
          }`}
        >
          <HiHome />
        </a>
      </Link>
      <Link href="/search">
        <a
          className={`block text-2xl text-primary ${
            router.pathname === '/search' ? 'text-primary' : 'text-slate-300'
          }`}
        >
          <HiSearch />
        </a>
      </Link>
      {user && (
        <Link href="/create">
          <a
            className={`block text-2xl text-primary ${
              router.pathname === '/create' ? 'text-primary' : 'text-slate-300'
            }`}
          >
            <BsFillPlusSquareFill />
          </a>
        </Link>
      )}
      {user && (
        <Link href="/options">
          <a
            className={`block text-2xl text-primary ${
              router.pathname === '/options' || router.pathname === '/calendar'
                ? 'text-primary'
                : 'text-slate-300'
            }`}
          >
            <MdOutlineHistory />
          </a>
        </Link>
      )}
      {user && (
        <Link href={`/user/${user.username}`}>
          <a
            className={`block text-2xl text-primary ${
              router.pathname === `/user/[username]`
                ? 'text-primary'
                : 'text-slate-300'
            }`}
          >
            <HiUser />
          </a>
        </Link>
      )}
      {!user && (
        <Link href="/">
          <a
            className={`block text-2xl text-primary ${
              router.pathname === '/username'
                ? 'text-primary'
                : 'text-slate-300'
            }`}
          >
            <BsInfoCircleFill />
          </a>
        </Link>
      )}
      {!user && (
        <Link href="/login">
          <a
            className={`block text-primary ${
              router.pathname === '/username'
                ? 'text-primary'
                : 'text-slate-300'
            }`}
          >
            Ingresar
          </a>
        </Link>
      )}
    </div>
  )
}

export default Navbar
