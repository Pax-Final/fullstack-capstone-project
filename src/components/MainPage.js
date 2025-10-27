import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urlConfig from "../config/urlConfig";

const MainPage = () => {
  const [gifts, setGifts] = useState([]);
  const navigate = useNavigate();

  // Tâche 1 : Récupérer tous les cadeaux
  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const url = `${urlConfig.backendUrl}/api/gifts`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setGifts(data);
      } catch (error) {
        console.log("Fetch error: " + error.message);
      }
    };
    fetchGifts();
  }, []);

  // Tâche 3 : Formater l’horodatage
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // si timestamp en secondes
    return date.toLocaleDateString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Tâche 2 : Navigation vers la page de détails
  const goToDetails = (productId) => {
    navigate(`/app/product/${productId}`);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {gifts.map((gift) => (
          <div className="col-md-4 mb-4" key={gift.id}>
            <div className="card h-100" onClick={() => goToDetails(gift.id)}>
              {/* Tâche 4 : Afficher l’image ou un espace réservé */}
              <div className="image-placeholder">
                {gift.image ? (
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="card-img-top"
                  />
                ) : (
                  <div className="no-image-available">No Image Available</div>
                )}
              </div>

              <div className="card-body">
                {/* Tâche 5 : Afficher le nom du cadeau */}
                <h5 className="card-title">{gift.name}</h5>

                {/* Tâche 6 : Afficher la date formatée */}
                <p className="card-text text-muted">
                  {formatDate(gift.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
