//*===================================================
//*================== CONTROLLER =====================
//*===================================================
//*============ USER AUTHENTIFICATION ================
//*===================================================

/* Commençons par créer l'infrastructure nécessaire à nos routes d'authentification. 
Il nous faudra un contrôleur et un routeur, puis nous devrons enregistrer ce routeur dans notre application Express.
D'abord, créez un fichier user.js dans votre dossier controllers : */

//* Import User model
// Ne pas oublier d'importer le modèle "User.js"
const User = require('../models/User');

//* BYCRPIT : security module
/* Il nous fauut le package de chiffrement bcrypt pour notre fonction "signup".
Nous pouvons l'importer dans notre contrôleur et implémenter notre fonction "signup". 
La méthode  hash()  de bcrypt crée un hash crypté des mots de passe de vos utilisateurs,
pour les enregistrer de manière sécurisée dans la base de données.*/
// 1. Install Bycrpt : "npm install bcrypt"
// 2. Declare Bycrpt : 
const bcrypt = require('bcrypt');
// 3. Call Bcrypt in "signup" (.hash) and "login" (.compare) functions


//* JWT (JSON-Web-Token) : authentification token
/*  Les tokens d'authentification permettent aux utilisateurs de se connecter une seule fois à leur compte. 
Au moment de se connecter, ils recevront leur token et le renverront automatiquement à chaque requête par la suite. 
Ceci permettra au back-end de vérifier que la requête est authentifiée.
Les JSON web tokens sont des tokens chiffrés qui peuvent être utilisés pour l'autorisation.
La méthode sign() du package jsonwebtoken utilise une clé secrète pour chiffrer un token.
Ce token peut contenir un payload personnalisé et avoir une validité limitée. */
// 1. Install JWT : "npm install jsonwebtoken"
// 2. Declare JWT :
const jwt = require('jsonwebtoken');
// Call JWT in "login" function, using ".sign" method


//! FONCTIONS

//* SIGNUP => Créer un nouveau utilisateur
exports.signup = (req, res, next) => {
    // Appel de "bcrypt.hash", fonction qui crypte password => sur body.password (mdp user) => 10 fois (tours de cryptages)
    bcrypt.hash(req.body.password, 10)
        // Ensuite, mot de passe dans nouvel utilisateur
        .then(hashedPassword => {
            // Crée un new utilisateur
            const user = new User({
                // Utiliser email fourni dans le corps de la requête
                email: req.body.email,
                // Utiliser email crypté (hashed) créé juste au-dessus
                password: hashedPassword
            });
            // Utiliser fonction "save" de notre "User" pour engistrer dans la base de données
            user.save()
                // 201 = Création de ressources => object.json => message
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                // 500 = Server error (traitement) => to object.json 
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//* LOGIN => Vérifier sur un utilisateur existe + correspondance mot de passe
/*  Maintenant que nous pouvons créer des utilisateurs dans la base de données, 
il nous faut une méthode permettant de vérifier si un utilisateur qui tente de se connecter dispose d'identifiants valides. 
Implémentons donc notre fonction login.*/

const jwtKey = process.env.JWTKEY;

exports.login = (req, res, next) => {
    // Utiliser méthode "findOne" de notre modèle User + filtre/selecteur
    User.findOne({ email: req.body.email })
        // Comparer résultat avec database
        .then(user => {
            // Si correspondance nulle
            if (user === null) {
                // Utilisateur n'existe pas = message d'erreur
                res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
            } else {
                // Si utilisateur existe, comparer mdp fourni/database avec "bcrypt.compare"
                // req.body.password = Fourni par utilisateur | user.password = Conservé dans database
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        // Si password est faux => erreur d'authentification
                        if (!valid) {
                            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' })
                            // Si password est correct => Envoi d'objet nécessaire à l'authentificaion
                        } else {
                            // Réponse : Renvoyer le token au front-end
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
                                    { expiresIn: '24h'}
                                )
                            });
                        };
                    })
                    .catch(error => res.status(500).json({ error }))
            };
        })
        .catch(err => res.status(500).json({ error }));
};

/* La méthode compare de bcrypt compare un string avec un hash pour, par exemple, vérifier si un mot de passe entré par l'utilisateur correspond à un hash sécurisé enregistré en base de données. Cela montre que même bcrypt ne peut pas décrypter ses propres hashs.

Nous utilisons notre modèle Mongoose pour vérifier que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données : 
1. Dans le cas contraire, nous renvoyons une erreur401 Unauthorized. 
2. Si l'e-mail correspond à un utilisateur existant, nous continuons.

Nous utilisons la fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données :
1. S'ils ne correspondent pas, nous renvoyons une erreur401 Unauthorized avec le même message que lorsque l’utilisateur n’a pas été trouvé, afin de ne pas laisser quelqu’un vérifier si une autre personne est inscrite sur notre site.

2. S'ils correspondent, les informations d'identification de notre utilisateur sont valides. 
Dans ce cas, nous renvoyons une réponse 200 contenant l'ID utilisateur et un token. 
Ce token est une chaîne générique pour l'instant, mais nous allons le modifier et le crypter dans le prochain chapitre. */



