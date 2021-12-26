/*
    Client Service Template
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const ClientServiceSchema = Schema({
    nailService:[{
        type: Schema.Types.ObjectId,
        ref:'NailService'
    }],
    nail:{
        type: Schema.Types.ObjectId,
        ref:'Nail',
        required:[true, 'La uña es obligatoria'],
    },
    nailShape:{
        type: Schema.Types.ObjectId,
        ref:'NailShape'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'usuario',
        required:[true, 'El usuario es obligatorio'],
    },
    total:{
        type: String,
        required:[true, 'El total es obligatorio'],
    },
    owes:{
        type: String
    },
    note:{
        type: String
    },
    pagado:{
        type:Boolean
    }    
},
{
    timestamps:true
});
ClientServiceSchema.plugin(mongoosePaginate);


module.exports = model('ClientService',ClientServiceSchema);