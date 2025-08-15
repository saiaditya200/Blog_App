import React from 'react'
import {Outlet,NavLink} from 'react-router-dom'

function AdminProfile() {
  return(
    <div className='admin-profile'>
          <ul className="d-flex justify-content-around list-unstyled fs-3">
            <li className='nav-item'>
              <NavLink to='active' className="nav-link">Active Members</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='inactive' className="nav-link">Inactive Members</NavLink>
            </li>
          </ul>
          <div className="mt-5">
            <Outlet />
          </div>
    </div>
  )
}

export default AdminProfile