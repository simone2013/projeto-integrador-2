const { Permission } = require('../../models');

const index = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const permission = await Permission.findByPk(id);
    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    res.json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const request = req.body;
    const permission = await Permission.create(request);
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }

    await permission.update({ name, description });
    res.json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }

    await permission.destroy();
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
