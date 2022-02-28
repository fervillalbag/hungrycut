import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'

interface ModalIprops {
  children: React.ReactChild
  type: string
  title: string
  showModal: boolean
  setShowModal: (boolean) => void
}

const Modal: React.FC<ModalIprops> = ({
  children,
  type,
  title,
  showModal,
  setShowModal
}) => {
  return (
    <div
      className={`fixed top-0 left-0 ${
        type === 'full' ? 'h-full w-screen' : 'h-full w-11/12 max-w-2xl'
      } ${
        showModal ? 'block opacity-100' : 'hidden opacity-0'
      }  z-[200] overflow-y-scroll bg-white p-5 transition delay-300 duration-300`}
    >
      <header className="flex items-center">
        <button
          className="rounded border border-slate-200 bg-white p-3 text-xl"
          onClick={() => setShowModal(false)}
        >
          <FaAngleLeft />
        </button>

        <span className="ml-4 block text-xl font-semibold text-primary">
          {title}
        </span>
      </header>

      <div>{children}</div>
    </div>
  )
}

export default Modal
