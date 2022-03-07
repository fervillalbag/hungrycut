import React from 'react'

const CardLoading: React.FC = () => {
  return (
    <div className="h-[330px] overflow-hidden rounded-md bg-slate-200">
      <div className="h-[190px] bg-slate-300"></div>
      <div className="p-4">
        <div className="h-5 w-32 bg-slate-50"></div>
        <div className="mt-3 h-5 w-64 bg-slate-50"></div>

        <div className="mt-3 flex items-center">
          <div className="mr-2 h-10 w-10 rounded-full bg-slate-50"></div>
          <div>
            <div className="h-3 w-24 bg-slate-50"></div>
            <div className="mt-2 h-3 w-20 bg-slate-50"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardLoading
