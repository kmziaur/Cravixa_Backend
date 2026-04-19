import mongoose from "mongoose";


export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://kmziaur:1418856504@cluster0.bulghf7.mongodb.net/Cravixa').then(()=>console.log('DB Connected'));
}