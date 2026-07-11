import { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../api'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const authHeaders = { headers: { Authorization: `Bearer ${user.token}` } }

  const[stats,setStats] = useState({visitors:0,complaints:0,notices:0})

  useEffect(()=>{
    axios.get(`${API}/visitors`,authHeaders)
    .then(res=>setStats(s=>({...s,visitors:res.data.filter(v=>v.status==="pending").length})))

    axios.get(`${API}/complaints`,authHeaders)
    .then(res=>setStats(s=>({...s,complaints:res.data.filter(c=>c.status==="open").length})))

    axios.get(`${API}/notices`,authHeaders)
    .then(res=>setStats(s=>({...s,notices:res.data.length})))
  },[])

  return (
    <Layout>
      <h4 className="mb-1">Welcome, {user.name} 👋</h4>
      <p className="text-secondary mb-4">Here's what's happening in your society today.</p>

      <div className="row mb-4">
        <div className="col-4">
          <div className="stat-card">
            <div className="stat-value">{stats.visitors}</div>
            <div className="stat-label">Pending Visitor Approvals</div>
          </div>
        </div>
        <div className="col-4">
          <div className="stat-card">
            <div className="stat-value">{stats.complaints}</div>
            <div className="stat-label">Open Complaints</div>
          </div>
        </div>
        <div className="col-4">
          <div className="stat-card">
            <div className="stat-value">{stats.notices}</div>
            <div className="stat-label">Active Notices</div>
          </div>
        </div>
      </div>

      <div className="card p-3">
        <h6>Quick tips</h6>
        <ul className="text-secondary small mb-0">
          <li>Use the sidebar to navigate between modules.</li>
          <li>Residents can approve/reject visitors requesting entry to their flat.</li>
          <li>Admins can manage users, generate maintenance bills, and post notices.</li>
        </ul>
      </div>
    </Layout>
  )
}
