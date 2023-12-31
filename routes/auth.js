import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const authRouter = express.Router();

const secret = process.env.SECRET;
const generateToken = (data) => {
    return jwt.sign(data, secret, {expiresIn: '1800s'})
} 

authRouter.post('/register', async (req, res) => {
    try{
        const {name, email, password} = req.body;
        
        
        const responseEmail = await User.findOne({email});
        if(responseEmail) {
            return res.json({error: 'email is already used'})
        }
        
        const hashPassword = await bcrypt.hash(password, 10);
        const response = await User.create({name, email, password: hashPassword});
        res.json(response);
    }catch(err) {
        res.status(500).send(err.message);
    }
})

authRouter.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).send({error: 'User not found'});
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if(!passwordValid) {
           return res.status(400).send({error:'Password invalid'});
        }
        const token = generateToken({email: user.email})
        if(!token) {
            return res.status(400).send({error: 'Invalid Token'});
        }
    
       res.set('token', token);
       res.set('Access-Control-Expose-Headers', 'token');

       res.json( {token} );

    } catch(err) {
        res.status(500).send(err.message);
    }
})

export default authRouter;