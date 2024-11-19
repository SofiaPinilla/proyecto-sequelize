const { User,Post } = require("../models/index")//importar modelo

const UserController = {
    async create(req,res){
        try {
            // console.log(req.body)
            const user = await User.create(req.body)
        res.status(201).send({message:"Usuario creado",user})
        } catch (error) {
            console.error(error);
            res.status(500).send({message:"Ha habido un error",error})
        }
    },
    async getAll(req,res){
        try {
            const users = await User.findAll({
                // include:[Post]
                include:{
                    model:Post,
                    attributes:["title","content"]
                }
    
            })
            res.status(200).send(users)
        } catch (error) {
            console.error(error);
            res.status(500).send({message:"Ha habido un error",error})
        }
      }

};

module.exports = UserController;
