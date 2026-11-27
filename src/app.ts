import express from "express";
import notesRoutes from "./routes/notes.routes";
import authRoutes from "./routes/auth.routes";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
const app = express();
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173"
}));
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    skipSuccessfulRequests: true,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many failed login attempts. Please try again later."
    }
});
app.use(express.json());
app.use("/user/login", loginLimiter);
app.use("/user", authRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Notes API is running successfully"
    });
});

app.use("/api/notes", notesRoutes);
export default app;