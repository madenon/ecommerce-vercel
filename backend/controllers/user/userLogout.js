const userLoogout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.json({
      message: "Déconnexion réussie",
      error: false,
      success: true,
      data: [],
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
