/* eslint-disable no-unused-vars */
import React ,{useState , useEffect} from 'react'
import Navbar from '../components/Navbar'
import RatelimitUi from '../components/RatelimitUi'
import axios from 'axios'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import NotesNotFound from '../components/NotesNotFound'
const HomePage = () => {

  const[rateLimited , setRateLimited]  = useState(true)
  const [note , setNote] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    api.get('/notes')
    .then(res=>{
      setRateLimited(false)
      setNote(res.data)
      setLoading(false)

    })
    .catch(err=>{
      if(err.response.status === 429){
        setRateLimited(true)
      }else{
        toast.error("failed to load notes")
      }
    }
  )

  } , [])

  return (
    <div className='min-h-screen'>
      <Navbar/>
   {rateLimited&&<RatelimitUi/>}
   <div className='max-w-7xl mx-auto p-4 mt-6'>
    {loading&&<div className='text-center text-primary py-10'>Loading notes...</div>}
   {note.length===0 && !rateLimited &&<NotesNotFound/>}
    {
      note && Array.isArray(note)&&(
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6'>
          {
            note.map(note=>(
              <NoteCard key={note._id} note={note} setNote = {setNote}/>
            ))
          }

          </div>
      )
    }
   </div>
    </div>
  )
}

export default HomePage