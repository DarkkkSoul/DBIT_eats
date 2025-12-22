import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.model.js';

dotenv.config();

const authorizeMiddleware = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            const error = new Error("Unauthorized");
            error.statusCode = 404;
            throw error;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECERT_KEY);

        const userId = decoded.userId;

        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 400;
            throw error;
        }

        req.user = user;
        next();


    } catch (error) {
        next(error);
    }
}

export default authorizeMiddleware