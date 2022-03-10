
/*
    Nail Template
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const GallerySchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
    desc:{
        type:String
    },
    imagen:{
        required:[true, 'La imagen es obligatoria'],
        type:String,
    }
    
},
{
    timestamps:true
}
);

GallerySchema.plugin(mongoosePaginate);

module.exports = model('Gallery',GallerySchema);