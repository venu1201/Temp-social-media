import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{type:String ,require:true},
    email:{type:String ,require:true},
    password:{type:String ,require:true},
    id:{type:String},
    firstname:{type:String},
    lastname:{type:String},
    bio:{type:String},
    followers:[],
    following:[],
    profilepicture:String,
    pending:[],
    private: { type: Boolean, default: false } 
    

})
export default mongoose.model("User",userSchema);
