import React from 'react'
import { NavLink } from 'react-router-dom'

const Adminmenu = () => {
  return (
    <div className='container-fluid'><div className='list-group text-center'>
       <h4>Admin Panel</h4>
       <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</NavLink>
       <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
       <NavLink to="/dashboard/admin/display-users" className="list-group-item list-group-item-action">Display Users</NavLink>
    </div>
    </div>
  )
}

export default Adminmenu