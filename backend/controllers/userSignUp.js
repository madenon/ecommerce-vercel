import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"

const userSignup = async (req, res) => {

    try {
        const {name, email, password,password2 } = req.body
        if(!email){
            throw new Error("Entrer un email valide")
        }
        if(!password){
            throw new Error("Entrer  un mot de passe valide")
        }
        if(!password2){
            throw new Error("Confirmer votre mot de passe")
        }
        if(!name){
            throw new Error("Entrer un nom valide")
        }
        const exitsEmail = await  userModel.findOne({email})
        if(exitsEmail){
            throw new Error("Email existe déjà")

        }

        if(password !== password2){
            throw new Error("Mot de passe non identique")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);
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

        res.status(201).json({
            data:saveUser,
            success:true,
            message:"Utilisateur a bien  été crée"
        })
      
        
    } catch (error) {
        res.json({
            message:error.message || error,
            error:true,
            success:false,
        })
    }
}







export {userSignup}