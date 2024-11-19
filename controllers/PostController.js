const { Post,User } = require("../models/index");

const PostController = {
  async create(req, res) {
    try {
      const post = await Post.create(req.body);
      res.status(201).send({ message: "Publicación creada", post });
    } catch (error) {
        console.error(error);
            res.status(500).send({message:"Ha habido un error",error})
    }
  },
  async getAll(req,res){
    try {
        const posts = await Post.findAll({
            // include:[User]
            include:{
                model:User,
                attributes:["name","email"]
            }

        })
        res.status(200).send(posts)
    } catch (error) {
        console.error(error);
        res.status(500).send({message:"Ha habido un error",error})
    }
  }
};

module.exports = PostController;
