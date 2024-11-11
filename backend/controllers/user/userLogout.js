const userLoogout = async (req, res) => {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite:'strict',
    };
    res.clearCookie("token", tokenOption);

    res.status(200).json({
      data: [],
      message: "Déconnexion réussie",
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export { userLoogout };
