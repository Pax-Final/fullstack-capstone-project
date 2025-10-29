import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { urlConfig } from '../../config';                  // Task 1
import { useAppContext } from '../../context/AuthContext'; // Task 2
import { useNavigate } from 'react-router-dom';            // Task 3

function LoginPage() {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrect] = useState('');

    
    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('auth-token');
    const { setIsLoggedIn } = useAppContext();

    
    useEffect(() => {
        if (bearerToken) {
            navigate('/app');
        }
    }, [bearerToken, navigate]);

    
    const handleLogin = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearerToken ? `Bearer ${bearerToken}` : '',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const json = await response.json();

            if (json.authtoken) {
                
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', json.userName);
                sessionStorage.setItem('email', json.userEmail);

                
                setIsLoggedIn(true);

                
                navigate('/app');
            } else if (json.error) {
                setIncorrect(json.error);
            }
        } catch (e) {
            console.log("Erreur lors de la connexion : " + e.message);
            setIncorrect("Erreur de connexion. Veuillez réessayer.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Connexion</h2>
                        
                        {/* Champ Email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="text"
                                className="form-control"
                                placeholder="Entrez votre email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Champ Password */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Entrez votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Affichage du message d'erreur */}
                        {incorrect && <div className="text-danger mb-3">{incorrect}</div>}

                        {/* Bouton Login */}
                        <button
                            className="btn btn-primary w-100 mb-3"
                            onClick={handleLogin}
                        >
                            Se connecter
                        </button>

                        <p className="mt-4 text-center">
                            Nouveau ici ? <a href="/app/register" className="text-primary">Inscrivez-vous ici</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;