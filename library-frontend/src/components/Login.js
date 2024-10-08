import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client'); 
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', res.data.token); 

            if (res.data.role === 'admin') {
                navigate('/dashboard'); 
            } else if (res.data.role === 'client') {
                navigate('/client-dashboard'); 
            } else {
                setError('Accès interdit');
            }
        } catch (err) {
            setError('Nom d’utilisateur ou mot de passe incorrect.');
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Connexion</h2>
            <div className="card">
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="form-group">
                        <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="client">Client</option>
                            <option value="admin">Administrateur</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Se connecter</button>
                </form>
                {error && <p className="text-danger mt-3">{error}</p>}
                <p className="text-center mt-3">
                    Pas encore inscrit ? <a href="/register">S'inscrire</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
