import mongoose from "mongoose"
export const connectDB = async()=>{
    try{
  const conn=  await mongoose.connect(process.env.MONGODB_URI)
    console.log(`mongodb connected=${conn.connection.host}`)
        console.log(`Using DB: ${conn.connection.name}`);  // << Add this line

} catch (error){
console.log(error)
}
}