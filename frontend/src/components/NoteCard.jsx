/* eslint-disable no-unused-vars */
import {PenSquareIcon, Trash2, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'
const NoteCard = (props) => {
    const {note , setNote} = props

    const handleDelete = (e , id)=>{
    e.preventDefault()
    if(!window.confirm("Are you sure you want to delete this note")) return
    else{
        api.delete(`/notes/${id}`)
        .then(res=>{
            toast.success("Note deleted successfully")
            setNote((prev)=>prev.filter(note=>note._id!==id))
        })
        .catch(err=>{
            toast.error("Failed to delete note")
        })
    }

    }
  return (
    <Link to={`/update/${note._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF90]'>
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className='text-base-content/70 line-clamp-3'>{note.content}
            </p>

            <div className='card-actions justify-between items-center mt-4'>
                <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
                <div className='flex items-center gap-1'>
                    <PenSquareIcon className='size-4'/>
                    <button onClick={(e)=>handleDelete(e , note._id)} className='btn btn-ghost btn-xs text-error'>
                        <Trash2Icon className='size-4'/>
                    </button>

                </div>

            </div>

        </div>

    </Link>
  )
}

export default NoteCard