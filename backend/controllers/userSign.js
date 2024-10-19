import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Entrer un email valide");
    }
    if (!password) {
      throw new Error("Entrer  un mot de passe valide");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    const checkPassword = await bcrypt.compareSync(password, user.password);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = jwt.sign(tokenData, process.env.TOEKN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      res.cookie("token", token, tokenOption).json({
        message: "Connexion réussie",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Verifiez votre mot de passe ");
    }
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { userSignin };
