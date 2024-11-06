const userLoogout = async (req, res) => {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite:'None',
    };

  

    res.clearCookie("token", tokenOption);

    res.json({
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
