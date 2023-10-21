import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    try{
        const {name, email, password} = req.body;
        
        const hashPassword = await bcrypt.hash(password, 10);
        const response = await User.create({name, email, password: hashPassword});
        res.json(response);
    }catch(err) {
        res.status(500).send(err);
    }
})


export default authRouter;