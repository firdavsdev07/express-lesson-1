import express from "express";
const  router=express.Router()
import pool from "../config/db.js";

//get all users
router.get("/",async (req,res)=>{
    try {
        const  allUsers=await pool.query("SELECT * FROM users")
        res.status(200).send({messega:"Barcha userslar",users:allUsers.rows})
    }catch (err) {
        throw  err
    }
})


//get one user
router.get("/:id",async (req,res)=>{
    const {id}=req.params
    try{
        const  user=await pool.query("SELECT * FROM users WHERE id=$1",[id])
        if(!user){
            res.send("user topilmadi")
            return
        }
        res.status(200).send({messege:"User topildi",user:user.rows[0]})
    }catch (err) {
        throw  err
    }
})

router.post('/',async (req,res)=>{
    const  {name, email} = req.body
    try{
        const newUser=await pool.query(
            "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
            [name, email]
        );
    res.status(201).send({messege:"Yangi user yaratildi",users:newUser.rows[0]})
    }catch (err) {
        res.send("yaratishda xatolik")
    }
})
export  default router