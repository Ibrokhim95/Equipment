import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './History.css'

export default function History() {
  return (
    <div className='history' >
      <div className="card">
        <div className="links">
          <NavLink to={'customers'}>Mijozlar tarixi</NavLink>
          <NavLink to={'trade'} >Savdo tarixi</NavLink>
        </div>

      </div>
        <Outlet/>
    </div>
  )
}
