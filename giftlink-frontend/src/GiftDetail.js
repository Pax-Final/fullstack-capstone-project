import React from 'react';
import { useParams } from 'react-router-dom';
import './GiftDetail.css';

const GiftDetail = () => {
  const { id } = useParams();
  
  const gift = {
    id: 1,
    name: "Vintage Coffee Table",
    category: "Living Room",
    description: "This beautiful vintage coffee table from the 1960s features solid wood construction and a classic design that complements any living room decor. The table has been well-maintained and shows only minor signs of wear, adding to its character.",
    age: "Older",
    condition: "Good",
    dimensions: "120cm x 60cm x 45cm",
    material: "Solid Oak",
    owner: "John Smith",
    contact: "john.smith@example.com"
  };

  return (
    <div className="gift-detail">
      <h2>{gift.name}</h2>
      <div className="gift-detail-content">
        <div className="gift-image-large">
          <div className="image-placeholder-large">🎁</div>
        </div>
        
        <div className="gift-info">
          <div className="gift-meta">
            <p><strong>Category:</strong> {gift.category}</p>
            <p><strong>Age:</strong> {gift.age}</p>
            <p><strong>Condition:</strong> {gift.condition}</p>
            <p><strong>Dimensions:</strong> {gift.dimensions}</p>
            <p><strong>Material:</strong> {gift.material}</p>
          </div>
          
          <div className="gift-description">
            <h3>Description</h3>
            <p>{gift.description}</p>
          </div>
          
          <div className="owner-info">
            <h3>Owner Information</h3>
            <p><strong>Name:</strong> {gift.owner}</p>
            <p><strong>Contact:</strong> {gift.contact}</p>
          </div>
          
          <button className="contact-btn">Contact Owner</button>
        </div>
      </div>
    </div>
  );
};

export default GiftDetail;
