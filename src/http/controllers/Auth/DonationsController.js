const { Donation, User, Resource } = require('../../models');
const { Op } = require('sequelize');

const index = async (req, res) => {
  try {
    const donations = await Donation.findAll({
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
      const newUser = await Donation.create(request);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

module.exports = {
    create,
    index
};
  