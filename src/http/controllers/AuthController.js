const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Token, PasswordResetToken } = require('../models');
const path = require('path');


const index = (req, res) => {
    const filePath = path.join(__dirname, '../../views/login/index.html');
    res.sendFile(filePath);
};


const create = (req, res) => {
    const filePath = path.join(__dirname, '../../views/login/register.html');
    res.sendFile(filePath);
};

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



const forgotPassword = async (req, res) => {
    const { email } = req.body;

    // Encontre o usuário pelo e-mail
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    // Crie um token de redefinição
    const token = require('crypto').randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600 * 1000); // Token válido por 1 hora

    // Salve o token na base de dados
    await PasswordResetToken.create({
        user_id: user.id,
        token,
        expires_at: expiresAt,
    });


    try {
        
        return res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send email' });
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    // Verifique o token
    const resetToken = await PasswordResetToken.findOne({
        where: { token },
        include: { model: User, as: 'user' },
    });

    if (!resetToken || new Date() > resetToken.expires_at) {
        return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Encontre o usuário associado ao token
    const user = resetToken.user;

    // Atualize a senha do usuário
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Exclua o token após o uso
    await resetToken.destroy();

    return res.status(200).json({ message: 'Password reset successfully' });
};

module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    index,
    create
}