import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import urlConfig from '../../urlConfig';
import './DetailsPage.css';

const DetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [gift, setGift] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  // 🟢 Tâche 1 : Vérifiez l’authentification
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/app/login');
    }
  }, [navigate]);

  // 🟢 Tâche 3 : Faire défiler vers le haut lors du montage
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🟢 Tâche 2 : Récupérez les détails du cadeau
  useEffect(() => {
    const fetchGiftDetails = async () => {
      try {
        const response = await fetch(`${urlConfig.backendUrl}/api/gifts/${productId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du cadeau');
        }
        const data = await response.json();
        setGift(data);
        setComments(data.comments || []); // 🟢 Tâche 7 : Charger les commentaires
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGiftDetails();
  }, [productId]);

  // 🟢 Tâche 4 : Gérer le clic de retour
  const handleBackClick = () => {
    navigate(-1);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!gift) {
    return <div className="loading">Chargement du cadeau...</div>;
  }

  return (
    <div className="details-page">
      <button className="back-button" onClick={handleBackClick}>⬅ Retour</button>

      <h1 className="gift-title">{gift.name}</h1>

      {/* 🟢 Tâche 5 : Afficher l’image du cadeau */}
      {gift.image ? (
        <img src={gift.image} alt={gift.name} className="product-image-large" />
      ) : (
        <div className="no-image">Aucune image disponible</div>
      )}

      {/* 🟢 Tâche 6 : Afficher les détails du cadeau */}
      <div className="gift-info">
        <p><strong>Catégorie :</strong> {gift.category}</p>
        <p><strong>État :</strong> {gift.condition}</p>
        <p><strong>Âge recommandé :</strong> {gift.age}</p>
        <p><strong>Date d’ajout :</strong> {new Date(gift.createdAt).toLocaleDateString()}</p>
        <p><strong>Description :</strong> {gift.description}</p>
      </div>

      {/* 🟢 Tâche 7 : Section des commentaires */}
      <div className="comments-section">
        <h2>Commentaires</h2>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <p><strong>{comment.user}</strong></p>
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <p>Aucun commentaire pour ce cadeau.</p>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;