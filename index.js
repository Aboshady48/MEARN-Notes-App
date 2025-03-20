import express from "express";
import morgan from "morgan";
import NotesRoutes from "./Routes/Notes.js";
import dotenv from "dotenv";
import { CreateDb } from "./config/db.js";
import UsersRoutes from "./Routes/UsersRoutes.js";
import cors from "cors";

dotenv.config({ path: "./config/config.env" });

const app = express();
const port = process.env.PORT || 3000;

// ✅ Allow Everyone to Access the API
import cors from "cors";

app.use(
  cors({
    origin: "*", // Allow all origins (public API)
    credentials: true, // Allow cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow required headers
  })
);


// ✅ Handle preflight requests
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send(`
        <html>
            <head>
                <title>Welcome to MERN Notes App</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        text-align: center;
                        padding: 20px;
                    }
                    h1 {
                        color: #333;
                    }
                    .container {
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                        display: inline-block;
                        text-align: left;
                    }
                    ul {
                        list-style: none;
                        padding: 0;
                    }
                    li {
                        margin: 10px 0;
                    }
                    a {
                        text-decoration: none;
                        color: #007bff;
                        font-weight: bold;
                    }
                    a:hover {
                        color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <h1>Welcome to MERN Notes App by Aboshady</h1>
                <div class="container">
                    <h2>Available Routes:</h2>
                    <ul>
                        <li><a href="/api/v1/notes" target="_blank">GET All Notes</a></li>
                        <li><a href="/api/v1/notes/:id" target="_blank">GET Note by ID</a></li>
                        <li>POST <code>/api/v1/notes</code> (Create Note)</li>
                        <li>PUT <code>/api/v1/notes/:id</code> (Update Note)</li>
                        <li>DELETE <code>/api/v1/notes/:id</code> (Delete Note)</li>
                        <li><a href="/api/v1/users/register" target="_blank">Register User</a></li>
                        <li><a href="/api/v1/users/login" target="_blank">Login User</a></li>
                    </ul>
                </div>
            </body>
        </html>
    `);
});

// ✅ Define Routes AFTER enabling CORS
app.use("/api/v1/notes", NotesRoutes);
app.use("/api/v1/users", UsersRoutes);

// ✅ Ensure preflight requests are handled properly for API routes
app.use("/api/v1", (req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Connect to Database
CreateDb();

// Start the Server
app.listen(port, () => {
  console.log(`🚀 Server is running at: http://localhost:${port}`);
});
