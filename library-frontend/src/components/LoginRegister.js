import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css'; 

const LoginRegister = () => {
    
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [role, setRole] = useState('client');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username: loginUsername, password: loginPassword });
            localStorage.setItem('token', res.data.token);
            navigate(res.data.role === 'admin' ? '/dashboard' : '/client-dashboard');
        } catch (err) {
            setError('Nom d’utilisateur ou mot de passe incorrect.');
        }
    };

   
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username: registerUsername, password: registerPassword, role });
            alert('Inscription réussie !');
            setRegisterUsername('');
            setRegisterPassword('');
        } catch (err) {
            setError('Erreur lors de l\'inscription. Vérifiez si le nom d’utilisateur existe déjà.');
        }
    };

    return (
        <div className="container">
            <h2 className="text-center text-white font-weight-bold">Connexion / Inscription</h2>

            <div className="row">
               
                <div className="col-md-6">
                    <div className="card">
                        <form onSubmit={handleLoginSubmit}>
                            <h3>Connexion</h3>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nom d'utilisateur"
                                    value={loginUsername}
                                    onChange={(e) => setLoginUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Mot de passe"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Se connecter</button>
                        </form>
                    </div>
                </div>

            
                <div className="col-md-6">
                    <div className="card">
                        <form onSubmit={handleRegisterSubmit} className="mt-4">
                            <h3>Inscription</h3>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nom d'utilisateur"
                                    value={registerUsername}
                                    onChange={(e) => setRegisterUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Mot de passe"
                                    value={registerPassword}
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="client">Client</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">S'inscrire</button>
                        </form>
                    </div>
                </div>
            </div>

            {error && <p className="text-danger mt-3">{error}</p>}
        </div>
    );
};

export default LoginRegister;
