const { Permission, User, Role } = require('../../models');

const CreateUserAccess = async (req, res) => {
    const id = req.params.id;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Agora acessamos permissionIds corretamente do corpo da requisição
    const { permissionIds } = req.body;
    const { roleIds } = req.body;

    if (!Array.isArray(permissionIds) || permissionIds.length === 0) {
        return res.status(400).json({ error: 'Invalid permission IDs' });
    }

    if (!Array.isArray(roleIds) || roleIds.length === 0) {
        return res.status(400).json({ error: 'Invalid permission IDs' });
    }

    const permissions = await Permission.findAll({
        where: {
            id: permissionIds
        }
    });

    const roles = await Role.findAll({
        where: {
            id: roleIds
        }
    });

    await user.setPermissions(permissionIds);
    await user.setRoles(roleIds);

    return res.status(200).json({ user, permissions, roles });
};

module.exports = 
{CreateUserAccess}