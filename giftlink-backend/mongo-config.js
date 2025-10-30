// Configuration MongoDB pour Kubernetes
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb-service:27017/giftlink';
module.exports = { MONGO_URI };
