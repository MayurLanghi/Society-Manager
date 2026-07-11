import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const[loginForm,setLoginForm] = useState({email:"",password:""})
  const[msg,setMsg] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin=(e)=>{
    e.preventDefault()
    login(loginForm.email,loginForm.password,(err)=>setMsg(err),()=>navigate('/dashboard'))
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{minHeight:'100vh'}}>
      <div className="card p-4" style={{width:'380px'}}>
        <h4 className="mb-1 text-center">🏢 Society Management</h4>
        <p className="text-secondary text-center small mb-4">Sign in to your account</p>
        {msg && <div className="alert alert-info py-2">{msg}</div>}

        <form onSubmit={handleLogin}>
        <input className="form-control mb-2" placeholder="Email" required
          value={loginForm.email} onChange={(e)=>setLoginForm({...loginForm,email:e.target.value})} />
        <input className="form-control mb-3" type="password" placeholder="Password" required
          value={loginForm.password} onChange={(e)=>setLoginForm({...loginForm,password:e.target.value})} />
        <button className="btn btn-primary w-100" type="submit">Login</button>
        <p className="text-center mt-3 mb-0">
          New resident? <Link to="/register">Register</Link>
        </p>
        </form>
      </div>
    </div>
  )
}
