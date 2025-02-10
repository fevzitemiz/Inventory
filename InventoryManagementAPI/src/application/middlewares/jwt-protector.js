
import JwtDecoder from "../extensions/jwt-decoder.js"

function verifyToken(req, res, next) {

    const token = req.header('Authorization');
    let isAdmin = false
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {

        req.userId = JwtDecoder(token).userId;
        isAdmin = JwtDecoder(token).isAdmin
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' + error });
    }
};

export default verifyToken;