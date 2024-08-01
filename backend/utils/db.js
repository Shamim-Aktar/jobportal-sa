import mongoose from 'mongoose'
const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGOURI)
    console.log('db connected');
    }
    catch(error){
                console.log(error.message)
    }
    
}

export default connectDB