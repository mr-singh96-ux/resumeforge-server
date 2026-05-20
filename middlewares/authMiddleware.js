import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // ❌ No token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'Unauthorized - No Token' });
    }

    try {
        // ✅ Extract actual token
        const token = authHeader.split(" ")[1];

        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Attach userId
        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.log("AUTH ERROR:", error.message);
        console.log("SECRET:", process.env.JWT_SECRET);
        console.log("TOKEN:", token);
        return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }
};

export default protect;