import express from "express";
import Blog from "../models/Blog.js";



const blogsRouter = express.Router();

blogsRouter.get('/', async (req, res) => {
    try{
        const response = await Blog.find();
        res.json(response);
    }catch(err) {
        res.status(500).send(err);
    }
})

blogsRouter.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const result = await Blog.findById(id);
        
        if(!result){
            res.status(404).json({error: "Blog article not found"})
        }
        res.json(result);
    } catch(err) {
        res.status(500).send(err);
    }
})

blogsRouter.post("/", async (req, res)=> {
    try {
        const {title, description, img, list} = req.body;
        const response = await Blog.create({title, description, img, list});
        res.status(201).json(response);
    } catch(err) {
    res.status(500).json(err);
}
})

blogsRouter.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const result = await Blog.findByIdAndDelete(id)
        if(!result) {
            res.status(404).json({error: "not found"})
        }
        res.status(202).json(response)
    } catch(err) {
        res.status(500).json(err);
    }
}) 

export default blogsRouter;

