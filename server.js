const express = require("express")
const app = express()
const PORT = 8080
const cors = require("cors")
const { DBConnection } = require("./dbConfig/db")
const { userRouter } = require("./routes/users.route")
const { fileUploadRouter } = require("./routes/fileUpload.route")


app.use(express.json())
app.use(express.text())
app.use(cors())
app.use("/users", userRouter)
app.use("/files", fileUploadRouter)

app.get("/", (req, res) => {
    res.send("welcome to server")
})

app.listen(PORT, () => {
    DBConnection()
    console.log(`Server is running on port ${PORT}`)
})