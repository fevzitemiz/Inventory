import jwt from 'jsonwebtoken';
import "dotenv/config"

function JwtDecoder(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

export default JwtDecoder