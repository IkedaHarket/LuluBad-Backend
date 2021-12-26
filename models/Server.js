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
            auth:           '/api/auth',
            user:           '/api/user',
            nail:           '/api/nail',
            nailType:       '/api/nail-type',
            nailShape:      '/api/nail-shape',
            nailService:    '/api/nail-service',
            shoppingList:   '/api/shopping-list',
            provider:       '/api/provider',
            productBrand:   '/api/product-brand',
            productCategory:'/api/product-category',
            product:        '/api/product',
            nailTab:        '/api/ficha',
            clientService:  '/api/client-service',
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
        this.app.use(this.paths.auth,           require('../routes/auth'));
        this.app.use(this.paths.user,           require('../routes/user'));
        this.app.use(this.paths.nail,           require('../routes/nail'));
        this.app.use(this.paths.nailType,       require('../routes/nailType'));
        this.app.use(this.paths.nailShape,      require('../routes/nailShape'));
        this.app.use(this.paths.nailService,    require('../routes/nailService'));
        this.app.use(this.paths.shoppingList,   require('../routes/shoppingList'));
        this.app.use(this.paths.provider,       require('../routes/provider'));
        this.app.use(this.paths.productBrand,   require('../routes/productBrand'));
        this.app.use(this.paths.productCategory,require('../routes/productCategory'));
        this.app.use(this.paths.product,        require('../routes/product'));
        this.app.use(this.paths.nailTab,        require('../routes/nailTab'));
        this.app.use(this.paths.clientService,  require('../routes/clientService'));

    }

    listen(){//Escucha
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto: '+this.port);
        })
    }
}

module.exports = Server