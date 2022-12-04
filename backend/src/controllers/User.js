const User = require("../models/User");
const {encrypt, decrypt} = require("../utils/encryptor");

const getUser = async (req, res) => {
  try {
    const phoneNumber = req.query.phone_number;
    const user = await User.findOne({phoneNumber});
    if (!user) {
      console.log("User not found");
      res.status(404).send("User not found");
      return;
    }
    user.privateKey = await decrypt(user.privateKey);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send({error: err.message});
  }
};

const saveUser = async (req, res) => {
  try {
    const phoneNumber = req.body?.phone_number;
    let privateKey = req.body?.private_key;
    let user = await User.findOne({phoneNumber: phoneNumber});
    if (user) {
      return res.send({id: user._id});
    }
    privateKey = await encrypt(privateKey);
    user = await User.create({phoneNumber, privateKey});
    res.send({id: user._id});
  } catch (err) {
    console.log(err);
    res.status(400).send({error: err.message});
  }
};


module.exports = {
    getUser,
    saveUser
}
