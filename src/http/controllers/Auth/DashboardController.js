const { Distribution, User, Resource, Donation } = require('../../models');

const index = async (req, res) => {
    try {
      const usuarios = await User.findAll();
      const distribuicoes = await Distribution.findAll();
      const recursos = await Resource.findAll();
      const doacoes = await Donation.findAll();
  
      res.json({
        totalUsuarios: usuarios.length,
        totalDistribuicoes: distribuicoes.length,
        totalRecursos: recursos.length,
        totalDoacoes: doacoes.length,
        usuarios: usuarios,
        distribuicoes: distribuicoes,
        recursos: recursos,
        doacoes: doacoes,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
   index
};