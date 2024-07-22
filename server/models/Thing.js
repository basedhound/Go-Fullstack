
//==============================================
//================ THING MODEL =================
//==============================================

//* Mongoose import
const mongoose = require('mongoose');

//* Schema Sauce
const thingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

//* Exporter le modèle terminé
module.exports = mongoose.model('Thing', thingSchema);
// Arguments : [1] Nom du modèle (fichier), [2] Nom du schéma (constante)
