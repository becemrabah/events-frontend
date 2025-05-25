import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from './authApi';
import { setCredentials } from './authSlice';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();

      dispatch(setCredentials({ token: res.token, user: res.user }));
      localStorage.setItem('token', res.token);

      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur login:', err);
      setError('Email ou mot de passe incorrect.');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
     <div className="w-full max-w-[600px] bg-gray-700 p-6 rounded shadow">
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded shadow max-w-md w-full">
        <h1 className="text-2xl mb-4">Se connecter</h1>
        <input 
          type="email"
          aria-label="Email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-600"
        />
        <input 
          type="password"
          aria-label="Mot de passe"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600"
        />
           {error && (
          <div className="text-red-500 mb-4 text-sm">{error}</div>
        )}
        <button type="submit" className="w-full bg-indigo-600 py-2 rounded hover:bg-indigo-700">Connexion</button>
      </form>
    </main>
    </div>
        </div>
  )
}
