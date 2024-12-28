import mongoose from "mongoose";

const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add user name"]
    },
    email:{
        type:String,
        required:[true,"Please add user name"],
        unique:[true,"Email address already taken"]
        
    },
    password:{
        type:String,
        required:[true,"Please add user password"],
        unique:[true,"Email address already taken"]
    }
},{
    timestamps:true,
})


const User=mongoose.model("User",userSchema)
export default User;