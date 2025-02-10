
import JwtDecoder from "../extensions/jwt-decoder.js"

function verifyRole(req, res, next) {

    const token = req.header('Authorization');
    let isAdmin = false
    isAdmin = JwtDecoder(token).isAdmin
    if (!isAdmin) return res.status(401).json({ error: 'Access denied' });
    try {
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' + error });
    }
};

export default verifyRole;