import { Router } from "express";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware";
import {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
} from "../controllers/notes.controller";

const router = Router();

router.post("/", authenticateToken, createNote);
router.get("/", authenticateToken, getAllNotes);
router.get("/:id", authenticateToken, getNoteById);
router.put("/:id", authenticateToken, updateNote);
router.delete("/:id", authenticateToken, authorizeRole("admin"), deleteNote);

export default router;