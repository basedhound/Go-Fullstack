//! Version Finale : Les routes actuelles fonctionnent avec la "Partie 4" de l'application http://localhost:4200/
//===================================================
//==================== SERVER =======================
//===================================================

//* Importer Express
const app = require('./app'); // Créer 'app.js' qui contiendra notre application

//* Démarrer un serveur Node
const http = require('http'); // Importer package HTTP de node
const server = http.createServer(app); // Déclarer serveur avec package HTTP

//* Gestion du Port :
// normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const normalizedPort = normalizePort(process.env.PORT || '3000');
app.set('port :', normalizedPort);
// app.set('port', process.env.PORT || 3000); // (Avant fonction normalizedPort)


//* Gestion des Erreurs :
// errorHandler recherche les différentes erreurs et les gère de manière appropriée
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + normalizedPort;
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


// Appel Config : Port, Erreurs 
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + normalizedPort;
    console.log('Listening on ' + bind);
});


//* Lancement :
server.listen(normalizedPort, () => {
    console.log(`Server listening on port ${normalizedPort}`);
});










