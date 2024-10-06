import express from "express"
import cors from "cors"
import "dotenv/config"
import {connectDB} from "./config/db.js"


const app = express()

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log('connexion a la base de donnée')
        console.log(`Server bien demarré au port:  http://localhost:${PORT}`)
    })
})
app.use(express.json())
app.use(cors())

const PORT = 8000 || process.env.PORT

