/*
    Appointment Template
*/


const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const AppointmentSchema = Schema({
    fecha:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:[true, 'El usuario es obligatorio'],
    },
    nail:{
        type: Schema.Types.ObjectId,
        ref:'Nail'
    },
    polishPrev:{
        type: Schema.Types.ObjectId,
        ref:'Product'
    },
    servicePrev:{
        type: Schema.Types.ObjectId,
        ref:'NailService'
    }    
},
{
    timestamps:true
});

AppointmentSchema.plugin(mongoosePaginate);

module.exports = model('Appointment',AppointmentSchema);