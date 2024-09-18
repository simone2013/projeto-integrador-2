const { Permission, User, Role } = require('../../models');

const CreateUserAccess = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Agora acessamos permissionIds corretamente do corpo da requisição
    const { permissionIds } = req.body;
    console.log(permissionIds);

    if (!Array.isArray(permissionIds) || permissionIds.length === 0) {
        return res.status(400).json({ error: 'Invalid permission IDs' });
    }

    const permissions = await Permission.findAll({
        where: {
            id: permissionIds
        }
    });

    if (permissions.length === 0) {
        return res.status(404).json({ error: 'Permissions not found' });
    }

    return res.status(200).json({ user, permissions });
};

module.exports = 
{CreateUserAccess}