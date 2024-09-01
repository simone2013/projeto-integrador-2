const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Token } = require('../models');

const register = async (req, res) => {
    const request = req.body;
    const email = request.email;

    const user = await User.findOne({where:{ email }})
    if(user){
        return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(request.password, 10);
    request.password = hashedPassword;

    const newUser = await User.create(request)

    return res.status(201).json({ message: 'User created successfully', user: newUser });

}

const login = async (req, res) => {
    try {
        const request = req.body;

        const email = request.email;
    
        const user = await User.findOne({where:{ email }})

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(request.password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const accessToken = jwt.sign({ id: user.id, name: user.name }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ accessToken });
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        // Decodificar o token para obter o tempo de expiração
        const decodedToken = jwt.decode(token);
        const expiresAt = new Date(decodedToken.exp * 1000); // Converte para formato de data

        // Salvar o token na tabela jwt_blacklist
        await Token.create({
            token,
            expires_at: expiresAt,
        });

        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to logout' });
    }
};  

const forgotPassword = async (res, req) => {
    const {email} = req.body

    const user = await User.findOne({where : {email}})
    if(!user){
        return res.status(400).json({error: 'User Not Found'})
    }

    
}

module.exports = {
    register,
    login,
    logout
}