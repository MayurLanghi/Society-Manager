import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Visitors from './pages/Visitors'
import Maintenance from './pages/Maintenance'
import Parking from './pages/Parking'
import Notices from './pages/Notices'
import Complaints from './pages/Complaints'
import Payments from './pages/Payments'
import Voting from './pages/Voting'
import Users from './pages/Users'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/visitors" element={<ProtectedRoute><Visitors /></ProtectedRoute>} />
      <Route path="/maintenance" element={<ProtectedRoute><Maintenance /></ProtectedRoute>} />
      <Route path="/parking" element={<ProtectedRoute><Parking /></ProtectedRoute>} />
      <Route path="/notices" element={<ProtectedRoute><Notices /></ProtectedRoute>} />
      <Route path="/complaints" element={<ProtectedRoute><Complaints /></ProtectedRoute>} />
      <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
      <Route path="/voting" element={<ProtectedRoute><Voting /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute allowedRoles={["admin"]}><Users /></ProtectedRoute>} />

      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}
