import express from 'express';
import dotenv from "dotenv"
import morgan from 'morgan';

dotenv.config({
    path: './config/.env'
})

const app = express()
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Welcome to Mern Notes App')
})

app.listen(port, ()=>{
    console.log(`Server is running up at URL : http://localhost:${port}`);
})