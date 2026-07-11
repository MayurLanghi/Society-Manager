import { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../api'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

export default function Voting() {
  const { user } = useAuth()
  const authHeaders = { headers: { Authorization: `Bearer ${user.token}` } }

  const[polls,setPolls] = useState([])
  const[pollForm,setPollForm] = useState({question:"",option1:"",option2:"",deadline:""})

  const fetchPolls=()=>{
    axios.get(`${API}/polls`,authHeaders)
    .then(res=>setPolls(res.data))
  }

  useEffect(()=>{
    fetchPolls()
  },[])

  const addPoll=(e)=>{
    e.preventDefault()
    axios.post(`${API}/polls`,{
      question:pollForm.question,
      options:[pollForm.option1,pollForm.option2],
      deadline:pollForm.deadline
    },authHeaders)
    .then(()=>{
      setPollForm({question:"",option1:"",option2:"",deadline:""})
      fetchPolls()
    })
  }

  const vote=(pollId,optionId)=>{
    axios.put(`${API}/polls/${pollId}/vote`,{optionId},authHeaders)
    .then(()=>fetchPolls())
  }

  return (
    <Layout>
      <h4 className="mb-3">Voting</h4>

      {user.role==="admin" &&
        <form onSubmit={addPoll} className="card p-3 mb-3">
          <input className="form-control mb-2" placeholder="Question" required
            value={pollForm.question} onChange={(e)=>setPollForm({...pollForm,question:e.target.value})} />
          <input className="form-control mb-2" placeholder="Option 1" required
            value={pollForm.option1} onChange={(e)=>setPollForm({...pollForm,option1:e.target.value})} />
          <input className="form-control mb-2" placeholder="Option 2" required
            value={pollForm.option2} onChange={(e)=>setPollForm({...pollForm,option2:e.target.value})} />
          <input className="form-control mb-2" type="datetime-local" required
            value={pollForm.deadline} onChange={(e)=>setPollForm({...pollForm,deadline:e.target.value})} />
          <button className="btn btn-primary" type="submit">Create Poll</button>
        </form>
      }

      {polls.map(p=>(
        <div className="card p-3 mb-2" key={p._id}>
          <h5>{p.question}</h5>
          {p.options.map(opt=>(
            <button key={opt._id} className="btn btn-outline-primary d-block w-100 mb-1 text-start"
              onClick={()=>vote(p._id,opt._id)} disabled={user.role!=="resident"}>
              {opt.text} — {opt.votes.length} votes
            </button>
          ))}
        </div>
      ))}
    </Layout>
  )
}
