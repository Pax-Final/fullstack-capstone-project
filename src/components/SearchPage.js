import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import urlConfig from '../../urlConfig';
import './SearchPage.css';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ageRange, setAgeRange] = useState(6); // Valeur par défaut
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const navigate = useNavigate();

  // 🟢 Récupération dynamique des catégories et conditions
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, condRes] = await Promise.all([
          fetch(`${urlConfig.backendUrl}/api/categories`),
          fetch(`${urlConfig.backendUrl}/api/conditions`),
        ]);
        const catData = await catRes.json();
        const condData = await condRes.json();
        setCategories(catData);
        setConditions(condData);
      } catch (error) {
        console.error('Erreur lors du chargement des filtres:', error);
      }
    };
    fetchFilters();
  }, []);

  // 🟢 Navigation vers la page de détails
  const goToDetailsPage = (productId) => {
    navigate(`/app/product/${productId}`);
  };

  // 🟢 Gestion de la recherche
  const handleSearch = async () => {
    const baseUrl = `${urlConfig.backendUrl}/api/search?`;
    const queryParams = new URLSearchParams({
      name: searchQuery,
      age_years: ageRange,
      category: document.getElementById('categorySelect').value,
      condition: document.getElementById('conditionSelect').value,
    }).toString();

    try {
      const response = await fetch(`${baseUrl}${queryParams}`);
      if (!response.ok) {
        throw new Error('Échec de la recherche');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
  };

  return (
    <div className="search-page container mt-4">
      <h2 className="search-title text-center mb-4">Rechercher un cadeau 🎁</h2>

      {/* 🟢 Champ de saisie pour la recherche */}
      <div className="form-group mb-3">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 🟢 Sélection de catégorie */}
      <div className="form-group mb-3">
        <label htmlFor="categorySelect">Catégorie</label>
        <select id="categorySelect" className="form-control">
          <option value="">Toutes les catégories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* 🟢 Sélection de condition */}
      <div className="form-group mb-3">
        <label htmlFor="conditionSelect">Condition</label>
        <select id="conditionSelect" className="form-control">
          <option value="">Toutes les conditions</option>
          {conditions.map((cond, index) => (
            <option key={index} value={cond}>{cond}</option>
          ))}
        </select>
      </div>

      {/* 🟢 Curseur de tranche d’âge */}
      <div className="form-group mb-3">
        <label htmlFor="ageRange">Âge : moins de {ageRange} ans</label>
        <input
          type="range"
          className="form-control-range"
          id="ageRange"
          min="1"
          max="10"
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value)}
        />
      </div>

      {/* 🟢 Bouton de recherche */}
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSearch}>
          🔎 Rechercher
        </button>
      </div>

      {/* 🟢 Affichage des résultats */}
      <div className="search-results mt-4">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div key={product.id} className="card mb-3">
              {product.image ? (
                <img src={product.image} alt={product.name} className="card-img-top" />
              ) : (
                <div className="no-image-placeholder">Aucune image disponible</div>
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  {product.description ? product.description.slice(0, 100) + '...' : 'Aucune description disponible.'}
                </p>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => goToDetailsPage(product.id)}
                  className="btn btn-outline-primary w-100"
                >
                  Voir plus
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info text-center" role="alert">
            Aucun cadeau trouvé. Essayez d’autres critères.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
