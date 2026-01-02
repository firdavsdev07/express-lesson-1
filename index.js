import express from 'express';
import {dbConnection} from "./src/config/db.js"
import  userRouter from "./src/routes/users.route.js"


const PORT=5000;
const app = express();
app.use(express.json())

app.get("/",(req,res)=>{
    res.json("Welcome");
})

app.use("/users",userRouter)

app.listen(PORT,async ()=>{
    await dbConnection()
    console.log("Server started on port "+PORT);
})