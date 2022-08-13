
//*===============================================
//*================== DATABASE ===================
//*===============================================

//* Connecter une API à un cluster MongoDB (database)
/* 1 - Depuis MongoDB Atlas, cliquez sur le bouton Connect et choisissez Connect your application. 
Sélectionnez bien la version la plus récente du driver Node.js, puis Connection String Only, et faites une copie de la chaîne de caractères retournée. 

2- Installer package Mongoose , à partir du dossier backend : 
Install "Mongoose" = " npm install mongoose "

3 - Importer mongoose dans le fichier app.js : */
const mongoose = require('mongoose');

//* Déclarer variables d'environnement
// 1. Install "Dotenv" = npm install dotenv
// 2. Look for "Dotenv" in package.json
// 3. Declare "Dotenv" in application file (app.js) : "require('dotenv').config()"
// 4. Import dotenv variables
const password = process.env.PASSWORD;
const username = process.env.USERNAME;
const database = process.env.DATABASE;

//* Déclarer identification Database
const uri = `mongodb+srv://${username}:${password}@api-crud-test.r7pfwra.mongodb.net/${database}?retryWrites=true&w=majority`;

//* Connecter la Database
mongoose.connect(uri).then(() => {
    console.log("Connected to database")
})
    .catch((err) => console.error(err));

//* Exporter fonctionnalité
module.exports = { mongoose: mongoose }; // common syntax
// module.exports = {mongoose} // destructured syntax