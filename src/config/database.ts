import path from "node:path";

export const NOTES_FILE = path.join(
    process.cwd(),
    "data",
    "notes.json"
);
export const USERS_FILE = path.join(
    process.cwd(),
    "data",
    "users.json"
);