import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker'

import Layout from '@/components/Layout'

import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css'
import dayjs from 'dayjs'
import { useQuery } from '@apollo/client'
import { GET_REPORTS } from '@/graphql/queries/reports'
import useAuth from '@/hooks/useAuth'
import CardReport from '@/components/CardReport'
import { ReportType } from '@/types/Report'

const CalendarPage: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()

  const [selectedDay, setSelectedDay] = useState({
    day: Number(dayjs().format('D')),
    month: Number(dayjs().format('M')),
    year: Number(dayjs().format('YYYY'))
  })

  const dateRef = useRef(null)

  const currentDay =
    selectedDay.day < 10 ? `0${selectedDay.day}` : selectedDay.day
  const currentMonth =
    selectedDay.month < 10 ? `0${selectedDay.month}` : selectedDay.month
  const currentYear = selectedDay.year

  const currentDateConst = `${currentYear}-${currentMonth}-${currentDay}`

  const { data: reports, loading } = useQuery(GET_REPORTS, {
    variables: {
      idUser: user?.id,
      date: dayjs(currentDateConst).format('YYYY-MM-DD')
    }
  })

  return (
    <Layout>
      <header className="p-5">
        <span className="block text-xl font-semibold text-primary">
          Calendario
        </span>
      </header>

      <div className="grid grid-cols-2 gap-x-4 px-5 pb-5">
        <button
          className={`rounded border border-primary py-2 font-semibold text-primary`}
          onClick={() => router.push('/history')}
        >
          Todos
        </button>
        <button
          className={`rounded border bg-primary py-2 font-semibold text-white`}
          onClick={() => router.push('/calendar')}
        >
          Calendario
        </button>
      </div>

      <div className="mt-2 px-5">
        <Calendar
          colorPrimary="rgb(58, 62, 65)"
          value={selectedDay}
          onChange={e => {
            dateRef.current.scrollIntoView()
            setSelectedDay(e)
          }}
          shouldHighlightWeekends
        />
      </div>

      <div ref={dateRef} className="mt-6 px-5">
        <span className="block text-2xl">{currentDateConst}</span>
      </div>

      <div className="mt-6 px-5">
        {loading ? (
          <span className="block py-28 text-center">Cargando..</span>
        ) : reports?.getReports.length === 0 ? (
          <div className="flex items-center justify-center py-28">
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

export default CalendarPage
