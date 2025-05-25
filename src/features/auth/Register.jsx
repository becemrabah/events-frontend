import React, { useState } from 'react';
import { useRegisterMutation } from './authApi';
import { setCredentials } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ email, password }).unwrap();
      dispatch(setCredentials({ token: res.token, user: res.user }));
      localStorage.setItem('token', res.token); 
      console.log('Utilisateur inscrit:', res);
      navigate('/login');
    } catch (err) {
      console.error('Erreur register:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="w-full max-w-[600px] bg-gray-700 p-6 rounded shadow">
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 bg-gray-800 rounded">
      <h2 className="text-xl mb-4">Créer un compte</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 p-2 rounded bg-gray-700"
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-2 p-2 rounded bg-gray-700"
        required
      />
      <button type="submit" className="w-full bg-indigo-600 p-2 rounded hover:bg-indigo-700">
        {isLoading ? 'Création...' : 'Créer'}
      </button>
      {error && <p className="text-red-400 mt-2">Erreur: {error?.data?.message}</p>}
    </form>
    </div>
    </div>
  );
};

export default Register;
