//===============================================
//================= USER ROUTER =================
//===============================================

//* Imports : 
const express = require('express');
const userController = require('../controllers/user');

//* Routeur : 
const userRouter = express.Router(); // Déclarer routeur User

// POST => Permet à l'utilisateur de créer un compte
userRouter.post('/api/auth/signup', userController.signup)
// POST => Permet à l'utilisateur de s'identifier
userRouter.post('/api/auth/login', userController.login)

//* Exports : 
module.exports = userRouter;
