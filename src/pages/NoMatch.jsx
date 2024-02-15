import React from 'react'
import { Link } from 'react-router-dom'

export default function NoMatch() {
  return (
   <>
    <h3>Sahifa topilmadi!</h3>
    <Link to={'/'}>Ortga</Link>
   </>
  )
}
