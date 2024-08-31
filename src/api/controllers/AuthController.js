const { User } = require('./models'); // Certifique-se de que o caminho está correto

const getAllUsers = async (req, res) => {
  try {
    console.log('Fetching all users');
    const users = await User.findAll(); // Verifique se User é definido
    console.log('Users fetched:', users);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
};
