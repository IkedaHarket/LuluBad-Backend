
/*
    Nail Tab Template
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const NailTabScheme = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        unique:true
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
},{
    timestamps:true
});


NailTabScheme.plugin(mongoosePaginate);

module.exports = model('NailTab',NailTabScheme);