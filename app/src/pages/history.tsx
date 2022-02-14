import React from 'react'
import { useRouter } from 'next/router'

import { useQuery } from '@apollo/client'
import { GET_REPORTS } from '@/graphql/queries/reports'
import useAuth from '@/hooks/useAuth'
import CardReport from '@/components/CardReport'
import { ReportType } from '@/types/Report'
import { FaAngleLeft } from 'react-icons/fa'

const History: React.FC = () => {
  const router = useRouter()
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
    <div className="bg-slate-50">
      <header className="flex items-center p-5">
        <button
          className="rounded border border-slate-200 bg-white p-3 text-xl"
          onClick={() => router.back()}
        >
          <FaAngleLeft />
        </button>

        <span className="ml-4 block text-xl font-semibold text-primary">
          Historial
        </span>
      </header>

      <div className="mt-1 px-5">
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
    </div>
  )
}

export default History
