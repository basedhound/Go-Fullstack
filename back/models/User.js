
//*============================================================
//*================= MONGOOSE MODEL " USER " ==================
//*============================================================

//* Importer MONGOOSE
const mongoose = require('mongoose');

//* MONGOOSE UNIQUE VALIDATOR
/* Pour s'assurer que deux utilisateurs ne puissent pas utiliser la même adresse e-mail, nous utiliserons le mot clé unique pour l'attribut email du schéma d'utilisateur userSchema . Les erreurs générées par défaut par MongoDB pouvant être difficiles à résoudre, nous installerons un package de validation pour prévalider les informations avant de les enregistrer. Unique validator améliore les messages d'erreur lors de l'enregistrement de données uniques.*/

// Installer "Mongoose unique validator" : "npm install --save mongoose-unique-validator"
// Déclarer "Mongoose unique validator" 
const uniqueValidator = require('mongoose-unique-validator')


//* Créer SCHÉMA DE DONNÉES pour nos utilisateurs
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}     
});

// Ajouter le validateur comme "plugin" à notre Schema
userSchema.plugin(uniqueValidator)
// Dans notre schéma, la valeur unique , avec l'élément mongoose-unique-validator passé comme plug-in, s'assurera que deux utilisateurs ne puissent partager la même adresse e-mail.

//* Exporter le modèle terminé
module.exports = mongoose.model('User', userSchema);