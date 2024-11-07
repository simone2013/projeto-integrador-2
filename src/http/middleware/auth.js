const jwt = require('jsonwebtoken');
const { User, Token } = require('../models'); // Certifique-se de que o caminho está correto

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    const findToken = await Token.findOne({
        where: { token }
    });
    
    if(findToken){
        return res.status(401).json({ error: 'Token is expired' });
    }
   

    if (token == null) {
        return res.status(401).json({ error: 'Token missing' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        const dbUser = await User.findByPk(user.id); 
        if (!dbUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
