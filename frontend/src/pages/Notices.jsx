import { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../api'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

const priorityColors = {
  low: "bg-info text-dark",
  medium: "bg-warning text-dark",
  high: "bg-danger"
}

export default function Notices() {
  const { user } = useAuth()
  const authHeaders = { headers: { Authorization: `Bearer ${user.token}` } }

  const[notices,setNotices] = useState([])
  const[noticeForm,setNoticeForm] = useState({title:"",content:"",priority:"medium"})

  const fetchNotices=()=>{
    axios.get(`${API}/notices`,authHeaders)
    .then(res=>setNotices(res.data))
  }

  useEffect(()=>{
    fetchNotices()
  },[])

  const addNotice=(e)=>{
    e.preventDefault()
    axios.post(`${API}/notices`,noticeForm,authHeaders)
    .then(()=>{
      setNoticeForm({title:"",content:"",priority:"medium"})
      fetchNotices()
    })
  }

  const deleteNotice=(id)=>{
    axios.delete(`${API}/notices/${id}`,authHeaders)
    .then(()=>fetchNotices())
  }

  return (
    <Layout>
      <h4 className="mb-3">Notices</h4>

      {user.role==="admin" &&
        <form onSubmit={addNotice} className="card p-3 mb-3">
          <input className="form-control mb-2" placeholder="Title" required
            value={noticeForm.title} onChange={(e)=>setNoticeForm({...noticeForm,title:e.target.value})} />
          <textarea className="form-control mb-2" placeholder="Content" required
            value={noticeForm.content} onChange={(e)=>setNoticeForm({...noticeForm,content:e.target.value})} />
          <button className="btn btn-primary" type="submit">Post Notice</button>
        </form>
      }

      {notices.map(n=>(
        <div className="card p-3 mb-2" key={n._id}>
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="mb-1">{n.title}</h5>
            <span className={`badge ${priorityColors[n.priority]}`}>{n.priority}</span>
          </div>
          <p className="text-secondary">{n.content}</p>
          {user.role==="admin" && <button className="btn btn-danger btn-sm" onClick={()=>deleteNotice(n._id)}>Delete</button>}
        </div>
      ))}
    </Layout>
  )
}
