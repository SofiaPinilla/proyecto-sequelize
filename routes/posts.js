const express = require("express")
const PostController = require("../controllers/PostController")
const { authentication } = require("../middleware/authentication")
const router = express.Router()

router.post("/create", authentication, PostController.create)
router.get("/getAll",PostController.getAll)
router.get("/id/:id",PostController.getById)
router.get("/title/:title",PostController.getByTitle)
router.delete("/id/:id",authentication,PostController.delete)

module.exports = router