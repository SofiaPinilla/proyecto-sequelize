const express = require("express")
const PostController = require("../controllers/PostController")
const router = express.Router()

router.post("/create",PostController.create)
router.get("/getAll",PostController.getAll)

module.exports = router