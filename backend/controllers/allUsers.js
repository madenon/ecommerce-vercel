

const allUsers = async(req, res)=>{

try {
console.log('userId', req.userId)

    
} catch (error) {
    res.status(400).json({
        message:error.message || error,
        success: false,
        error:true
    })
        
    }

}


export { allUsers };