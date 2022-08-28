//===============================================
//================= STUFF ROUTER ================
//===============================================

//* Imports
const express = require('express'); // Express
const auth = require('../middleware/auth') // Authentification (sécurité)
// On ajoute "auth" dans nos routes, toujours anvant les controllers
const multer = require('../middleware/multer-config') // Multer (images)
// On ajoute "multer" dans nos routes "POST" et "PUT" (cells qui en ont besoin), entre "auth" et "controller"
const stuffController = require('../controllers/stuff') // Sauce contrôleur
// On importe les fonctions/logiques métiers depuis le fichier "../controllers/stuff"

//* Routeur
const stuffRouter = express.Router(); // Déclarer routeur Stuff

// POST => Publier un objet (/api/stuff)
stuffRouter.post('/api/stuff', auth, multer, stuffController.createThing);
// GET => Afficher toutes les objets (/api/stuff)
stuffRouter.get('/api/stuff', auth, stuffController.getAllThings);
// GET => Afficher un objet en particulier (/api/stuff/:id)
stuffRouter.get('/api/stuff/:id', auth, stuffController.getOneThing);
// PUT => Modifier un objet (/api/stuff/:id)
stuffRouter.put('/api/stuff/:id', auth, multer, stuffController.modifyThing);
// DELETE => Supprimer un objet (/api/stuff/:id)
stuffRouter.delete('/api/stuff/:id', auth, stuffController.deleteThing);

//* Exports
module.exports = stuffRouter;
