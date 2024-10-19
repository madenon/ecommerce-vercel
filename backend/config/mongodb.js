// import mongoose from "mongoose";

//    export  async function connectDB() {
// try {
//      await  mongoose.connect(process.env.MONGO_URI)
//      console.log('ok')
// } catch (error) {
//     console.log(error)
// }
//  }

import mongoose from "mongoose";

 const  connectDB = async()=>{
     mongoose.connection.on('connected', ()=>{
        console.log("DB connecté")
     })
      await mongoose.connect(`${process.env.MONGO_URI}/boutique`)
}

export default connectDB

