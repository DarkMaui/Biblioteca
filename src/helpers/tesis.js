const { Tesis } = require('../models');

module.exports = {

  async popular() {
      const tesis =  await Tesis.find().sort({likes: -1}).limit(5);

        return tesis;
    }
};