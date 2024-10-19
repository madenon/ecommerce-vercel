import jwt from "jsonwebtoken";

const authToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token 
   
    if(!token){
        return res.status(200).json({
            message:"Vous n'êtes pas connecté ",
            error:true,
            success:false
        })
    }
    jwt.verify(token, process.env.TOEKN_SECRET_KEY, function (err, decocde) {
      if(err){
        console.log(err);
        console.log("erreur d'authenfication: ", err)
    }

    req.userId = decocde?._id
    next()
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      data: [],
      error: true,
      success: false,
    });
  }
};

export { authToken };
