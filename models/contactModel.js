import mongoose from 'mongoose'

const contactSchema= mongoose.Schema({
    
   user_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
   }, 
    name:{
        type:String,
        required:[true,"Please add contact name"]
    },
    email: {
        type:String,
        required:[true,"Please add email address"]
    },
    phone: {
        type:String,
        required:[true,"Please add phone no."]
    },

},{
    timeStamps:true
})

const Contact = mongoose.model("contact",contactSchema)

export default Contact