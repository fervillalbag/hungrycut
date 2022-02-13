import React from 'react'
import Link from 'next/link'

import { HiHome, HiSearch, HiUser } from 'react-icons/hi'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { MdOutlineHistory } from 'react-icons/md'
import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter()

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
      <Link href="/">
        <a
          className={`block text-2xl text-primary ${
            router.pathname === '/search' ? 'text-primary' : 'text-slate-300'
          }`}
        >
          <HiSearch />
        </a>
      </Link>
      <Link href="/create">
        <a
          className={`block text-2xl text-primary ${
            router.pathname === '/create' ? 'text-primary' : 'text-slate-300'
          }`}
        >
          <BsFillPlusSquareFill />
        </a>
      </Link>
      <Link href="/history">
        <a
          className={`block text-2xl text-primary ${
            router.pathname === '/history' ? 'text-primary' : 'text-slate-300'
          }`}
        >
          <MdOutlineHistory />
        </a>
      </Link>
      <Link href="/">
        <a
          className={`block text-2xl text-primary ${
            router.pathname === '/username' ? 'text-primary' : 'text-slate-300'
          }`}
        >
          <HiUser />
        </a>
      </Link>
    </div>
  )
}

export default Navbar
