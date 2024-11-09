const { Resource } = require('../../models');
const path = require('path');
const { Op } = require('sequelize');



const index = async (req, res) => {
  try {
    const { page = 1, limit = 10, name = '' } = req.query; // Pega os parâmetros da query (página, limite e nome)

    const offset = (page - 1) * limit; // Calcula o offset para paginar os resultados

    // Busca os usuários, filtrando pelo nome e aplicando a paginação
    const resource = await Resource.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name}%`, // Filtro por nome, insensível a maiúsculas/minúsculas
        },
      },
      limit: parseInt(limit),
      offset: offset,
    });

    res.json({
      resource: resource.rows,
      total: resource.count,
      page: page,
      totalPages: Math.ceil(resource.count / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const resource = await Resource.findByPk(id);

    if (!resource) {
      return res.status(404).json({ error: 'resource not found' });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const request = req.body;
    const newResource = await Resource.create(request);
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, quantity } = req.body;


    const resource = await Resource.findByPk(id);

    if (!resource) {
      return res.status(404).json({ error: 'resource not found' });
    }

    // Atualiza o usuário
    await resource.update({  name, description, quantity });
    res.json(resource); // Retorna o usuário atualizado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteResource = async (req, res) => {
  try {
    const id = req.params.id;

    const resource = await Resource.findByPk(id);

    if (!resource) {
      return res.status(404).json({ error: 'resource not found' });
    }

    await resource.destroy();
    return res.status(200).json({ message: 'Recurso deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  index,
  edit,
  create,
  update,
  deleteResource

};
