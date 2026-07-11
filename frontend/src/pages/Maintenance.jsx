import { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../api'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

const statusColors = {
  pending: "bg-warning text-dark",
  paid: "bg-success"
}

export default function Maintenance() {
  const { user } = useAuth()
  const authHeaders = { headers: { Authorization: `Bearer ${user.token}` } }

  const[bills,setBills] = useState([])
  const[billForm,setBillForm] = useState({flatNumber:"",residentId:"",month:"",year:"",amount:"",dueDate:""})

  const fetchBills=()=>{
    axios.get(`${API}/maintenance`,authHeaders)
    .then(res=>setBills(res.data))
  }

  useEffect(()=>{
    fetchBills()
  },[])

  const addBill=(e)=>{
    e.preventDefault()
    axios.post(`${API}/maintenance`,billForm,authHeaders)
    .then(()=>{
      setBillForm({flatNumber:"",residentId:"",month:"",year:"",amount:"",dueDate:""})
      fetchBills()
    })
  }

  const markPaid=(id)=>{
    axios.put(`${API}/maintenance/${id}/pay`,{},authHeaders)
    .then(()=>fetchBills())
  }

  return (
    <Layout>
      <h4 className="mb-3">Maintenance</h4>

      {user.role==="admin" &&
        <form onSubmit={addBill} className="card p-3 d-flex flex-row gap-2 mb-3 flex-wrap">
          <input className="form-control" placeholder="Flat number" required
            value={billForm.flatNumber} onChange={(e)=>setBillForm({...billForm,flatNumber:e.target.value})} />
          <input className="form-control" placeholder="Resident User ID" required
            value={billForm.residentId} onChange={(e)=>setBillForm({...billForm,residentId:e.target.value})} />
          <input className="form-control" type="number" placeholder="Month" required
            value={billForm.month} onChange={(e)=>setBillForm({...billForm,month:e.target.value})} />
          <input className="form-control" type="number" placeholder="Year" required
            value={billForm.year} onChange={(e)=>setBillForm({...billForm,year:e.target.value})} />
          <input className="form-control" type="number" placeholder="Amount" required
            value={billForm.amount} onChange={(e)=>setBillForm({...billForm,amount:e.target.value})} />
          <input className="form-control" type="date" required
            value={billForm.dueDate} onChange={(e)=>setBillForm({...billForm,dueDate:e.target.value})} />
          <button className="btn btn-primary" type="submit">Create Bill</button>
        </form>
      }

      <table className="table table-bordered card p-3">
        <thead><tr><th>Flat</th><th>Month/Year</th><th>Amount</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {bills.map(b=>(
            <tr key={b._id}>
              <td>{b.flatNumber}</td>
              <td>{b.month}/{b.year}</td>
              <td>₹{b.amount}</td>
              <td><span className={`badge ${statusColors[b.status]}`}>{b.status}</span></td>
              <td>{b.status!=="paid" && <button className="btn btn-primary btn-sm" onClick={()=>markPaid(b._id)}>Mark Paid</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}
