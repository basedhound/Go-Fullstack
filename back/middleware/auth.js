//*===================================================
//*================= MIDDLEWARE ======================
//*===================================================
//*============ USER AUTHENTIFICATION ================
//*===================================================

/* Nous allons à présent créer le middleware qui va vérifier que l’utilisateur est bien connecté et transmettre les informations de connexion aux différentes méthodes qui vont gérer les requêtes. Créez un dossier middleware et un fichier auth.js à l'intérieur. 

Ce middleware : 
- Récupère le token envoyé par le client
- Vérifie la validité du token
- Permet aux routes d'en exploiter les informations (userId ...)

Notez bien :
La méthode verify() du package jsonwebtoken permet de vérifier la validité d'un token (sur une requête entrante, par exemple).
Ajoutez bien votre middleware d'authentification dans le bon ordre sur les bonnes routes.
Attention aux failles de sécurité !
*/

//* JWT (JSON-Web-Token) : authentification token
// Declarer JWT :
const jwt = require('jsonwebtoken');
// Déclarer clé secrète via DOTENV (fichier .env)
const jwtKey = process.env.JWTKEY;

//! FONCTION
module.exports = (req, res, next) => {
    // Récupérer le token, ce dernier est composé de 2 parties quand envoyé par le client (mot clé "bearer" + le token)
    try {
        // 1. Extraire token du header "Authorization" | 2. Spliter string en [tab] pour séparer mot clé[1]/token[2] | 
        // Utiliser .split pour tout récupérer après l'espace dans le header. 
        const token = req.headers.authorization.split(' ')[1];
        // Il faut décoder le token récupéré => méthode "verify" de JSON-Web-Token + 2 Arguments (Token, clé secrète)
        const decodedToken = jwt.verify(token, jwtKey);
        // Extraire le userId du token
        const userId = decodedToken.userId;
        // Ajouter userId à l'objet "REQUEST" afin que nos différentes routes puissent l’exploiter
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error })
    }
};

/* Maintenant, nous devons appliquer ce middleware à nos routes stuff, qui sont celles à protéger. Dans notre routeur stuff, nous importons notre middleware et le passons comme argument aux routes à protéger :

1. Aller à "routes/stuff.js"
2. Importer le middleware : 
const auth = require('../middleware/auth');

3. Ajouter "auth" devant chaque gestionnaire de route comme ceci : 

userRoutes.post('/', auth, stuffController.createThing );
userRoutes.get('/', auth, stuffController.getAllThings );
userRoutes.get('/:id', auth, stuffController.getOneThing );
userRoutes.put('/:id', auth, stuffController.modifyThing );
userRoutes.delete('/:id', auth, stuffController.deleteThing );

C'est important de le mettre avant le gestionnaire de route (controller)
Dans le cas contraire, le controller serait appelé en premier et ne pourrait pas utiliser "auth"

Désormais, à partir du front-end, vous devriez être capable de vous connecter et d'utiliser normalement l'application. Pour vérifier que les requêtes non autorisées ne fonctionnent pas, vous pouvez utiliser une application (telle que Postman) pour passer une demande sans en-tête Authorization. L'API refusera l'accès et renverra une réponse 401.

Félicitations ! Votre API implémente à présent l'authentification par token et est correctement sécurisée. 

 */