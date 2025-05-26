import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white text-center">
      <h1 className="display-4 fw-bold mb-3">Bienvenue sur Event Manager</h1>
      <p className="mb-4">Gérez vos événements facilement et rapidement.</p>
      <div className="d-flex gap-3">
        <Link to="/login" className="btn btn-primary px-4">
          Se connecter
        </Link>
        <Link to="/register" className="btn btn-secondary px-4">
          S’inscrire
        </Link>
      </div>
    </main>
  );
}
