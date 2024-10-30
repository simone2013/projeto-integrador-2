const { User, Permission, Role } = require('../models');

const userPermissions = (requiredRole) => {
    return async (req, res, next) => {
        const  userId  = req.user.id;
 
        const user = await User.findByPk(userId, {
            include: [
                {
                    model: Permission,
                    through: { attributes: [] }
                }
            ]
        });
    
        if (!user) {
            return res.status(404).json({ error: 'User does not exist' });
        }
        
        const permissionExists = user.Permissions && Array.isArray(user.Permissions) &&
        user.Permissions.map(permission => permission.dataValues.name).some(name => name === requiredRole);


        if (!permissionExists) {
            return res.status(403).json({ error: 'Role denied' });
        }
    
        next();
    };
};

const userRoles = (requiredRole) => {
    return async (req, res, next) => {
        const  userId  = req.user.id;
 
        const user = await User.findByPk(userId, {
            include: [
                {
                    model: Role,
                    through: { attributes: [] }
                }
            ]
        });
    
        if (!user) {
            return res.status(404).json({ error: 'User does not exist' });
        }
     
        const roleExists = user.Roles && Array.isArray(user.Roles) &&
        user.Roles.map(role => role.dataValues.name).some(name => name === requiredRole);
        console.log(roleExists)

        if (!roleExists) {
            return res.status(403).json({ error: 'Role denied' });
        }
    
        next();
    };
};

module.exports = {userPermissions, userRoles};
