import { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../api'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

const statusColors = {
  pending: "bg-warning text-dark",
  approved: "bg-success",
  rejected: "bg-danger",
  checked_out: "bg-secondary"
}

export default function Visitors() {
  const { user } = useAuth()
  const authHeaders = { headers: { Authorization: `Bearer ${user.token}` } }

  const[visitors,setVisitors] = useState([])
  const[visitorForm,setVisitorForm] = useState({name:"",phone:"",purpose:"guest",flatToVisit:""})

  const fetchVisitors=()=>{
    axios.get(`${API}/visitors`,authHeaders)
    .then(res=>setVisitors(res.data))
  }

  useEffect(()=>{
    fetchVisitors()
  },[])

  const addVisitor=(e)=>{
    e.preventDefault()
    axios.post(`${API}/visitors`,visitorForm,authHeaders)
    .then(()=>{
      setVisitorForm({name:"",phone:"",purpose:"guest",flatToVisit:""})
      fetchVisitors()
    })
  }

  const approveVisitor=(id,status)=>{
    axios.put(`${API}/visitors/${id}/approve`,{status},authHeaders)
    .then(()=>fetchVisitors())
  }

  const checkoutVisitor=(id)=>{
    axios.put(`${API}/visitors/${id}/checkout`,{},authHeaders)
    .then(()=>fetchVisitors())
  }

  return (
    <Layout>
      <h4 className="mb-3">Visitors</h4>

      {(user.role==="guard"||user.role==="admin") &&
        <form onSubmit={addVisitor} className="card p-3 d-flex flex-row gap-2 mb-3 flex-wrap">
          <input className="form-control" placeholder="Name" required
            value={visitorForm.name} onChange={(e)=>setVisitorForm({...visitorForm,name:e.target.value})} />
          <input className="form-control" placeholder="Phone" required
            value={visitorForm.phone} onChange={(e)=>setVisitorForm({...visitorForm,phone:e.target.value})} />
          <input className="form-control" placeholder="Flat to visit" required
            value={visitorForm.flatToVisit} onChange={(e)=>setVisitorForm({...visitorForm,flatToVisit:e.target.value})} />
          <button className="btn btn-primary" type="submit">Add Visitor</button>
        </form>
      }

      <table className="table table-bordered card p-3">
        <thead><tr><th>Name</th><th>Flat</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {visitors.map(v=>(
            <tr key={v._id}>
              <td>{v.name}</td>
              <td>{v.flatToVisit}</td>
              <td><span className={`badge ${statusColors[v.status]}`}>{v.status}</span></td>
              <td>
                {user.role==="resident" && v.status==="pending" &&
                  <>
                    <button className="btn btn-success btn-sm me-1" onClick={()=>approveVisitor(v._id,"approved")}>Approve</button>
                    <button className="btn btn-danger btn-sm" onClick={()=>approveVisitor(v._id,"rejected")}>Reject</button>
                  </>
                }
                {(user.role==="guard"||user.role==="admin") && v.status==="approved" &&
                  <button className="btn btn-primary btn-sm" onClick={()=>checkoutVisitor(v._id)}>Check out</button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}
