import express from 'express';
import 'dotenv/config';
import client from './db/db.js';
import blogsRouter from './routes/blogs.js';
import authRouter from './routes/auth.js';
import cors from 'cors';

const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}
app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/', authRouter);


const port = process.env.PORT || 3000;
client.on('connected', () => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
})