const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({
      message: "Déconnexion réussie",
      success: true,
      error: false,
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

export { logout };
