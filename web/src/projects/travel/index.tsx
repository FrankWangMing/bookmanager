import React from 'react'
import { Outlet } from 'react-router-dom'
import MNavbar from '../../components/Navbar'
export const Travel = () => {
  return (
    <div>
      {/*<MNavbar />*/}
      <div>
        <Outlet />
      </div>
    </div>
  )
}
