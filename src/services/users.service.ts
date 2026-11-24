import fs from "node:fs/promises";
import { USERS_FILE } from "../config/database";
import type { User } from "../types/user";

export async function readUsers(): Promise<User[]> {
    const data = await fs.readFile(USERS_FILE, "utf-8");

    return JSON.parse(data) as User[];
}

export async function writeUsers(users: User[]): Promise<void> {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}