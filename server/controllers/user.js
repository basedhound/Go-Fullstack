//===================================================
//================= USER CONTROLLER =================
//===================================================

//* Imports :
// Modèle "User"
const User = require('../models/User');
// Bcrypt (hashage password)
const bcrypt = require('bcrypt');
// Json-Web-Token (authentification)
const jwt = require('jsonwebtoken');
// Clé secrète JWT (.env)
const jwtKey = process.env.JWT_KEY;


//* Fonctions :

// Inscription => Créer un nouveau utilisateur
exports.signup = (req, res, next) => {
    // Appel de "bcrypt.hash", fonction qui crypte password => sur body.password (mdp user) => 10 fois (tours de cryptages)
    bcrypt.hash(req.body.password, 10)
        // Ensuite, mot de passe dans nouvel utilisateur
        .then(hashedPassword => {
            // Créer un new utilisateur
            const user = new User({
                // Utiliser email fourni dans le corps de la requête
                email: req.body.email,
                // Utiliser email crypté (hashed) créé juste au-dessus
                password: hashedPassword
            });
            // Méthode "save" : Engistrer dans la base de données
            user.save()
                // 201 = Création de ressources
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                // 500 = Erreur Serveur
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Connexion => Correspondance mail et password
exports.login = (req, res, next) => {
    // Chercher correspondance dans la database (Méthode "findOne")
    User.findOne({ email: req.body.email })
        .then(user => {
            // Pas de correspondance, échec de la connexion
            if (user === null) {
                res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
            } else {
                // Si correspondance mail, comparer passwords requête/database (Fonction "compare" de Bcrypt)
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        // Invalide, échec de la connexion
                        if (!valid) {
                            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' })
                        } else {
                            // Valide, envoi d'un token d'authentification (Méthode "sign")
                            res.status(200).json({
                                userId: user._id,
                                // Utilier la fonction .sign de jsonwebtoken pour chiffrer un nouveau token.
                                token: jwt.sign(
                                    // Ajouter les arguments :
                                    //#1. Données à encoder dans le Token ("Payload") => ID utilisateur
                                    { userId: user._id },
                                    //#2. Clé secrète pour crypter le Token
                                    jwtKey,
                                    //#3. Définir la durée de validité du Token
                                    { expiresIn: '24h' }
                                )
                            });
                        };
                    })
                    .catch(error => res.status(500).json({ error }))
            };
        })
        .catch(err => res.status(500).json({ error }));
};