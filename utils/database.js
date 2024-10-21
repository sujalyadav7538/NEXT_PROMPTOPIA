/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
let isConnected =false;

const ConnectToDb=async()=>{
    mongoose.set('strictQuery',true);
    if(isConnected) {console.log('Database Connected'); return;}
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            dbName:'Share-prompt',
           
        })
        isConnected=true;
        console.log('Database Connected')
    } catch (error) {
        console.log(error)
    }
}

export default ConnectToDb;