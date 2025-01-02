const userLoogout = async (req, res) => {
  try {
    const tokenOption = {
      httpOnly:true,
      secure:process.env.NODE_ENV ==='production',
      sameSite:process.env.NODE_ENV==='production'?'none':'strict',
      maxAge:7 * 24 * 160 * 60 * 1000
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
