import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { readUsers, writeUsers } from "../services/users.service";
import { JWT_SECRET } from "../config/jwt";
import type { User } from "../types/user";

export async function registerUser(req: Request, res: Response) {
    const { username, email, password } = req.body;

    const users = await readUsers();

    const existingUser = users.find(
        (user) => user.email === email
    );
    

    if (existingUser) {
        return res.status(409).json({
            message: "Email already registered"
        });
        
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser: User = {
    id: Date.now().toString(),
    username,
    email,
    password: hashedPassword,
    role: "user"
};
users.push(newUser);

await writeUsers(users);
res.status(201).json({
    message: "User registered successfully",
    user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
    }
});

}
export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const users = await readUsers();
    const user = users.find(
    (user) => user.email === email
);
if (!user) {
    return res.status(401).json({
        message: "Invalid email or password"
    });
}const isPasswordValid = await bcrypt.compare(
    password,
    user.password
);if (!isPasswordValid) {
    return res.status(401).json({
        message: "Invalid email or password"
        
    });
    
}
const token = jwt.sign(
    {
        userId: user.id,
        role: user.role
    },
    JWT_SECRET,
    { expiresIn: 3600 }
);
res.status(200).json({
    message: "Login successful",
    token,
    user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    }
});
}
