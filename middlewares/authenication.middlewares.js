import { decode } from 'next-auth/jwt';

export const authenticateUser = async (req, res, next) => {
    try{
        console.log("Cookies recieved : ", req?.headers);
        const token = req?.cookies["next-auth.session-token"];

        if(!token) return res.status(401).json({
            message: "Not authenticated (token not found)",
        });

        const payload = await decode({
            token: token,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if(!payload) return res.status(401).json({
            message: "Invalid token",
        });

        req.user = payload;
        return next();
    }
    catch(error) {
        return res.status(401).json({
            message: "Authentication Failed",
        })
    }
} 