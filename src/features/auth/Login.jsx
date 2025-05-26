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
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <main className="min-vh-100 d-flex align-items-center justify-content-center bg-secondary text-white">
          <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow w-100" style={{ maxWidth: '400px' }}>
            <h1 className="h4 mb-4">Se connecter</h1>

            <div className="mb-3">
              <input
                type="email"
                aria-label="Email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                aria-label="Mot de passe"
                placeholder="Mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="form-control"
              />
            </div>

            {error && (
              <div className="text-danger mb-3 small">{error}</div>
            )}

            <button type="submit" className="btn btn-primary w-100">Connexion</button>
          </form>
        </main>
      </div>
    </div>
  );
}

