//===============================================
//================== DATABASE ===================
//===============================================

//* Mongoose import
const mongoose = require("mongoose");

//* (Sécurité) Variables d'environnement ( => .env )
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const database = process.env.DATABASE;

//* MongoDB adresse
const uri = `mongodb+srv://${username}:${password}@${cluster}.zdqnwhr.mongodb.net/${database}?retryWrites=true&w=majority`;

//* Connecter la Database
mongoose.connect(uri)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.error('Connexion à MongoDB échouée !', err));

//* Exporter fonctionnalité
module.exports = { mongoose } // destructured syntax
// module.exports = { mongoose: mongoose }; // common syntax