import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            success: false,
            message: "You must be logged in",
        });
    }

    const token = authorization.replace('Bearer ', '');

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid token",
            });
        }

        // Extract user ID from payload
        const { id } = payload;
        req.userId = id;  // Fix: Use `=` instead of `-`
        
        next();
    });
};
