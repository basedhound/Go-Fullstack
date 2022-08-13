//*===================================================
//*================= CONTROLLER ======================
//*===================================================
//*=============== OBJECTS FUNCTIONS =================
//*===================================================

//! On allège nos "Routes" en refactorant la logique métier dans un fichier extérieur ;
/* Pour rendre notre structure encore plus modulaire, et simplifier la lecture et la gestion de notre code, 
nous allons séparer la logique métier de nos routes en contrôleurs.

Créez un dossier controllers dans votre dossier backend et créez un autre fichier stuff.js .

Un fichier de contrôleur exporte des méthodes qui sont ensuite attribuées aux routes pour améliorer la maintenabilité de votre application.

Ici, nous exposons la logique de nos routes en tant que fonctions (createThing, modifyThing ...). 

Pour réimplémenter cela dans notre route, nous devons importer notre contrôleur puis enregistrer nos fonctions :
[ROUTEUR FINAL dans fichier "routes/stuff.js"]
const stuffCtrl = require('../controllers/stuff');
router.get('/', stuffCtrl.getAllStuff);
router.post('/', stuffCtrl.createThing);
router.get('/:id', stuffCtrl.getOneThing);
router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);

Comme vous le voyez, cela facilite la compréhension de notre fichier de routeur. 
Quelles routes sont disponibles à quels points de terminaison est évident, et les noms descriptifs donnés aux fonctions de notre contrôleur permettent de mieux comprendre la fonction de chaque route.

Structurer le code de manière modulaire comme cela n'est pas absolument nécessaire pour chaque projet.
Cependant, c'est une bonne habitude à prendre car cela simplifie la maintenance.
*/

//! IMPORT => MODÈLE/SCHENA "THING"
const Thing = require('../models/Thing');

//! IMPORT => PACKAGE FS (FILE-SYSTEM) DE CODE
// Pour supprimer une image en local, en même temps que l'annonce
const fs = require('fs');
// Note : FS ne requiers par d'installation nnpm

//* POST Request => Créer une route permettant aux utilisateurs de poster leurs articles à vendre
//* V1 : avant utilisation de multer
/* exports.createThing = (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Post saved successfully!' }))
        .catch(error => res.status(400).json({ error }));
}; */

//* V2 : après utilisation de multer => prise en charge images uploadées
exports.createThing = (req, res, next) => {
    /* Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data et non sous forme de JSON. Le corps de la requête contient une chaîne thing, qui est simplement un objetThing converti en chaîne. Nous devons donc l'analyser à l'aide de JSON.parse() pour obtenir un objet utilisable. */
    const thingObject = JSON.parse(req.body.thing);
    // Supprimer champ _id/_userId de la requête client = Ne jamais faire confiance au client
    delete thingObject._id;
    delete thingObject._userId;
    // Créer un nouvel objet après suppression
    const thing = new Thing({
        ...thingObject,
        // Récupérer userId extrait du token par le middleware d'authentification
        userId: req.auth.userId,
        // Résoudre url complète de notre image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        // 1. "req.protocol" = http (dans notre cas)
        // 2. req.get('host) = hôte server (localhost:xxxx)
        // 3. '/images/' = Dossier image
        // 4. req.file.filename = Nom du fichier
    });
    // Enregistrer dans database
    thing.save()
        .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) })
};
/* En fait, nous effectuons une demande GET vers  http://localhost:3000/images/<image-name>.jpg. 
Cela semble simple, mais n'oubliez pas que notre application s'exécute sur localhost:3000 et nous ne lui avons pas indiqué comment répondre aux requêtes transmises à cette route : elle renvoie donc une erreur 404. Pour remédier à cela, nous devons indiquer à notre app.js comment traiter les requêtes vers la route /image, en rendant notre dossier images statique.
Penser à ajouter la route image dans "app.js"
[IMPORT] const path = require('path'); 
[MIDDLEWARE] app.use('/images', express.static(path.join(__dirname, 'image')));*/

//* GET Request => Créer une route qui permet de récuperer les objets à vendre
exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
}

//* GET Request => Créer une route qui permet de récuperer un objet spécifique
exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
}

//* PUT Request => Modifier un élément existant
//* V2 : après utilisation de multer => prise en charge images uploadées
exports.modifyThing = (req, res, next) => {
    // On crée un objet thingObject qui regarde si req.file existe ou non (si il y a un fichier joint)
    const thingObject = req.file ? {
        // S'il existe, on traite la nouvelle image (On parse le 'string' + génère url image)
        // JSON.parse() transforme un objet stringifié en Object JavaScript exploitable
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        // S'il n'existe pas, on traite simplement l'objet entrant (string)
    } : { ...req.body };
    // (sécurité) Supprimer champ _id/_userId de la requête client = Ne jamais faire confiance au client
    delete thingObject._userId;
    // Cherche élément dans database
    Thing.findOne({ _id: req.params.id })
        .then((thing) => {
            // Vérifier que l'utilisateur qui modifie est propriétaire
            // Si l'userId database et différent de userId de la requête
            if (thing.userId != req.auth.userId) {
                // Annulation de la requête 
                res.status(401).json({ message: 'Not authorized' });
                // Si bon utilisateur
            } else {
                // Mettre à jour élément 
                // Quel est l'enregistrement à mettre à jour ? = { _id: req.params.id }
                // Avec quel objet ? = { ...thingObject, _id: req.params.id } (thingObject récupéré de notre fonction + userId des paramètres)
                Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//* V1 : avant utilisation de multer
/*exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Thing updated successfully!' }))
        .catch(error => res.status(400).json({ error }));
} */



//* DELETE Request => Supprimer un Thing existant

//* V2 : après utilisation de multer => UNLINK (suppression des images téléchargées) 

/* Penser à déclarer : const fs = require('fs'); 
FS ne requiers par d'installation. Le package fs expose des méthodes pour interagir avec le système de fichiers du serveur.
Il nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers, y compris aux fonctions permettant de supprimer les fichiers. La méthode unlink() du package  fs  vous permet de supprimer un fichier du système de fichiers.

Tout d’abord, nous devons nous assurer que la personne qui en fait la requête est bien celle qui a créé ce Thing. 

Puis en ce qui concerne la gestion des fichiers dans notre back-end, il faut absolument nous assurer qu’à chaque suppression d'un Thing de la base de données, le fichier image correspondant est également supprimé. */

exports.deleteThing = (req, res, next) => {
    // Cherche élément dans database
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            // ID que nous recevons comme paramètre pour accéder au Thing correspond-t'il avec la base de données ?
            // Vérifier si l’utilisateur qui a fait la requête de suppression est bien celui qui a créé le Thing.
            // Si l'userId database et différent de userId de la requête.
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé' })
            } else {
                // SPLIT : Utiliser le fait notre URL d'image contient un segment /images/ pour séparer le nom de fichier. 
                const filename = thing.imageUrl.split('/images/')[1];
                // Utiliser fonction unlink du package fs pour supprimer ce fichier ;
                // en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé.
                fs.unlink(`images/${filename}`, () => {
                    // Dans le callback, implémenter la logique d'origine en supprimant le Thing de la base de données.
                    Thing.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                })
            }
        })
        .catch(err => {
            res.status(500).json({ errror });
        })
}

//* V1 : avant utilisation de multer
/* exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: ' Deleted !' }))
        .catch(error => res.status(400).json({ error }));
} */



