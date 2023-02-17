const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthController = {
  register: async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    try {
      await user.save();
      res.send(user);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET
      );

      res.status(200).send({ token });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
};

module.exports = AuthController;
