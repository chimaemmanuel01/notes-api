import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt";

interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        role: "user" | "admin";
    };
}
export function authenticateToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
const authHeader = req.headers.authorization;

const token = authHeader && authHeader.split(" ")[1];
if (!token) {
    return res.status(401).json({
        message: "Access denied. No token provided."
    });
}
try {
const decoded = jwt.verify(token, JWT_SECRET);
if (
    typeof decoded === "string" ||
    typeof decoded.userId !== "string" ||
    (decoded.role !== "user" && decoded.role !== "admin")
) {
    return res.status(403).json({
        message: "Invalid token payload"
    });
}req.user = {
    userId: decoded.userId,
    role: decoded.role
};
next();
} catch (error) {
    return res.status(403).json({
        message: "Invalid or expired token"
    });
}
}
export function authorizeRole(requiredRole: "admin") {
    return (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) => {
if (!req.user || req.user.role !== requiredRole) {
    return res.status(403).json({
        message: "Access denied. Admin privileges required."
    });
}
next();
    };
}