import userModel from "../../models/userModel.js";

const userDteails = async(req, res)=>{
    try {
        const user = await userModel.findById(req.userId)

       res.status(200).json({
        data:user,
        error:false,
        success:true,
        message:"Détails utilisateur"
       })
    } catch (error) {
    res.status(400).json({
        message:error.message || error,
        error:true,
        success: false,
    })
        
    }

}


export { userDteails };