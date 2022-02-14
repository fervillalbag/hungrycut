import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import Layout from '@/components/Layout'
import CardReport from '@/components/CardReport'
import { GET_REPORTS } from '@/graphql/queries/reports'
import { ReportType } from '@/types/Report'
import useAuth from '@/hooks/useAuth'
import dayjs from 'dayjs'

interface HomeIprops {
  reports: ReportType[]
}

interface DateType {
  date: string | null
}

const Home: React.FC<HomeIprops> = () => {
  const { user } = useAuth()

  const [buttonTabActive, setButtonTabActive] = useState<string>('today')

  const [currentDate, setCurrentDate] = useState<DateType>({
    date: dayjs().format('YYYY-MM-DD')
  })

  useEffect(() => {
    if (currentDate.date === '') {
      setCurrentDate({ date: dayjs().format('YYYY-MM-DD') })
    }
  }, [currentDate])

  const { data: reports, loading } = useQuery(GET_REPORTS, {
    variables: {
      idUser: user?.id,
      date: currentDate?.date
    },
    fetchPolicy: 'network-only'
  })

  return (
    <Layout>
      <header className="p-5">
        <img src="/logo.jpg" className="w-40" alt="" />
      </header>

      <div className="mb-3 px-5">
        <span className="block text-lg">Lista de Reportes</span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 px-5 pb-5">
        <button
          className={`rounded border border-primary py-2 font-semibold ${
            buttonTabActive === 'today' && 'bg-primary text-white'
          }`}
          onClick={() => {
            setCurrentDate({ date: dayjs().format('YYYY-MM-DD') })
            setButtonTabActive('today')
          }}
        >
          Hoy
        </button>
        <button
          className={`rounded border border-primary py-2 font-semibold text-primary ${
            buttonTabActive === 'yesterday' && 'bg-primary text-white'
          }`}
          onClick={() => {
            setCurrentDate({
              date: dayjs().subtract(1, 'day').format('YYYY-MM-DD')
            })
            setButtonTabActive('yesterday')
          }}
        >
          Ayer
        </button>
      </div>

      <div className="mt-3 px-5">
        {loading ? (
          <span className="block text-center">Cargando..</span>
        ) : reports?.getReports.length === 0 ? (
          <div className="flex h-[calc(100vh_-_275px)] items-center justify-center">
            <span className="block">No hay reportes generados</span>
          </div>
        ) : (
          reports?.getReports.map((report: ReportType) => (
            <div key={report.id} className="mb-8">
              <CardReport report={report} />
            </div>
          ))
        )}
      </div>
    </Layout>
  )
}

export default Home
