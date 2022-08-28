//==============================================
//================= USER MODEL =================
//==============================================

//* Mongoose import
const mongoose = require('mongoose');

//* Plugin "mongoose-unique-validator" : 
/* Facilite la gestion des erreurs de la propriété "unique" ;
Prévalide les informations avant de les enregistrer */
const uniqueValidator = require('mongoose-unique-validator');

//* Schema utilisateur 
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Email unique
    password: { type: String, required: true }
});

//* Appliquer "mongoose-unique-validator" à "userSchema"
userSchema.plugin(uniqueValidator);

//* Exports
module.exports = mongoose.model('User', userSchema);