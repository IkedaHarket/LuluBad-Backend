const { verifyUserAdmin } = require("../helpers/verifyUsers");
const ClientService = require("../models/clientService");

const getClientsServices = async(req,res) =>{
    try {

        const options = {
            page:   req.query.page  || 1,
            limit:  req.query.limit || 10,
            populate:[
                { path: 'nail', model: 'Nail'},
                { path: 'user', model: 'Usuario' },
                { path: 'nailService', model: 'NailService' },
            ]
        }

        const clientServices = await ClientService.paginate({},options);
        // const products = await Product.find().populate({ path: 'marca', model: 'ProductBrand' })

        return res.status(200).json(clientServices)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/clientService/getClientsServices"
        })
    }
}

const getClientService = async(req,res) =>{
    try {
        const {id} = req.params;
        
        const clientService = await ClientService.findById(id).populate([
            { path: 'nail', model: 'Nail'},
            { path: 'user', model: 'Usuario' },
            { path: 'nailService', model: 'NailService' },
        ])

        return res.status(200).json(clientService)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/clientService/getClientService"
        })
    }
}

const addClientService = async(req,res) =>{

    try {
        
        const {...data} = req.body;

        if(verifyUserAdmin(req,res)) return false;
        
        const clientService = new ClientService({...data});

        await clientService.save(); 

        return res.status(200).json({
            ok:true,
            clientService
        })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/clientService/addClientService"
        })
    }
}

module.exports = {
    getClientsServices,
    getClientService,
    addClientService
}