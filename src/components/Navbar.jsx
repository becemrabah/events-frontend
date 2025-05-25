import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center text-white">
      <Link to="/" className="text-lg font-bold">Event Manager</Link>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/login" className="hover:underline">Se connecter</Link>
      </div>
    </nav>
  )
}
