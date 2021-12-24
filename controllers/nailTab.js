const NailTab = require("../models/nailTab");

const { verifyUserAdmin } = require("../helpers/verifyUsers");

const getNailsTabs = async(req,res) =>{
    try {

        if(verifyUserAdmin(req,res)) return false;

        const options = {
            page:   req.query.page  || 1,
            limit:  req.query.limit || 10,
            populate:[
                { path: 'user', model: 'Usuario'},
                { path: 'nailType', model: 'NailType' },
                { path: 'nailShape', model: 'NailShape' },
            ]
        }

        const nailsTabs = await NailTab.paginate({},options);

        return res.status(200).json(nailsTabs)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailTab/getNailsTabs"
        })
    }
}

const getNailTab = async(req,res) =>{
    try {

        if(verifyUserAdmin(req,res)) return false;

        const {id} = req.params;
        
        const nailTab = await NailTab.findById(id).populate([
            { path: 'user', model: 'Usuario'},
            { path: 'nailType', model: 'NailType' },
            { path: 'nailShape', model: 'NailShape' },
        ])

        return res.status(200).json(nailTab)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailTab/getNailTab"
        })
    }
}

const addNailTab = async(req,res) =>{
    try {
        
        const {...data} = req.body;

        if(verifyUserAdmin(req,res)) return false;
        
        const nailTab = new NailTab({...data});

        await nailTab.save(); 

        return res.status(200).json({
            ok:true,
            nailTab
        })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailTab/addNailTab"
        })
    }
}
const modNailTab = async(req,res) =>{
    try {
        const {id} = req.params;

        if(verifyUserAdmin(req,res)) return false;

        const {...data} = req.body;

        const nailTab = await NailTab.findByIdAndUpdate(id,{...data},{new:true}).populate([
            { path: 'user', model: 'Usuario'},
            { path: 'nailType', model: 'NailType' },
            { path: 'nailShape', model: 'NailShape' },
        ])

        return res.status(200).json({
            ok:true,
            nailTab
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailTab/modNailTab"
        })
    }
}
const deleteNailTab = async(req,res) =>{
    try {
        const {id} = req.params; 

        if(verifyUserAdmin(req,res)) return false;

        const nailTab = await NailTab.findByIdAndDelete(id).populate([
            { path: 'user', model: 'Usuario'},
            { path: 'nailType', model: 'NailType' },
            { path: 'nailShape', model: 'NailShape' },
        ])

        return res.status(200).json({
            ok:true,
            nailTab
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor",
            desc:"Error controllers/nailTab/deleteNailTab"
        })
    }
}
module.exports = {
    addNailTab,
    getNailsTabs,
    getNailTab,
    modNailTab,
    deleteNailTab
}