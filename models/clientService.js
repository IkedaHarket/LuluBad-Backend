/*
    Client Service Template
*/

const {Schema, model} = require('mongoose');

const ClientServiceSchema = Schema({
    nailService:{
        type: Schema.Types.ObjectId,
        ref:'NailService'
    },
    nailProduct:{
        type: Schema.Types.ObjectId,
        ref:'NailProduct'
    },
    nailShape:{
        type: Schema.Types.ObjectId,
        ref:'NailShape'
    },
    total:{
        type: String,
        required:true
    },
    owes:{
        type: String
    },
});


module.exports = model('ClientService',ClientServiceSchema);