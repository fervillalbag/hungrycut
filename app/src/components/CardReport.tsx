import React from 'react'
// import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { ReportType } from '@/types/Report'
import es from 'dayjs/locale/es'
import { useQuery } from '@apollo/client'
import { GET_USER } from '@/graphql/queries/user'

dayjs.locale(es)

interface CardReportIprops {
  report: ReportType
}

const CardReport: React.FC<CardReportIprops> = ({ report }) => {
  const { data: user } = useQuery(GET_USER, {
    variables: {
      id: report?.idUser
    }
  })

  return (
    <div
      className="overflow-hidden rounded-md shadow-lg"
      // onClick={() => router.push('/post')}
    >
      <div className="relative">
        <img src={report.image} alt="" className="h-48 w-full object-cover" />
        <div className="absolute top-0 z-10 h-full w-full bg-[rgba(0,0,0,0.5)]"></div>
        <div className="absolute right-0 top-0 z-20 rounded-bl-md bg-slate-200 px-4 py-1">
          <span className="block text-sm font-semibold text-slate-600">
            {report.type}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 z-20 flex p-2">
          <div className="mr-4">
            <span className="block text-3xl font-bold text-white">
              {report.carbohydrates}%
            </span>
            <span className="block text-sm text-white">Carboh</span>
          </div>
          <div className="mr-4">
            <span className="block text-3xl font-bold text-white">
              {report.proteins}%
            </span>
            <span className="block text-sm text-white">Proteínas</span>
          </div>
          <div className="mr-4">
            <span className="block text-3xl font-bold text-white">
              {report.calories}
            </span>
            <span className="block text-sm text-white">Calorías</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-3 py-4">
        <div className="mb-2">
          {report.isFavorite === 1 ? (
            <img src="/stars-1.png" className="w-24" alt="" />
          ) : report.isFavorite === 2 ? (
            <img src="/stars-2.png" className="w-24" alt="" />
          ) : report.isFavorite === 3 ? (
            <img src="/stars-3.png" className="w-24" alt="" />
          ) : report.isFavorite === 4 ? (
            <img src="/stars-4.png" className="w-24" alt="" />
          ) : report.isFavorite === 5 ? (
            <img src="/stars-5.png" className="w-24" alt="" />
          ) : null}
        </div>

        <span className="block text-xl font-semibold text-primary">
          {report.name}
        </span>

        <div className="mt-3 flex items-center">
          <div className="mr-3">
            <img
              src={user?.getUser?.avatar || '/avatar.png'}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
          <div>
            <span className="block text-sm font-semibold text-primary">
              {user?.getUser?.name}
            </span>
            <span className="block text-sm text-slate-400">
              {dayjs(Number(report.createdAt))
                .locale('es')
                .format('dddd, D MMMM YYYY hh:mm')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardReport
