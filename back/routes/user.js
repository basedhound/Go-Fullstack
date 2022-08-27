//*==============================================
//*================= ROUTER =====================
//*==============================================
//*========== USER AUTHENTIFICATION =============
//*==============================================

/* Après le fichier user.js du dossier "controllers" ... 
Créez un autre fichier user.js , cette fois dans votre dossier "routes".
Les routes fournies sont celles prévues par l'application front-end. (/signup , /login) 

NB : N'oubliez pas que le segment de route indiqué ici est uniquement le segment final.
Le reste de l'adresse de la route sera déclaré dans notre application Express.
*/

//!Base

// Declare "Express" :
const express = require('express');

// Declare Router
const userRoutes = express.Router();

// Declare Controller
const userController = require('../controllers/user')

//! Routes
userRoutes.post('/api/auth/signup', userController.signup)
userRoutes.post('/api/auth/login', userController.login)


















//! Exporter Router
module.exports = userRoutes;
// Maintenant, enregistrons notre routeur dans notre application. 
// Importer Router dans l'application ("app.js") :
// const userRoutes = require('./routes/user');
// Puis enregistrez-le ("app.js => middlewares"):
// app.use('/api/auth', userRoutes);