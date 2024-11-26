const express = require("express")
const { typeError } = require("./middleware/errors.js")
const app = express()
const PORT = 3000

app.use(express.json())//parsea body si no ponemos esto req.body es undefined

app.use("/users",require("./routes/users.js"))
app.use("/posts",require("./routes/posts.js"))

app.use(typeError)

app.listen(PORT,()=> console.log("Servidor levantaoooH en el puerto "+PORT))

module.exports = app