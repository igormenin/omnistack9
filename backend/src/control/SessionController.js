// index, show, store, update, destroy
const User = require('../model/User');
module.exports = {
  async store(req,res){
    const { name } = req.body;
    const { email } = req.body;
    const { pass } = req.body;
    const { active } = req.body;
    let user = await User.findOne({ email });
    if (!user){
      user = await User.create({ name, email, pass, active });
    }
    return res.json(user);
  }
};