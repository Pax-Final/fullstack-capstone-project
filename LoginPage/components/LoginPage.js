import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
    // Déclaration des états pour les champs du formulaire
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Fonction appelée lors du clic sur le bouton Login
    const handleLogin = async () => {
        console.log("Login invoked");
        console.log({ email, password });
        // Ici, vous pouvez ajouter la logique pour envoyer les données à votre API
    }

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
