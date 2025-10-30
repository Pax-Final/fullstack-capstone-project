import React from 'react';
import './GiftList.css';

const GiftList = () => {
  const gifts = [
    {
      id: 1,
      name: "Vintage Coffee Table",
      category: "Living Room",
      description: "Beautiful vintage coffee table from the 1960s",
      age: "Older",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Modern Sofa",
      category: "Living Room", 
      description: "Comfortable 3-seater sofa in excellent condition",
      age: "Newer",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Antique Lamp",
      category: "Living Room",
      description: "Classic antique lamp with brass finish",
      age: "Older", 
      image: "/api/placeholder/300/200"
    }
  ];

  return (
    <div className="gift-list">
      <h2>Available Gifts</h2>
      <div className="gifts-grid">
        {gifts.map(gift => (
          <div key={gift.id} className="gift-card">
            <div className="gift-image">
              <div className="image-placeholder">🎁</div>
            </div>
            <h3>{gift.name}</h3>
            <p className="gift-category">{gift.category}</p>
            <p className="gift-age">{gift.age}</p>
            <button 
              onClick={() => window.location.href = `/gifts/${gift.id}`}
              className="view-details-btn"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftList;
