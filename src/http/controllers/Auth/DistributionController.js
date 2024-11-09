const { Distribution, User, Resource } = require('../../models');
const { Op } = require('sequelize');

const index = async (req, res) => {
  try {
    const donations = await Distribution.findAll({
      include: [
        {
          model: User, 
          as: 'user',
        
        },
        {
          model: Resource,
          as: 'resource', 
       
        },
      ],
    });

    res.json(donations); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};


const create = async (req, res) => {
    try {
      const request = req.body;
      const id = req.body.resource_id;
    
      const findResource = await Resource.findByPk(id);
      
      const quantity = req.body.quantity + findResource.quantity;
      await Resource.update({ quantity: quantity }, { where: { id: id } });
      const newUser = await Distribution.create(request);
     
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

module.exports = {
    create,
    index
};
  