const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'badlulunails@gmail.com', // generated ethereal user
      pass: 'qehcroaqeasnnpcg', // generated ethereal password
    },
});

transporter.verify().then(()=>{
    console.log('Listo para enviar correos')
})

 module.exports ={
     transporter
 }