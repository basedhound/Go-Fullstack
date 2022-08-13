
//*=============================================================
//*================= MONGOOSE MODEL " THING " ==================
//*=============================================================

//! Fichier : Création d'un "Modèle"
// Dans votre dossier backend , créer un dossier appelé "models" + dans ce nouveau dossier, un fichier appelé "article.js".

//* Importer MONGOOSE
const mongoose = require('mongoose');

//* Créer SCHÉMA DE DONNÉES pour nos produits
/* Créer un schéma de données contenant les champs souhaités pour chaque "Thing". 
Indique leur type ainsi que leur caractère (obligatoire ou non). 
Pour cela, on utilise la méthode Schema mise à disposition par Mongoose. 
Pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose ; */

const thingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

//* Exporter le modèle terminé
/* Ensuite, exporte ce schéma en tant que modèle Mongoose appelé « Article », pour le rendre disponible dans notre application Express.*/
module.exports = mongoose.model('Thing', thingSchema);
// Arguments : [1] Nom du modèle (fichier), [2] Nom du schéma (constante)

/* Ce modèle vous permettra non seulement d'appliquer notre structure de données, mais aussi de simplifier les opérations de lecture et d'écriture dans la base de données, comme vous le verrez dans les chapitres suivants.

La méthode  "Schema"  de Mongoose vous permet de créer un schéma de données pour votre base de données MongoDB.
La méthode  "model"  transforme ce modèle en un modèle utilisable. */



