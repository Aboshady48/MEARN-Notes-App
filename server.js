import express from 'express';
import dotenv from "dotenv"
import morgan from 'morgan';
import NotesRoutes from "./Routes/Notes.js";

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

// Routes
app.use("/api/v1/notes", NotesRoutes);

app.listen(port, ()=>{
    console.log(`Server is running up at URL : http://localhost:${port}`);
})