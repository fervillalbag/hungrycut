import React from 'react'

import Layout from '@/components/Layout'
import { useQuery } from '@apollo/client'
import { GET_REPORTS } from '@/graphql/queries/reports'
import useAuth from '@/hooks/useAuth'
import CardReport from '@/components/CardReport'
import { ReportType } from '@/types/Report'

const History: React.FC = () => {
  const { user } = useAuth()

  const { data: reports, loading } = useQuery(GET_REPORTS, {
    variables: {
      idUser: user?.id,
      date: null
    }
  })

  const arraySort = (array = []) => {
    const arrayValue = [...array]

    const newArray = arrayValue.sort(
      (a: ReportType, b: ReportType) =>
        new Date(Number(b.createdAt)).getTime() -
        new Date(Number(a.createdAt)).getTime()
    )

    return newArray
  }

  const reportsSorted = arraySort(reports?.getReports)

  return (
    <Layout>
      <header className="p-5">
        <span className="block text-xl font-semibold text-primary">
          Historial
        </span>
      </header>

      <div className="grid grid-cols-2 gap-x-4 px-5 pb-5">
        <button
          className={`rounded border bg-primary py-2 font-semibold text-white`}
        >
          Todos
        </button>
        <button
          className={`rounded border border-primary py-2 font-semibold text-primary`}
        >
          Calendario
        </button>
      </div>

      <div className="mt-3 px-5">
        {loading ? (
          <span className="block text-center">Cargando..</span>
        ) : reportsSorted.length === 0 ? (
          <div className="flex h-[calc(100vh_-_275px)] items-center justify-center">
            <span className="block">No hay reportes generados</span>
          </div>
        ) : (
          reportsSorted.map((report: ReportType) => (
            <div key={report.id} className="mb-8">
              <CardReport report={report} />
            </div>
          ))
        )}
      </div>
    </Layout>
  )
}

export default History
