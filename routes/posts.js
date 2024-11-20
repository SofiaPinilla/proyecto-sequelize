const express = require("express")
const PostController = require("../controllers/PostController")
const router = express.Router()

router.post("/create",PostController.create)
router.get("/getAll",PostController.getAll)
router.get("/id/:id",PostController.getById)
router.get("/title/:title",PostController.getByTitle)
router.delete("/id/:id",PostController.delete)

module.exports = router