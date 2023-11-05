import React from 'react'
import Layout from '../../components/Layout/Layout'
import Adminmenu from '../../components/Layout/Adminmenu'
import { useAuth } from '../../context/AuthContext'

const Admindashboard = () => {
    const [auth] = useAuth()
  return (
    <Layout>
        <div className='row m-0 p-0'>
            <div className='col-md-4 m-3 p-3'>
                <Adminmenu/>
            </div>
            <div className='col-md-6 m-3 p-3'>
                <div className='card w-75 '>
                     <h5>Admin-name: {auth?.user?.name}</h5>
                     <h5>Admin-Email: {auth?.user?.email}</h5>
                     <h5>Admin-Contact: {auth?.user?.contact}</h5>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Admindashboard