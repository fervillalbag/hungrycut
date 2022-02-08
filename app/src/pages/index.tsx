import React from 'react'

import useAuth from '@/hooks/useAuth'
import Layout from '@/components/Layout'
import CardReport from '@/components/CardReport'
import { useQuery } from '@apollo/client'
import { GET_REPORTS } from '@/graphql/queries/reports'

const Home: React.FC = () => {
  const { user } = useAuth()

  const { data: reports, loading } = useQuery(GET_REPORTS, {
    variables: {
      idUser: user?.id
    }
  })

  if (loading) return null

  console.log(reports)

  return (
    <Layout>
      <header className="p-5">
        <span className="block text-2xl font-bold text-primary">Inicio</span>
      </header>

      <div className="px-5">
        {reports.getReports.map((report: any) => (
          <div key={report.id}>
            <CardReport report={report} />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Home
