import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import {useAuth} from "../context/AuthContext"

const Homepage = () => {

  const [auth,setAuth] = useAuth()

  return (
    <Layout>
      <h1>Homepage</h1>
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  )
}

export default Homepage