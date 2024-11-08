const { User } = require('../../models');
const path = require('path');


const index = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const request = req.body;
    const newUser = await User.create(request);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email } = req.body;


    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Atualiza o usuário
    await user.update({ name, email });
    res.json(user); // Retorna o usuário atualizado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findDonations = async (req, res) => {
    
    const filePath = path.join(__dirname, '../../../views/fomulario/index.html');

    res.sendFile(filePath);
};


const donations = async (req, res) => {
    
  const filePath = path.join(__dirname, '../../../views/fomulario/list.html');

  res.sendFile(filePath);

};

module.exports = {
  index,
  edit,
  create,
  update,
  deleteUser,
  findDonations,
  donations
};
