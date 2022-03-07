import React from 'react'

import Navbar from '@/components/Navbar'

const Layout: React.FC = ({ children }) => {
  return (
    <div className="mx-auto min-h-screen max-w-lg bg-slate-50">
      <div className="pb-20">{children}</div>
      <Navbar />
    </div>
  )
}

module.exports = Layout
