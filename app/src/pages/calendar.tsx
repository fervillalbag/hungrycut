import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker'
import { FaAngleLeft } from 'react-icons/fa'
import { useQuery } from '@apollo/client'

import useAuth from '@/hooks/useAuth'
import CardReport from '@/components/CardReport'
import { GET_REPORTS } from '@/graphql/queries/reports'
import { ReportType } from '@/types/Report'
import Modal from '@/components/Modal'

import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css'
import { getToken } from '@/utils/helpers'
import { isAuth, isUserNotFound } from '@/utils/actions'

const CalendarPage: React.FC = () => {
  isUserNotFound()

  const { user } = useAuth()
  const router = useRouter()

  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedDay, setSelectedDay] = useState({
    day: Number(dayjs().format('D')),
    month: Number(dayjs().format('M')),
    year: Number(dayjs().format('YYYY'))
  })

  const currentDay =
    selectedDay.day < 10 ? `0${selectedDay.day}` : selectedDay.day
  const currentMonth =
    selectedDay.month < 10 ? `0${selectedDay.month}` : selectedDay.month
  const currentYear = selectedDay.year

  const currentDateConst = `${currentYear}-${currentMonth}-${currentDay}`

  useEffect(() => {
    const token = getToken()

    if (!token) {
      return null
    } else {
      isAuth()
    }
  }, [])

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

      <div className="mt-2 h-[calc(100vh_-_86px)] px-5">
        <Calendar
          colorPrimary="rgb(58, 62, 65)"
          value={selectedDay}
          onChange={e => {
            setSelectedDay(e)
            setShowModal(true)
          }}
          shouldHighlightWeekends
        />
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        type="full"
        title={currentDateConst}
      >
        <div className="mt-6">
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
      </Modal>
    </div>
  )
}

module.exports = CalendarPage
