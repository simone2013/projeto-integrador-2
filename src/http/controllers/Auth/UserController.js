const { User } = require('../../models');
const path = require('path');
const { Op } = require('sequelize');



const index = async (req, res) => {
  try {
    const { page = 1, limit = 10, name = '' } = req.query; // Pega os parâmetros da query (página, limite e nome)

    const offset = (page - 1) * limit; // Calcula o offset para paginar os resultados

    // Busca os usuários, filtrando pelo nome e aplicando a paginação
    const users = await User.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name}%`, // Filtro por nome, insensível a maiúsculas/minúsculas
        },
      },
      limit: parseInt(limit),
      offset: offset,
    });

    res.json({
      users: users.rows,
      total: users.count,
      page: page,
      totalPages: Math.ceil(users.count / limit),
    });
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



module.exports = {
  index,
  edit,
  create,
  update,
  deleteUser
};
