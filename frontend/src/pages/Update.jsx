/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import { Link , useNavigate ,useParams } from 'react-router-dom'
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
const Update = () => {
  const {id}  = useParams()
  const [note , setNote] = useState(null)
  const [loading , setLoading] = useState(true)
  const [saving , setSaving] = useState(false)
const navigate = useNavigate()
  useEffect(()=>{
    api.get(`/notes/${id}`)
    .then(res=>{
     setNote(res.data)
     setLoading(false)
    }).catch(err=>{ 
      toast.error("Failed to load note")

    })
  } ,[id])
   const handleDelete = () => {
      if (!window.confirm("Are you sure you want to delete this note?")) return;
      else{
         api.delete(`/notes/${id}`)
        .then(res=>{
            toast.success("Note deleted successfully")
            navigate('/')
        })
        .catch(err=>{
            toast.error("Failed to delete note")
        })
      }
  };

  const handleSave = () => {
    if(!note.title.trim() &&  !note.content.trim()){
      toast.error("Please add title and content")
      return;
    }else{
      setSaving(true)
      api.put(`/notes/${id}` , note)
      .then(res=>{
        toast.success("Note Updated successfully")
        setSaving(false)
        navigate('/')
      }).catch(err=>{
        toast.error("Failed to update note")
      })
    }
  };

  if(loading){
   return  <div className='min-h-screen bg-base-200 flex items-center justify-center'>
     <LoaderIcon className='animate-spin size-5'/>
    </div>
  }
  return (
   <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Update