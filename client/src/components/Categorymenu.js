import axios from 'axios'
import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Categorymenu = () => {
    const [name,setName] = useEffect()
    const [auth] = useAuth()
    const handelSubmit = async()=>{
      
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{
                name,
                headers:{
                    "authorization" : auth?.token
                }
            })
            if(res?.data?.success === "true"){
                toast.success(res?.data?.messege)
            }
            else{
                toast.error(res?.data?.messege)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='container p-3'>
        <form>
  <div className="form-group p-4">
   <h3>Create New Category</h3>
    <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" placeholder="Enter email" />
  <button type="submit" onClick={handelSubmit} className="m-3 btn btn-primary">Submit</button>
    
  </div>
  
</form>

    </div>
  )
}

export default Categorymenu