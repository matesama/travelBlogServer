import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const authRouter = express.Router();

const secret = process.env.SECRET;
const generateToken = (data) => {
    return jwt.sign(data, secret, {expiresIn: '1800s'})
} 

authRouter.post('/register', async (req, res) => {
    try{
        const {name, email, password} = req.body;
        
        const hashPassword = await bcrypt.hash(password, 10);
        const response = await User.create({name, email, password: hashPassword});
        res.json(response);
    }catch(err) {
        res.status(500).send(err.message);
    }
})

authRouter.post('/login'), async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).send('User not found');
        }

        const passwordValid = await bcrypt.compare(password, User.password);
        if(!passwordValid) {
            res.status(400).send('Password invalid');
        }
        const token = generateToken({email: User.email})
        if(!token) {
            res.status(400).send('Invalid Token');
        }
    
       res.set('token', token);
       res.set('Access-Control-Expose-Headers', 'token');

       res.send(token);

    } catch(err) {
        res.status(500).send(err.message);
    }
}


export default authRouter;