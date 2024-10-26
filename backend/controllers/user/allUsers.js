import userModel from "../../models/userModel.js";


const allUsers = async(req, res)=>{

try {

    const allUsers = await userModel.find()
    res.json({
    message:'Touts les utilisateurs',
     data:allUsers,
     success:true,
     error:false

})

    
} catch (error) {
    res.status(400).json({
        message:error.message || error,
        success: false,
        error:true
    })
        
    }

}


export { allUsers };