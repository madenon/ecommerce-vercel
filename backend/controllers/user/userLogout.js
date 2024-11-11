const userLoogout = async (req, res) => {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite:'None',
    };
    res.clearCookie("token", tokenOption);

    res.status(200).json({
      message: "Déconnexion réussie",
      error: false,
      success: true,
      data: [],
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { userLoogout };
