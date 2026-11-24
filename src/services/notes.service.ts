import fs from "node:fs/promises";
import { NOTES_FILE } from "../config/database";
import { Note } from "../types/note";

export async function readNotes(): Promise<Note[]> {
    const data = await fs.readFile(NOTES_FILE, "utf-8");

    return JSON.parse(data) as Note[];
}

export async function writeNotes(notes: Note[]): Promise<void> {
    await fs.writeFile(NOTES_FILE, JSON.stringify(notes, null, 2));
}