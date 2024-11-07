const { Role } = require('../../models')

const index = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const create = async (req, res) => {
  try {
    const request = req.body;
    const role = await Role.create(request);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ error: 'Role not found' }); // corrigido para 'Role'
    }
    await role.update({ name, description });
    res.json(role); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ error: 'Role not found' }); // corrigido para 'Role'
    }

    await role.destroy();
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
  destroy
};
