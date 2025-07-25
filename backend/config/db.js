const mongoose = require('mongoose')

const connectDB =async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
    }catch(error){
        console.log(error);
        throw new Error('Database connection failed');
    }
}

module.exports=connectDB