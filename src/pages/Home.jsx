import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur Event Manager</h1>
      <p className="mb-6">Gérez vos événements facilement et rapidement.</p>
      <div className="space-x-4">
        <Link to="/login" className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700">Se connecter</Link>
        <Link to="/register" className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">S’inscrire</Link>
      </div>
    </main>
  )
}
