const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
    correo:{
        type:String,
        required:[true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type:String,
        required:[true, 'La contraseña es obligatoria'],
    },
    telefono:{
        type:String,
        required:[true, 'El telefono es obligatorio'],
    },
    imagen:{
        type:String
    },
    edad:{
        type:Number,
        required:[true,'La edad es obligatoria'],
    },
    instagram:{
        type:String
    },
    admin:{
        type:Boolean,
        default:false
    }
});

UsuarioSchema.methods.toJSON = function(){
    let {__v,password,_id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario
}

module.exports = model('Usuario',UsuarioSchema);