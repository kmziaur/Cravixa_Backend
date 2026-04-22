import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;
    if(!token)
    {
        return res.status(401).json({message:"Unauthorized"})
    }
    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"})
    }

}

export default authMiddleware;  