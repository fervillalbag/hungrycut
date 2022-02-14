import React, { useRef, useState } from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker'
import { FaAngleLeft } from 'react-icons/fa'
import { useQuery } from '@apollo/client'

import useAuth from '@/hooks/useAuth'
import CardReport from '@/components/CardReport'
import { GET_REPORTS } from '@/graphql/queries/reports'
import { ReportType } from '@/types/Report'

import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css'

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
    <div className="bg-slate-50">
      <header className="flex items-center p-5">
        <button
          className="rounded border border-slate-200 bg-white p-3 text-xl"
          onClick={() => router.back()}
        >
          <FaAngleLeft />
        </button>

        <span className="ml-4 block text-xl font-semibold text-primary">
          Calendario
        </span>
      </header>

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
    </div>
  )
}

export default CalendarPage
