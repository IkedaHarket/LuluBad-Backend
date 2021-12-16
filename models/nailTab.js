
/*
    Nail Tab Template
*/

const {Schema, model} = require('mongoose');

const NailTabScheme = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    },
    nailType:{
        type: Schema.Types.ObjectId,
        ref:'NailType'
    },
    nailShape:{
        type: Schema.Types.ObjectId,
        ref:'NailShape'
    },
    allergy:{
        type: String
    },
    treatment:{
        type: String
    },
    extra:{
        type: String
    },
});


module.exports = model('NailTab',NailTabScheme);