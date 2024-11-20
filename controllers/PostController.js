const { Post, User,Sequelize } = require("../models/index");
const {Op} = Sequelize

const PostController = {
  async create(req, res) {
    try {
      const post = await Post.create(req.body);
      res.status(201).send({ message: "Publicación creada", post });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ha habido un error", error });
    }
  },
  async getAll(req, res) {
    try {
      const posts = await Post.findAll({
        // include:[User]
        include: {
          model: User,
          attributes: ["name", "email"],
        },
      });
      res.status(200).send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ha habido un error", error });
    }
  },
  async getById(req, res) {
    try {
      const post = await Post.findByPk(req.params.id,{
        include:[User]
      });
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ha habido un error", error });
    }
  },
  async getByTitle(req,res){
    try {
      const posts = await Post.findAll({
        where:{
          title:{
            [Op.like]:`%${req.params.title}%`
          }
        }
      })
      res.send(posts)
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ha habido un error", error });
    }
  },
  async delete(req,res){
    await Post.destroy({
      where:{
        id: req.params.id
      }
    })
    res.send({message:`Post with id ${req.params.id} deleted`})
  }
};

module.exports = PostController;
