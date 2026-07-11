import { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../api'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

export default function Users() {
  const { user } = useAuth()
  const authHeaders = { headers: { Authorization: `Bearer ${user.token}` } }

  const[users,setUsers] = useState([])

  const fetchUsers=()=>{
    axios.get(`${API}/users`,authHeaders)
    .then(res=>setUsers(res.data))
  }

  useEffect(()=>{
    fetchUsers()
  },[])

  const approveUser=(id)=>{
    axios.put(`${API}/users/${id}/approve`,{},authHeaders)
    .then(()=>fetchUsers())
  }

  return (
    <Layout>
      <h4 className="mb-3">Manage Users</h4>

      <table className="table table-bordered card p-3">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Approved</th><th></th></tr></thead>
        <tbody>
          {users.map(u=>(
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.isApproved ? "Yes" : "No"}</td>
              <td>{!u.isApproved && <button className="btn btn-success btn-sm" onClick={()=>approveUser(u._id)}>Approve</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}
