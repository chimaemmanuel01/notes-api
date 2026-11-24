import express from "express";
import notesRoutes from "./routes/notes.routes";
import authRoutes from "./routes/auth.routes";
const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Notes API is running successfully"
    });
});

app.use("/api/notes", notesRoutes);
export default app;