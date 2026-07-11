import { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../api'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

export default function Payments() {
  const { user } = useAuth()
  const authHeaders = { headers: { Authorization: `Bearer ${user.token}` } }

  const[payments,setPayments] = useState([])
  const[bills,setBills] = useState([])
  const[selectedBillId,setSelectedBillId] = useState("")

  const fetchPayments=()=>{
    axios.get(`${API}/payments`,authHeaders)
    .then(res=>setPayments(res.data))
  }

  const fetchBills=()=>{
    axios.get(`${API}/maintenance`,authHeaders)
    .then(res=>setBills(res.data))
  }

  useEffect(()=>{
    fetchPayments()
    if(user.role==="resident") fetchBills()
  },[])

  const payBill=(e)=>{
    e.preventDefault()
    const bill = bills.find(b=>b._id===selectedBillId)
    if(!bill) return
    axios.post(`${API}/payments`,{maintenanceId:bill._id,amount:bill.amount,method:"upi"},authHeaders)
    .then(()=>{
      setSelectedBillId("")
      fetchPayments()
      fetchBills()
    })
  }

  return (
    <Layout>
      <h4 className="mb-3">Payments</h4>

      {user.role==="resident" &&
        <form onSubmit={payBill} className="card p-3 d-flex flex-row gap-2 mb-3">
          <select className="form-control" value={selectedBillId} onChange={(e)=>setSelectedBillId(e.target.value)} required>
            <option value="">Select a bill to pay</option>
            {bills.filter(b=>b.status!=="paid").map(b=>(
              <option key={b._id} value={b._id}>{b.month}/{b.year} - {b.amount}</option>
            ))}
          </select>
          <button className="btn btn-primary" type="submit">Pay Now</button>
        </form>
      }

      <table className="table table-bordered card p-3">
        <thead><tr><th>Amount</th><th>Method</th><th>Paid At</th></tr></thead>
        <tbody>
          {payments.map(p=>(
            <tr key={p._id}>
              <td>{p.amount}</td>
              <td>{p.method}</td>
              <td>{new Date(p.paidAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}
