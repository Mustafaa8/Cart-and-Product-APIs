import mongoose from "mongoose";

const dbConnection = async ()=>{
    mongoose.connect(<string>process.env.CONN_URL)
                            .then(()=>console.log("Database connected"))
                            .catch((err)=>{
                                console.log(err)
                            })
}

export default dbConnection