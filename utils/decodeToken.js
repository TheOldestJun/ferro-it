import jwt from "jsonwebtoken";

export default function decodeToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return null
    }
}