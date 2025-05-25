import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Events from '../features/events/EventsList'
import AddEvent from '../features/events/AddEvent'
import Dashboard from '../pages/dashboard/Dashboard'
import Login from '../features/auth/Login'
import Register from '../features/auth/Register'

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={
          <>
            <AddEvent />
            <Events />
          </>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}
