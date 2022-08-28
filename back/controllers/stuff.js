//====================================================
//================= THING CONTROLLER =================
//====================================================

//* Imports : 
const Thing = require('../models/Thing'); // Modèle Thing

const fs = require('fs') // File system (Node.js)
// Pour utiliser la fonction "unlink" et supprimer une image stockée localement.

//! Fonctions :

//* Afficher toutes les objets => GET
exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
}

//* Afficher un objet en particulier => GET
exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
}

//* Publier un objet => POST
exports.createThing = (req, res, next) => {
    /* Parser objet requête :
    Si un fichier (image) est ajouté à la requête, le front-end revoie les données en chaîne.*/
    const thingObject = JSON.parse(req.body.thing);
    // Supprimer "userId" de la requête (Ne jamais faire confiance à l'utilisateur)
    delete thingObject._userId;
    // Créer un nouvel objet Thing
    const thing = new Thing({
        ...thingObject,
        // Récupérer "userId" depuis le Token d'authentification
        userId: req.auth.userId,
        // Générer URL de l'image
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

//* Modifier un objet => PUT
exports.modifyThing = (req, res, next) => {
    // Objet pour vérifier si il y a un fichier dans notre requête
    const thingObject = req.file ? {
        // Si oui : Parser objet requête
        ...JSON.parse(req.body.thing),
        // Générer URL de l'image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        // Si non : Traiter objet directement (string)
    } : { ...req.body };
    // Supprimer "_userId" de la requête (Ne jamais faire confiance à l'utilisateur)
    delete thingObject.userId;
    // Chercher correspondance objet en database
    Thing.findOne({ _id: req.params.id })
        .then((thing) => {
            // Vérifier id utilisateur database/requête(token-auth)
            if (thing.userId != req.auth.userId) {
                // Mauvais utilisateur : Annuler requête 
                res.status(401).json({ message: 'Not authorized' });
            } else {
                // Bon utilisateur : Si image dans requête, supprimer ancienne image
                if (req.file) {
                    const filename = thing.imageUrl.split("/images/")[1]
                    fs.unlink(`images/${filename}`, () => {
                    })
                }
                // Modifier objet avec contenu requête
                Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//* Supprimer un objet => DELETE
exports.deleteThing = (req, res, next) => {
    // Chercher correspondance objet requête/database
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


//! Notes
//* PUBLIER : avant utilisation de multer
/* exports.createThing = (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Post saved successfully!' }))
        .catch(error => res.status(400).json({ error }));
}; */
//* MODIFIER (avant utilisation de multer)
/*exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Thing updated successfully!' }))
        .catch(error => res.status(400).json({ error }));
} */
//* SUPPRIMER (avant utilisation de multer)
/* exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: ' Deleted !' }))
        .catch(error => res.status(400).json({ error }));
} */


