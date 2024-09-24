import { Auth } from "../models/auth.model.js"; 
import bcryptjs from "bcryptjs"
import { generateTokenandSetCookie } from "../utils/generateTokenandSetCookie.js";


export const signup = async (req, res) => {
    const { name, email, password} = req.body;

    try { 
        const User = await Auth.findOne({ email })
        if (User)
            return res.status(400).json("User with this email already exist");

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new Auth({ name, email, password: hashedPassword})

        if (newUser) {
            generateTokenandSetCookie(newUser._id, res)
            await newUser.save();

            const { password: hashedPassword2, ...rest } = newUser._doc;
            return res.status(201).json(rest);
        } else {
            return res.status(400).json("invalid Data")
        }
    } catch (error) {
        console.log("error in signup controller", error.message);
        return res.status(500).json(error.message)

    }

}

export const login = async (req, res) => {

    const { email, password } = req.body;
    try {
        const newUser = await Auth.findOne({ email })

        if (!newUser)
            return res.status(400).json("Invalid ceredentials")

        const verifyPassword = bcryptjs.compareSync(password, newUser.password);

        if (!verifyPassword)
            return res.status(400).json("Invalid ceredentials")

        generateTokenandSetCookie(newUser._id, res);
        const { password: hashedPassword, ...rest } = newUser._doc;
        return res.status(201).json(rest);

    } catch (error) {
        console.log("error in login controller", error.message);
        return res.status(500).json(error.message)
    }

}

export const logout = async (req, res) => {
    try {
        return res.clearCookie('access_token').status(200).json("User logout successfully")
    } catch (error) {
        console.log("error in logout controller", error.message);
        return res.status(500).json(error.message)
    }
} 