import React from 'react'

import useAuth from '@/hooks/useAuth'
import Layout from '@/components/Layout'
import CardReport from '@/components/CardReport'
import { useQuery } from '@apollo/client'
import { GET_REPORTS } from '@/graphql/queries/reports'
import { ReportType } from '@/types/Report'

const Home: React.FC = () => {
  const { user } = useAuth()

  const { data: reports, loading } = useQuery(GET_REPORTS, {
    variables: {
      idUser: user?.id
    },
    fetchPolicy: 'network-only'
  })

  console.log(reports)

  if (loading) return null

  return (
    <Layout>
      <header className="p-5">
        <span className="block text-2xl font-bold text-primary">Inicio</span>
      </header>

      <div className="px-5">
        {reports.getReports.map((report: ReportType) => (
          <div key={report.id} className="mb-8">
            <CardReport report={report} />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Home
