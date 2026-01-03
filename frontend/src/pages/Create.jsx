/* eslint-disable no-unused-vars */
import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../lib/axios'
const Create = () => {
  const navigate = useNavigate()
  const[title , setTitle] = useState("")
  const[content , setContent] = useState("")

  const[loading ,setLoading] = useState(false)

  const handleSubmit = (e)=>{
    e.preventDefault()
   if(!title.trim() || !content.trim()){
    toast.error("All fields are required ")
   }else{
   setLoading(true)
   api.post('/notes' , {title , content})
   .then(res=>{
    toast.success("you created note Successfully")
    navigate('/')
    setLoading(false)
  })
   .catch(err=>{
    if(err.response.status ===429){
      toast.error("Slow down! You are creating notes too fast" , {
        duration:4000,
        icon: "💀",
      })
    }
   })

  }
}
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to='/' className='btn btn-ghost mb-6'>
          <ArrowLeftIcon className='size-5'/>
          Back to Notes
          
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4 flex flex-col gap-2'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input type="text"  placeholder='Note Tilte' className='input input-bordered' onChange={(e)=>setTitle(e.target.value)}/>

                </div>
                <div className='form-control mb-4 flex flex-col gap-2'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                 <textarea value={content} placeholder='Write Content here...' className='textarea textarea-bordered h-32' onChange={(e)=>setContent(e.target.value)}/>

                </div>

                <div className="card-actions justify-end">
                  <button type='submit' className='btn btn-primary' disabled ={loading}>
                    {loading?"Creating...":"Create Note"}
                  </button>
                </div>


              </form>
            </div>

          </div>
         </div>

      </div>

    </div>
  )
}

export default Create