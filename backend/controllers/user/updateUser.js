import userModel from "../../models/userModel.js";

const updateUser = async (req, res) => {
  try {
    const sessionUser = req.userId;
    const { userId, email, name, role } = req.body;
    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const user = await userModel.findById(sessionUser);
    console.log("user.role", user.role);

    const updateUser = await userModel.findByIdAndUpdate(userId, payload);
    res.json({
      data: updateUser,
      message: "Le role de l'tilisateur a été mis à jour",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export { updateUser };
