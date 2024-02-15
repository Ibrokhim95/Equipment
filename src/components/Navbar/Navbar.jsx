import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { FaUserFriends, FaReadme } from "react-icons/fa";
import {GiStakeHammer} from "react-icons/gi"

export default function Navbar({setSelected}) {
  return (
    <div className='navbar' >
      <div className="card">
      <NavLink to={'/'} onClick={e => setSelected(null)} ><FaUserFriends/><span>Mijozlar</span></NavLink>
      <NavLink to={'/history'} ><FaReadme/><span>Tarix</span></NavLink>
      <NavLink to={'/tools'} ><GiStakeHammer/><span>Uskunalar</span></NavLink>
      </div>
    </div>
  )
}
