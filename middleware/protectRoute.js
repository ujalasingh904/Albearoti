import jwt from 'jsonwebtoken';
import { Auth } from '../models/auth.model.js';

export const protectRoute = async (req, res, next) => {

    try {

        const token = req.cookies.access_token;

        if (!token)
            return res.status(401).json("Unauthorized --- NO TOKEN PROVIDED")

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded)
            return res.status(401).json("INVALID TOKEN")

        const newUser = await Auth.findById(decoded.id).select("-password");

        if (!newUser)
            return res.status(401).json("Unauthorized --- NO USER FOUND")
        req.user = newUser;
        next();
    } catch (error) {
        console.log("error in protectRoute middleware:", error.message)
        res.status(500).json(error.message);
    }
}
