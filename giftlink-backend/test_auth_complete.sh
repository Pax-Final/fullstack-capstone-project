#!/bin/bash

echo "=== Test 1: Login réussi ==="
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "testuser999@example.com", "password": "password123"}'

echo -e "\n\n=== Test 2: Mauvais mot de passe ==="
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "testuser999@example.com", "password": "wrongpassword"}'

echo -e "\n\n=== Test 3: Utilisateur inexistant ==="
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "nonexistent@example.com", "password": "password123"}'

echo -e "\n\n=== Test 4: Validation - données manquantes ==="
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "testuser999@example.com"}'

echo -e "\n\n=== Test 5: Nouvel utilisateur + login ==="
TIMESTAMP=$(date +%s)
EMAIL="newuser${TIMESTAMP}@test.com"

echo "Création utilisateur: $EMAIL"
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"firstName\": \"New\", \"lastName\": \"User\", \"email\": \"$EMAIL\", \"password\": \"mypass123\"}"

echo -e "\nLogin avec le nouvel utilisateur:"
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"mypass123\"}"

