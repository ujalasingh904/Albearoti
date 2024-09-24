import jwt from "jsonwebtoken"

export const generateTokenandSetCookie = (userId, res) => {

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie('access_token', token ,{
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'Strict', 
        path:'/'
    }); 
 
} 