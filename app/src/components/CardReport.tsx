import React from 'react'

const CardReport: React.FC = () => {
  return (
    <div className="overflow-hidden rounded-md shadow-lg">
      <div className="relative">
        <img
          src="https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt=""
          className="h-36 w-full object-cover"
        />
        <div className="absolute top-0 z-10 h-full w-full bg-[rgba(0,0,0,0.5)]"></div>
        <div className="absolute right-0 top-0 z-20 rounded-bl-md bg-slate-200 px-4 py-1">
          <span className="block text-sm font-semibold text-slate-600">
            Cena
          </span>
        </div>

        <div className="absolute bottom-0 left-0 z-20 flex p-2">
          <div className="mr-4">
            <span className="block text-3xl font-bold text-white">80%</span>
            <span className="block text-sm text-white">Carboh</span>
          </div>
          <div className="mr-4">
            <span className="block text-3xl font-bold text-white">40%</span>
            <span className="block text-sm text-white">Proteínas</span>
          </div>
          <div className="mr-4">
            <span className="block text-3xl font-bold text-white">200</span>
            <span className="block text-sm text-white">Calorías</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-3 py-4">
        <div className="mb-2">
          <img src="/stars-0.png" className="w-24" alt="" />
        </div>

        <span className="block text-xl font-semibold text-primary">
          Nombre de la comida del día
        </span>

        <div className="mt-3 flex items-center">
          <div className="mr-3">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt=""
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
          <div>
            <span className="block text-sm font-semibold text-primary">
              Brenda Codas
            </span>
            <span className="block text-sm text-slate-400">
              Vie 10 marzo 2021, 19:40
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardReport
