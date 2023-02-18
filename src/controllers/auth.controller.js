const User = require("../models/user.model");
const ResetTokenPassword = require("../models/resetTokenPassword.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../../config/nodemail.config");
const { v4: uuidv4 } = require("uuid");

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
        { email: user.email, id: user._id, shop: user.shop },
        process.env.JWT_SECRET
      );

      res.status(200).send({ token });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  forgotPassword: async (req, res) => {
    const { email } = req.body;
    try {
      const findUser = await User.findOne({ email: email });
      if (!findUser) {
        return res.status(404).send({ message: "User not found" });
      }
      const resetPassword = await ResetTokenPassword.findOne({
        user: findUser._id,
      });
      let uid;
      if (!resetPassword) {
        uid = uuidv4();
        ResetTokenPassword.create({ user: findUser._id, token: uid });
      } else {
        uid = resetPassword.token;
      }
      const mailOptions = {
        from: "example@example.com",
        to: email,
        subject: "Réinitialisation de votre mot de passe",
        html: `<a href="http://localhost:3000/auth/reinitialiser-mot-de-passe/${uid}">Réinitialiser</a>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.send({ message: "Reset password link sent to your email" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const findResetPassword = await ResetTokenPassword.findOne({ token: id });
      if (!findResetPassword) {
        return res
          .status(404)
          .send({ message: "Reset password link not found" });
      }
      const userId = findResetPassword.user;
      const findUser = User.findOne({ id: userId });
      if (!findUser) {
        return res.status(404).send({ message: "User not found" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const updateUser = await User.findByIdAndUpdate(userId, {
        password: hashedPassword,
      });
      await updateUser.save();
      await ResetTokenPassword.findByIdAndDelete(findResetPassword._id);
      res.send(updateUser);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  getUserMe: async (req, res) => {
    try {
      const email = req.user.email;
      const user = await User.findOne({ email: email }).select("-password");
      res.send(user);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
};

module.exports = AuthController;
