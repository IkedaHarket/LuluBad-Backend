/*
    Appointment Template
*/


const {Schema, model} = require('mongoose');

const AppointmentSchema = Schema({
    fecha:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    },
    nail:{
        type: Schema.Types.ObjectId,
        ref:'Nail'
    },
    polishPrev:{
        type: Schema.Types.ObjectId,
        ref:'NailPolish'
    },
    servicePrev:{
        type: Schema.Types.ObjectId,
        ref:'NailService'
    },
});


module.exports = model('Appointment',AppointmentSchema);