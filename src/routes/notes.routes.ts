import { Router } from "express";
import { validate } from "../middleware/validation.middleware";
import {
    createNoteSchema,
    updateNoteSchema
} from "../validators/note.validator";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware";
import {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
} from "../controllers/notes.controller";

const router = Router();

router.post("/", authenticateToken, validate(createNoteSchema), createNote);
router.get("/", authenticateToken, getAllNotes);
router.get("/:id", authenticateToken, getNoteById);
router.put("/:id", authenticateToken, validate(updateNoteSchema), updateNote);
router.delete("/:id", authenticateToken, authorizeRole("admin"), deleteNote);

export default router;