
const express = require("express");
const { connection } = require("./config/db");

const cors = require("cors");
const { userRouter } = require("./routes/User.routes");
const { authenticate } = require("./middlewares/authenticate.middleware");
require("dotenv").config()
const app = express();


app.use(express.json());

app.use(cors())

app.get("/",(req,res)=>{
    res.send("HOMEPAGE")
})

app.use("/users",userRouter)
app.use(authenticate)

app.use(express.urlencoded({extended:true}))


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running on port ${process.env.port}`)
})

