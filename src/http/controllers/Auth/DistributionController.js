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
    
      const findResource = await Resource.findOne({
        where: {
          name: req.body.name,  // Substitua pelo nome desejado
        }
      });
      console.log(req.body.quantity, findResource.quantity )
      if(req.body.quantity > findResource.quantity ){
        res.status(500).json({ error: error.message });
      }
     
      const quantity =findResource.quantity - req.body.quantity ;
      await Resource.update({ quantity: quantity }, { where: { name: req.body.name } });
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
  