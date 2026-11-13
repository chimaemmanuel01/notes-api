
import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
const app = express();

const PORT = 3000;
const NOTES_FILE = path.join(process.cwd(), "data", "notes.json");
interface Note {
    id: string;
    title: string;
    content: string;
}
async function readNotes(): Promise<Note[]> {
    const data = await fs.readFile(NOTES_FILE, "utf-8");
    return JSON.parse(data) as Note[];
}
async function writeNotes(notes: Note[]): Promise<void> {
    await fs.writeFile(NOTES_FILE, JSON.stringify(notes, null, 2));
}
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Notes API is running!");
});
app.post("/notes", async (req, res) => {
    const notes = await readNotes();

    const newNote: Note = {
        id: Date.now().toString(),
        title: req.body.title,
        content: req.body.content
    };

    notes.push(newNote);

    await writeNotes(notes);

    res.status(201).json(newNote);
});
app.get("/notes", async (req, res) => {
    const notes = await readNotes();

    res.status(200).json(notes);
});
app.get("/notes/:id", async (req, res) => {
    const notes = await readNotes();

    const note = notes.find((note) => note.id === req.params.id);

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
});
app.put("/notes/:id", async (req, res) => {
    const notes = await readNotes();

    const noteIndex = notes.findIndex((note) => note.id === req.params.id);
    const note = notes[noteIndex];

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
}

note.title = req.body.title;
note.content = req.body.content;
    await writeNotes(notes);

    res.status(200).json(notes[noteIndex]);
});
app.delete("/notes/:id", async (req, res) => {
    const notes = await readNotes();

    const updatedNotes = notes.filter((note) => note.id !== req.params.id);

    if (notes.length === updatedNotes.length) {
        return res.status(404).json({ message: "Note not found" });
    }

    await writeNotes(updatedNotes);

    res.status(200).json({ message: "Note deleted successfully" });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
