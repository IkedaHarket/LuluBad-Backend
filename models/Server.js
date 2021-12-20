/*
    Aqui van las principales configuraciones del servidor
*/


const express = require('express');
const cors    = require('cors');
//Funcion para conectar a la BD
const {dbConnection} = require('../database/config')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            //Aca van todos los paths a los que se quiera acceder
            auth:       '/api/auth',
            user:       '/api/user',
            nail:       '/api/nail',
            nailType:   '/api/nail-type',
        };
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB (){//Conectar a la base de datos
        await dbConnection();
    }

    middlewares(){
        //Cors
        this.app.use(cors());
        //Parsear el body
        this.app.use(express.json());
        //Levantar directorio publico
        this.app.use(express.static('public'))
    }

    routes(){//Configurar cada path a su ruta correspondiente
        this.app.use(this.paths.auth,       require('../routes/auth'));
        this.app.use(this.paths.user,       require('../routes/user'));
        this.app.use(this.paths.nail,       require('../routes/nail'));
        this.app.use(this.paths.nailType,   require('../routes/nailType'));
    }

    listen(){//Escucha
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto: '+this.port);
        })
    }
}

module.exports = Server