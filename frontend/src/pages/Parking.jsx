import { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../api'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

export default function Parking() {
  const { user } = useAuth()
  const authHeaders = { headers: { Authorization: `Bearer ${user.token}` } }

  const[slots,setSlots] = useState([])
  const[slotForm,setSlotForm] = useState({slotNumber:"",type:"four_wheeler"})

  const fetchSlots=()=>{
    axios.get(`${API}/parking`,authHeaders)
    .then(res=>setSlots(res.data))
  }

  useEffect(()=>{
    fetchSlots()
  },[])

  const addSlot=(e)=>{
    e.preventDefault()
    axios.post(`${API}/parking`,slotForm,authHeaders)
    .then(()=>{
      setSlotForm({slotNumber:"",type:"four_wheeler"})
      fetchSlots()
    })
  }

  const assignSlot=(id)=>{
    const flatNumber = prompt("Flat number?")
    const vehicleNumber = prompt("Vehicle number?")
    if(!flatNumber || !vehicleNumber) return
    axios.put(`${API}/parking/${id}/assign`,{flatNumber,vehicleNumber},authHeaders)
    .then(()=>fetchSlots())
  }

  const releaseSlot=(id)=>{
    axios.put(`${API}/parking/${id}/release`,{},authHeaders)
    .then(()=>fetchSlots())
  }

  return (
    <Layout>
      <h4 className="mb-3">Parking</h4>

      {user.role==="admin" &&
        <form onSubmit={addSlot} className="card p-3 d-flex flex-row gap-2 mb-3">
          <input className="form-control" placeholder="Slot number" required
            value={slotForm.slotNumber} onChange={(e)=>setSlotForm({...slotForm,slotNumber:e.target.value})} />
          <select className="form-control" value={slotForm.type}
            onChange={(e)=>setSlotForm({...slotForm,type:e.target.value})}>
            <option value="four_wheeler">Four Wheeler</option>
            <option value="two_wheeler">Two Wheeler</option>
          </select>
          <button className="btn btn-primary" type="submit">Add Slot</button>
        </form>
      }

      <div className="row">
        {slots.map(s=>(
          <div className="col-4 mb-3" key={s._id}>
            <div className="card p-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h5 className="mb-0">Slot {s.slotNumber}</h5>
                <span className={`badge ${s.isOccupied ? "bg-danger" : "bg-success"}`}>{s.isOccupied ? "Occupied" : "Free"}</span>
              </div>
              <p className="text-secondary small mb-2">{s.type.replace('_',' ')}</p>
              {s.isOccupied && <p className="small">Flat: {s.flatNumber}</p>}
              {user.role==="admin" && (
                s.isOccupied
                  ? <button className="btn btn-danger btn-sm" onClick={()=>releaseSlot(s._id)}>Release</button>
                  : <button className="btn btn-primary btn-sm" onClick={()=>assignSlot(s._id)}>Assign</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
