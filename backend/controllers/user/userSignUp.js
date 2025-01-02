import bcrypt from "bcryptjs"
import userModel from "../../models/userModel.js"
import jwt from "jsonwebtoken"
const userSignup = async (req, res) => {

    try {
        const {name, email, password,password2} = req.body
        
        
        if(!email){
            throw new Error("Entrer un email valide")
        }
        if(!password){
            throw new Error("Entrer un mot de passe valide")
        }
        if(!password2){
            throw new Error("Confirmer votre mot de passe")
        }
        if(!name){
            throw new Error("Entrer un nom valide")
        }
        const exitsEmail = await userModel.findOne({email})
        if(exitsEmail){
            throw new Error("Email existe déjà")

        }

        if(password !== password2){
            throw new Error("Mot de passe non identique")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword =  bcrypt.hashSync(password, salt);
        if(!hashPassword){
            throw new Error("Une erreur s'est produite")

        }
       
        const payload = {
            ...req.body,
            role:'GENERAL',
            password:hashPassword
        }
        const userData = new userModel(payload)
        const saveUser =  await userData.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });

        // res.status(201).json({
        //     data:saveUser,
        //     success:true,
        //     message:"Utilisateur a bien été crée"
        // })
      
        
    } catch (error) {
        res.json({
            message:error.message || error,
            error:true,
            success:false,
        })
    }
}







export {userSignup}