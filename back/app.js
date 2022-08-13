//*============================================
//*================= MAIN =====================
//*============================================

//* DOTENV
// 1. Install "Dotenv" = npm install dotenv
// 2. Declare "Dotenv" ;
require("dotenv").config();
// You can now use "process.env" (.env file)

//* CORS
// Install "CORS" = npm install cors
// Declare "CORS" :
const cors = require("cors");

//! Créer une application Express (suite)
//* EXPRESS
// 1. Install "Express" = npm install express 
// 2. Look for "Express" in package.json
// 3. Declare "Express" :
const express = require('express');
// 4. Test "Express" with console.log
// 5. Declare "app" :
const app = express();

//* IMPORTS
// On importe notre "router.js"
const stuffRoutes = require('./routes/stuff')
// On l'appelle ensuite dans les middlewares

// On importe notre "routes/user.js"
const userRoutes = require('./routes/user')
// On l'appelle ensuite dans les middlewares

// Accéder au "path" de notre serveur (pour gestion des images uploadées)
const path = require('path')
// + (plus bas, dans middleware) Ajout routage : app.use('/images', express.static(path.join(__dirname, 'images')));

//*===============================================
//*================= MIDDLEWARE ==================
//*===============================================
/* Un middleware est un bloc de code qui traite les requêtes et réponses de votre application.
Une application Express est fondamentalement une série de fonctions appelées middleware.
'next' permet de renvoyer à une fonction l'exécution du serveur. */

//* COMMENT CORRIGER UNE ERREUR " CORS " ?
/* CORS signifie « **Cross Origin Resource Sharing** ». Il s'agit d'un système de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents, ce qui empêche donc les requêtes malveillantes d'accéder à des ressources sensibles. Dans notre cas, nous avons deux origines : `localhost:3000` et `localhost:4200` , et nous souhaiterions qu'elles puissent communiquer entre elles. Pour cela, nous devons ajouter des headers à notre objet  `response` . */

//TODO : On peut simplement utiliser le package npm " CORS " :
// 1. Install "CORS" = npm install cors | Déjà fait plus haut dans ce fichier
// 2. Declare "CORS" : const cors = require("cors"); | Déjà fait plus haut dans ce fichier
// 3. Call "CORS" : 
app.use(cors());

//TODO : Sinon, on peut le faire manuellement :
/* app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
}); */
/* Rôle de ces headers :
1 - Accéder à notre API depuis n'importe quelle origine ( '*' ) ;
2 - Ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
3 - Envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.). 
Comme vous pouvez le voir dans le code, le middleware ne prend pas d'adresse en premier paramètre, afin de s'appliquer à toutes les routes. 
Cela permettra à toutes les demandes de toutes les origines d'accéder à votre API. 
*/

//* Call PARSER => .use(express.json())
/* Pour gérer la requête POST venant de l'application front-end, on a besoin d'en extraire le corps JSON. 
Pour cela, vous avez juste besoin d'un middleware très simple, mis à disposition par le framework Express. Juste après la déclaration de la constante  app  , ajoutez : */
app.use(express.json())

//* Call STUFF Router => stuff.js (CRUD objets)
app.use('/api/stuff', stuffRoutes);
// = Pour cette route là, on utiliser le router déclaré par "stuffRoutes"

//* Call USER Router : user.js (Authentification)
app.use('/api/auth', userRoutes);
// = Pour cette route là, on utiliser le router déclaré par "stuffRoutes"

//* Call IMAGES : stuff.js (gestion images pour requête POST)
app.use('/images', express.static(path.join(__dirname, 'images')))
// express.static()  et  path.join() : Configurez votre serveur pour renvoyer des fichiers statiques pour une route donnée

//! EXPORT
// On exporte cette application pour y accéder depuis les autres fichiers de notre projet (notre serveur node).
module.exports = app;










//==============================================
//================= ROUTES =====================
//==============================================
//* Premières routes test créées avant l'utilisation de fichiers dédiés ROUTES / CONTROLLERS
//* À ce momemnt du projet, on utiliser uniquemement des routes CRUD pour les objets (stuff)

//* IMPORTS
// Pour pouvoir utiliser notre nouveau modèle Mongoose dans l'application, nous devons l'importer dans le fichier app.js :
// const Thing = require('./models/Thing');

/* Implémentons le CRUD complet :
1. create (création de ressources) ;
2. read (lecture de ressources) ;
3. update (modification de ressources) ;
4. delete (suppression de ressources). */

//* POST Request => Créer une route permettant aux utilisateurs de poster leurs articles à vendre
/* Pour gérer la requête POST venant de l'application front-end, on a besoin d'en extraire le corps JSON. Pour cela, vous avez juste besoin d'un middleware très simple, mis à disposition par le framework Express. Juste après la déclaration de la constante  app  , ajoutez : app.use(express.json()); Avec ceci, Express prend toutes les requêtes qui ont comme Content-Type  application/json  et met à disposition leur  body  directement sur l'objet req, ce qui nous permet d'écrire le middleware POST suivant :*/

/* app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}); */

/* Tant qu'il n'y a pas de base de donnée, simplement logger à la console (contenu corps requête):
Si on écrit pas de réponse (res), la requête va planter côté utilisateur.
Dans une app Express, le dernier middleware pour une route donnée doit renvoyer la réponse au client pour empêcher les requêtes d'expirer.
Code 201 = création de ressource

Veillez à :
- soit modifier la méthode  use  en  get  pour le middleware des requêtes GET ;
- soit placer la route POST au-dessus du middleware pour les requêtes GET, car la logique GET interceptera actuellement toutes les requêtes envoyées à votre endpoint /api/stuff , étant donné qu'on ne lui a pas indiqué de verbe spécifique. Placer la route POST au-dessus interceptera les requêtes POST, en les empêchant d'atteindre le middleware GET.

Ici, vous créez une instance de votre modèle Thing en lui passant un objet JavaScript contenant toutes les informations requises du corps de requête analysé (en ayant supprimé en amont le faux_id envoyé par le front-end).

L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body

Ce modèle comporte une méthode save() qui enregistre simplement votre Thing dans la base de données.

La base de données MongoDB est fractionnée en collections : le nom de la collection est défini par défaut sur le pluriel du nom du modèle. Ici, ce sera Things  .

La méthode save() renvoie une Promise. Ainsi, dans notre bloc then() , nous renverrons une réponse de réussite avec un code 201 de réussite. Dans notre bloc catch() , nous renverrons une réponse avec l'erreur générée par Mongoose ainsi qu'un code d'erreur 400. */


//* GET Request => Créer une route qui permet de récuperer les objets à vendre
/* app.get('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
}); */

/* L'argument supplémentaire passé à la méthode use : nous lui passons un string, correspondant à la route pour laquelle nous souhaitons enregistrer cet élément de middleware. Dans ce cas, cette route serahttp://localhost:3000/api/stuff , car il s'agit de l'URL demandée par l'application front-end.

Dans ce middleware, nous créons un groupe d'articles avec le schéma de données spécifique requis par le front-end. Nous envoyons ensuite ces articles sous la forme de données JSON, avec un code 200 pour une demande réussie.

Si vous effectuez une demande GET vers cette route (aussi appelée endpoint) à partir de Postman, vous verrez que vous recevrez le groupe de stuff

Vous pouvez également ajouter des URL d'images valides aux stuff renvoyés par l'API, en terminant la route GET.
Si vous actualisez à présent l'application front-end, vous devriez voir vos articles en vente.*/

//* GET Request => Créer une route qui permet de récuperer un objet spécifique
/* app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  }); */

/* Dans cette route :
1. nous utilisons la méthode get() pour répondre uniquement aux demandes GET à cet endpoint ;
2. nous utilisons deux-points : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre ;
3. nous utilisons ensuite la méthode findOne() dans notre modèle Thing pour trouver le Thing unique ayant le même _id que le paramètre de la requête ; ce Thing est ensuite retourné dans une Promise et envoyé au front-end ;

Si aucun Thing n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée.

Maintenant, notre application commence vraiment à prendre forme ! Nous pouvons créer des objets et les voir apparaître immédiatement dans notre boutique en ligne grâce à la base de données. Et nous pouvons même ouvrir un objet en particulier pour obtenir les informations de cet objet précis, via la base de données.

EN RÉSUMÉ :
Les méthodes de votre modèle Thing permettent d'interagir avec la base de données :
save()  – enregistre un Thing ;
find()  – retourne tous les Things ;
findOne()  – retourne un seul Thing basé sur la fonction de comparaison qu'on lui passe
(souvent pour récupérer un Thing par son identifiant unique).
La méthode  app.get()  permet de réagir uniquement aux requêtes de type GET. */

//* PUT Request => Mettez à jour un Thing existant
/* app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }); */

/* Ci-dessus, nous exploitons la méthode updateOne() dans notre modèle Thing . Cela nous permet de mettre à jour le Thing qui correspond à l'objet que nous passons comme premier argument. Nous utilisons aussi le paramètre id passé dans la demande, et le remplaçons par le Thing passé comme second argument.

L'utilisation du mot-clé new avec un modèle Mongoose crée par défaut un champ_id . Utiliser ce mot-clé générerait une erreur, car nous tenterions de modifier un champ immuable dans un document de la base de données. Par conséquent, nous devons utiliser le paramètre id de la requête pour configurer notre Thing avec le même _id qu'avant.

Vous pouvez maintenant tester votre nouvelle route : cliquez sur un Thing de l'application, puis sur son bouton Modifier, changez ses paramètres puis sauvegardez. Vous envoyez alors un Thing modifié au back-end. En revenant sur la page des articles, vous devriez retrouver votre article modifié. */

//* DELETE Request => Supprimer un Thing existant
/* app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }); */

/*   La méthode deleteOne() de notre modèle fonctionne comme findOne() et updateOne() dans le sens où nous lui passons un objet correspondant au document à supprimer. Nous envoyons ensuite une réponse de réussite ou d'échec au front-end.

EN RÉSUMÉ :
app.put()  et  app.delete()  attribuent des middlewares aux requêtes de type PUT et de type DELETE.
Les méthodes  updateOne()  et  delete()  de votre modèle Thing permettent de mettre à jour ou de supprimer un Thing dans la base de données.
*/



















//*=========================================
//*================= TESTS ==================
//*=========================================


//* Test 1 : Requête simple
/* app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});
// On peut modifier le 'status' de la requête
app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message: "Votre requête a bien été reçue !" });
    next();
});

app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !')
}); */
//? Explication :
/*À ce point, cette application Express contient quatre éléments de middleware :
le premier enregistre « Requête reçue ! » dans la console et passe l'exécution ;
le deuxième ajoute un code d'état 201 à la réponse et passe l'exécution ;
le troisième envoie la réponse JSON et passe l'exécution ;
le dernier élément de middleware enregistre « Réponse envoyée avec succès ! » dans la console. */




//* GET Request => Créer une route qui permet de récuperer les objets à vendre
/* app.get('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 4900,
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(stuff); // Dans une app Express, le dernier middleware pour une route donnée doit renvoyer la réponse au client pour empêcher les requêtes d'expirer.
}); */