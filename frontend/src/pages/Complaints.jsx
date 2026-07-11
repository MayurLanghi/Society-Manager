import { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../api'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

const statusColors = {
  open: "bg-warning text-dark",
  in_progress: "bg-info text-dark",
  resolved: "bg-success"
}

export default function Complaints() {
  const { user } = useAuth()
  const authHeaders = { headers: { Authorization: `Bearer ${user.token}` } }

  const[complaints,setComplaints] = useState([])
  const[complaintForm,setComplaintForm] = useState({title:"",description:"",category:"other"})

  const fetchComplaints=()=>{
    axios.get(`${API}/complaints`,authHeaders)
    .then(res=>setComplaints(res.data))
  }

  useEffect(()=>{
    fetchComplaints()
  },[])

  const addComplaint=(e)=>{
    e.preventDefault()
    axios.post(`${API}/complaints`,complaintForm,authHeaders)
    .then(()=>{
      setComplaintForm({title:"",description:"",category:"other"})
      fetchComplaints()
    })
  }

  const updateComplaintStatus=(id,status)=>{
    axios.put(`${API}/complaints/${id}/status`,{status},authHeaders)
    .then(()=>fetchComplaints())
  }

  return (
    <Layout>
      <h4 className="mb-3">Complaints</h4>

      {user.role==="resident" &&
        <form onSubmit={addComplaint} className="card p-3 mb-3">
          <input className="form-control mb-2" placeholder="Title" required
            value={complaintForm.title} onChange={(e)=>setComplaintForm({...complaintForm,title:e.target.value})} />
          <textarea className="form-control mb-2" placeholder="Describe the issue" required
            value={complaintForm.description} onChange={(e)=>setComplaintForm({...complaintForm,description:e.target.value})} />
          <button className="btn btn-primary" type="submit">Raise Complaint</button>
        </form>
      }

      {complaints.map(c=>(
        <div className="card p-3 mb-2" key={c._id}>
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="mb-1">{c.title}</h5>
            <span className={`badge ${statusColors[c.status]}`}>{c.status.replace('_',' ')}</span>
          </div>
          <p className="text-secondary">{c.description}</p>
          {user.role==="admin" &&
            <div>
              <button className="btn btn-info btn-sm me-2" onClick={()=>updateComplaintStatus(c._id,"in_progress")}>In Progress</button>
              <button className="btn btn-success btn-sm" onClick={()=>updateComplaintStatus(c._id,"resolved")}>Resolved</button>
            </div>
          }
        </div>
      ))}
    </Layout>
  )
}
