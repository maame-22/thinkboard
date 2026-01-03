import mongoose from 'mongoose'

export const connectDB = async()=>{

    try{
    await mongoose.connect(process.env.MONGO_URI)

    console.log("mongodb connected successfully")
    }catch(e){
        console.error("Error connecting to mongodb"+ e)
        process.exit(1)

    }

}