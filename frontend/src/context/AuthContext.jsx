import { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { API } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {

  const[user,setUser] = useState(()=>{
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (email,password,onError,onSuccess) => {
    axios.post(`${API}/auth/login`,{email,password})
    .then(res=>{
      if(typeof res.data === "string"){
        onError(res.data) 
        return
      }
      localStorage.setItem('user',JSON.stringify(res.data))
      setUser(res.data)
      if(onSuccess) onSuccess()
    })
  }

  const register = (form,onDone) => {
    axios.post(`${API}/auth/register`,form)
    .then(res=>{
      onDone(typeof res.data === "string" ? res.data : res.data.message)
    })
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user,login,register,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
