const { Permission, Role } = require('../../models');

const Create = async (req, res) => {
    const roleId = req.params.id;
    const { permissionIds } = req.body;

    // Buscar o papel (role) pelo ID
    const role = await Role.findByPk(roleId);

    if (!role) {
        return res.status(404).json({ error: 'Role not found' });
    }

    // Verificar se as permissões existem
    const permissionsExists = await Permission.findAll({
        where: {
            id: permissionIds
        }
    });

    if (permissionsExists.length === 0) {
        return res.status(400).json({ error: 'No valid permissions found' });
    }

    // Atualizar as permissões da role
    await role.setPermissions(permissionsExists);

    return res.status(200).json({ role });
}

module.exports = { Create };
