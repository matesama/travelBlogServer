import express from 'express';
import 'dotenv/config';
import client from './db/db.js';
import blogsRouter from './routes/blogs.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);




const port = process.env.Port || 3000;
client.on('connected', () => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
})