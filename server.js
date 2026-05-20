// Import Express framework → used to create server and handle routes (backend API)
import express from "express";

// Import CORS middleware → allows frontend (different domain/port) to access backend APIs
import cors from "cors";

// Import dotenv config → loads environment variables from .env file (like DB URL, API keys)
import "dotenv/config";

// Import database connection function → used to connect your app with database (e.g., MongoDB)
import connectDB from "./configs/db.js";

// Import user routes → handles all user-related APIs (login, signup, profile, etc.)
import userRouter from "./routes/userRoutes.js";

// Import resume routes → handles resume-related operations (create, update, fetch resumes)
import resumeRouter from "./routes/resumeRoutes.js";

// Import AI routes → handles AI features (like generating resume content, suggestions, etc.)
import aiRouter from "./routes/aiRoutes.js";

// Import image routes → handles image upload, processing, or retrieval
import imageRouter from "./routes/imageRoutes.js";
const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
await connectDB()

app.use(express.json())
app.use(cors())
app.use("/api/image", imageRouter);
app.get('/', (req, res)=> res.send("Server is live..."))
app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    
});