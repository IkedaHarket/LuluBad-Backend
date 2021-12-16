/*
    Service History Template
*/

const {Schema, model} = require('mongoose');

const ServiceHistorySchema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    },
    service:{
        type: Schema.Types.ObjectId,
        ref:'ClientService'
    },
    timestamps: true
});


module.exports = model('ServiceHistory',ServiceHistorySchema);