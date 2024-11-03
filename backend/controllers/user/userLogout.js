const userLoogout = async (req, res) => {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite:'none',
    };
    res.clearCookie("token", tokenOption);

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
