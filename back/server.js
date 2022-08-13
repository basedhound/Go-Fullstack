//! Version Finale : Les routes actuelles fonctionnent avec la "Partie 4" de l'application http://localhost:4200/

//*===================================================
//*==================== SERVER =======================
//*===================================================

//* Créer une application Express 
// Installer Express et l'enregistrer dans le package.json : 'npm install express --save' (dossier backend)
// On crée un fichier 'app.js' qui contiendra notre application
//* Importer EXPRESS
const app = require('./app')

//* Démarrer un serveur Node
//? NB : On peut directement utiliser ".listen" sur notre application Express
//? Plus nécessaire d'utiliser le package http et createServer (déprécié)
// Les projets Node sont initialisés avec la commande 'npm init' (terminal)
// Importer package HTTP de node
const http = require('http');
// Déclarer serveur avec package HTTP
const server = http.createServer(app);

//* Définir un PORT sur lequel l'application doit tourner
// La fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) { return val; }
    if (port >= 0) { return port; }
    return false;
};
// app.set('port', process.env.PORT || 3000); // Avant normalizedPort
const normalizedPort = normalizePort(process.env.PORT || '3000');
app.set('port :', normalizedPort);  //? Guillaume : En gros, même sans cette ligne ça se lance, mais ça pourrait créer des soucis si plusieurs choses essayaient de se mettre sur le même port ? 

//* Déclaration Fonction de gestion des erreurs serveur (errorHandler)
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};
//* Appel Fonction de gestion des erreurs serveur (errorHandler)
// La fonction 'errorHandler' recherche les différentes erreurs et les gère de manière appropriée. 
// Elle est ensuite enregistrée dans le serveur.
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + normalizedPort;
    console.log('Listening on ' + bind);
});

//* Serveur : Écouter les requêtes
server.listen(normalizedPort);






//*===================================================
//*=================== DATABASE ======================
//*===================================================
//* Connecter une API à un cluster MongoDB (database)
/* 1 - Depuis MongoDB Atlas, cliquez sur le bouton Connect et choisissez Connect your application. 
Sélectionnez bien la version la plus récente du driver Node.js, puis Connection String Only, et faites une copie de la chaîne de caractères retournée. 

2- Installer package Mongoose , à partir du dossier backend : 
Install "Mongoose" = " npm install mongoose "

3 - Importer mongoose dans le fichier app.js : */
const mongoose = require('mongoose');

/* 4 - Juste en dessous de la déclaration de constante app ("const app = require('./app')")
Utiliser la fonction mongoose.connect => (voir plus bas vers ligne 30)   */

//* Connecter MONGOOSE à l'application
// Variables d'environnement (dotenv)
const password = process.env.PASSWORD;
const username = process.env.USERNAME;
const database = process.env.DATABASE;
// Database : Route + Identification
const uri = `mongodb+srv://${username}:${password}@cluster0.irjo9ng.mongodb.net/${database}?retryWrites=true&w=majority`

// Connexion à la database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.error('Connexion à MongoDB échouée !'));







//*===================================================
//*===================== NOTES =======================
//*===================================================
//? Créer un serveur Node basique
/* Un serveur Node basique est démarré avec la méthode 'createServer' du package 'http'.
Cette méthode prend en paramètre la fonction qui sera appelée à chaque requête reçue par le serveur
const http = require('http');
const server = http.createServer((req, res) => {
    res.end('Voilà la réponse du serveur !');
});

Le serveur doit maintenant 'Écouter' : attendre les requêtes envoyées
1 - Méthode '.listen' + port à écouter : 
server.listen(3000);

2 - Méthode ".set('port', process.env.PORT || 3000)"
Process.env.PORT || 3000 signifie : peu importe la variable d'environnement PORT, ou 3000 si il n'y en a pas.
server.listen(process.env.PORT || 3000);

3 - Ajout d'une fonction de normalisation des ports
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) { return val; }
    if (port >= 0) { return port; }
    return false;
};
const normalizedPort = normalizePort(process.env.PORT || '3000');
server.listen(normalizedPort);

On peut lancer le server via le terminal : "node server"
Ou installer "nodemon" en global : npm install -g nodemon
Et lancer le server via le terminal : "nodemon server"
Avantage de Nodemon = Actualisation automatique

Tester http://localhost:3000 via navigateur ou POSTMAN
Via POSTMAN, choisir requête "OPTIONS",   */