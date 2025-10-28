import { urlConfig } from '../../config';

import { useAppContext } from '../../context/AuthContext';

import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [showerr, setShowerr] = useState('');

  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();

  const handleRegister = async () => {
    try {
      const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
        
        method: 'POST',
        
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      });

      
      const json = await response.json();

      if (json.authtoken) {
        
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', firstName);
        sessionStorage.setItem('email', json.email);

        setIsLoggedIn(true);

        navigate('/app');
      }

      if (json.error) {
        setShowerr(json.error);
      }
    } catch (e) {
      console.log("Error fetching details: " + e.message);
      setShowerr('Erreur lors de la connexion au serveur.');
    }
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      
      <input
        type="text"
        placeholder="Prénom"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nom"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>S’inscrire</button>

      {/* ✅ Task 6: Display error message to end user */}
      {showerr && <div className="text-danger">{showerr}</div>}
    </div>
  );
};

export default RegisterPage;

