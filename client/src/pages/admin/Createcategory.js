import React from 'react'
import { useEffect,useState } from 'react'
import axios from "axios"
import Layout from '../../components/Layout/Layout'
import Adminmenu from '../../components/Layout/Adminmenu'
import Categorymenu from '../../components/Categorymenu'

const Createcategory = () => {

  const [categories,setCategories] = useState()

  useEffect(()=>{
    try {
      const {data} = axios.get(`${process.env.REACT_APP_API}/api/v1/category/getcategory`)
      setCategories(data.categories)
      console.log(categories)
    } catch (error) {
      console.log(error)
    }
  },[])

  return (
    <Layout>
        <div className='row m-0 p-0'>
            <div className='col-md-4 m-3 p-3'>
                <Adminmenu/>
            </div>
            <div className='col-md-6 m-3 p-3'>
              <div className='card'>
                <Categorymenu/>
              <table className="table">
  <thead>
    <tr><th>
    <h3>Manage Categories</h3>
    </th>
    </tr>
    <tr>
      <th scope="col">Categories</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {categories?.map(item=>(
      <tr>
      <td>{item.name}</td>
      <td>
        <button className='btn btn-primary'>Edit</button>
      </td>
    </tr>
    ))}
  </tbody>
</table>

              </div>
            </div>
        </div>
    </Layout>
  )
}

export default Createcategory