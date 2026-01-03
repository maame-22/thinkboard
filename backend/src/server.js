import express from 'express'
import noteRoutes from './routes/noteRoutes.js'

import { connectDB } from '../config/db.js'
import cors from 'cors'
import dotEnv from 'dotenv'
import rateLimiter from '../middleware/ratelimit.js';

dotEnv.config();

const app = express()

app.use(cors(
    {
        origin:["http://localhost:5173"]
    }
))
app.use(express.json())
app.use(rateLimiter)


app.use('/api/notes', noteRoutes)


connectDB().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("server is running on port 3000")
    })
});