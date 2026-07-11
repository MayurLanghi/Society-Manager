import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/visitors", label: "Visitors" },
  { to: "/maintenance", label: "Maintenance" },
  { to: "/parking", label: "Parking" },
  { to: "/notices", label: "Notices" },
  { to: "/complaints", label: "Complaints" },
  { to: "/payments", label: "Payments" },
  { to: "/voting", label: "Voting" },
]

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <div className="sidebar d-flex flex-column">
      <div className="mb-4">
        <h5 className="mb-0">🏢 Society App</h5>
        <small className="text-secondary">{user.name} · {user.role}</small>
      </div>

      <div className="flex-grow-1">
        {links.map(link => (
          <NavLink key={link.to} to={link.to}
            className={({isActive}) => `nav-link-custom ${isActive ? 'active' : ''}`}>
            {link.label}
          </NavLink>
        ))}
        {user.role==="admin" &&
          <NavLink to="/users" className={({isActive}) => `nav-link-custom ${isActive ? 'active' : ''}`}>
            Manage Users
          </NavLink>
        }
      </div>

      <button className="btn btn-outline-danger btn-sm mt-3" onClick={logout}>Log out</button>
    </div>
  )
}
