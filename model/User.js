import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    _id:{ type:string, require:true },
    name:{ type:string, require:true },
    email:{ type:string, require:true, unique:true },
    imageUrl:{ type:string, require:true },
    cartItems:{ type:Object, default:{} },
},{minimize:false})



const User = mongoose.models.user || mongoose.model('user',userSchema)


export default User;