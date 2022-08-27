# Passez au Full Stack avec Node.js, Express et MongoDB

À partir de Node et d'Express, créez diverses routes pour les différentes fonctions à mettre à la disposition de votre API. Ensuite, vous ajouteez MongoDB, une base de données NoSQL, pour rendre votre API entièrement dynamique et vos données pleinement persistantes.

![screenshot du site](./notes/GoFullStack%20-%20readme%20cover.png)


# Lancement
## Site : 
Votre application front-end doit s'exécuter dans un navigateur. 

Exécutez donc npm run start à partir du répertoire front-end, accédez à http://localhost:4200 avec votre navigateur.

## Serveur :
On peut lancer le serveur via le terminal : "node server"

Tester http://localhost:3000 via navigateur ou POSTMAN

Par défaut, si on lance le serveur ("node server"), puis qu'on apporte une modification, il faut relancer le serveur pour mise à jour.

Pour éviter cela, on installe "nodemon"  globalement (npm install -g nodemon). Lancer le serveur via "nodemon server".

# Compétences évaluées
- Créer un serveur web simple avec Express 
- Créer une API REST avec Node, Express et MongoDB 
- Mettre en place un système d'authentification sur une application Express 
- Gérer des fichiers utilisateur sur une application Express

# Technologies
- Node.js
- Express
- Mongoose (MongoDB)
- NPM : Bcrypt, Crypto-js, Dotenv, Express, Helmet, Jsonwebtoken, Mongoose-unique-validator, Multer, Password-validator, Validator

# Contexte
L'application est un magasin en ligne simple. Une API permet de Créer, Lire, Mettre à jour et Supprimer des éléments en vente (CRUD). L'API dispose d'un système d'authentification afin de la protéger. Une gestion des fichiers utilisateurs est intégrée afin de permettre aux clients de télécharger leurs propres images lors de la publication des annnonces.
