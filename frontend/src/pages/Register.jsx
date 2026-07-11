import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const[registerForm,setRegisterForm] = useState({name:"",email:"",password:"",phone:"",flatNumber:""})
  const[msg,setMsg] = useState("")
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleRegister=(e)=>{
    e.preventDefault()
    register(registerForm,(result)=>{
      setMsg(result)
      setTimeout(()=>navigate('/login'),1500)
    })
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{minHeight:'100vh'}}>
      <div className="card p-4" style={{width:'380px'}}>
        <h4 className="mb-1 text-center">Resident Registration</h4>
        <p className="text-secondary text-center small mb-4">Your account will need admin approval</p>
        {msg && <div className="alert alert-info py-2">{msg}</div>}

        <form onSubmit={handleRegister}>
          <input className="form-control mb-2" placeholder="Name" required
            value={registerForm.name} onChange={(e)=>setRegisterForm({...registerForm,name:e.target.value})} />
          <input className="form-control mb-2" placeholder="Email" required
            value={registerForm.email} onChange={(e)=>setRegisterForm({...registerForm,email:e.target.value})} />
          <input className="form-control mb-2" type="password" placeholder="Password" required
            value={registerForm.password} onChange={(e)=>setRegisterForm({...registerForm,password:e.target.value})} />
          <input className="form-control mb-2" placeholder="Phone" required
            value={registerForm.phone} onChange={(e)=>setRegisterForm({...registerForm,phone:e.target.value})} />
          <input className="form-control mb-3" placeholder="Flat Number" required
            value={registerForm.flatNumber} onChange={(e)=>setRegisterForm({...registerForm,flatNumber:e.target.value})} />
          <button className="btn btn-primary w-100" type="submit">Register</button>
          <p className="text-center mt-3 mb-0">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
