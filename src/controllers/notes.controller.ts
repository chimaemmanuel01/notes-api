import type { Request, Response } from "express";
import { readNotes, writeNotes } from "../services/notes.service";
import type { Note } from "../types/note";

export async function createNote(req: Request, res: Response) {
    const notes = await readNotes();

    const newNote: Note = {
        id: Date.now().toString(),
        title: req.body.title,
        content: req.body.content
    };

    notes.push(newNote);

    await writeNotes(notes);

    res.status(201).json(newNote);
}
export async function getAllNotes(req: Request, res: Response) {
    const notes = await readNotes();

    res.status(200).json(notes);
}

export async function getNoteById(req: Request, res: Response) {
    const notes = await readNotes();

    const note = notes.find((note) => note.id === req.params.id);

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
}

export async function updateNote(req: Request, res: Response) {
    const notes = await readNotes();

    const noteIndex = notes.findIndex((note) => note.id === req.params.id);
    const note = notes[noteIndex];

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    note.title = req.body.title;
    note.content = req.body.content;

    await writeNotes(notes);

    res.status(200).json(note);
}

export async function deleteNote(req: Request, res: Response) {
    const notes = await readNotes();

    const updatedNotes = notes.filter((note) => note.id !== req.params.id);

    if (notes.length === updatedNotes.length) {
        return res.status(404).json({ message: "Note not found" });
    }

    await writeNotes(updatedNotes);

    res.status(200).json({ message: "Note deleted successfully" });
}