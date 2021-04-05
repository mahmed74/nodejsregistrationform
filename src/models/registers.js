const mongoose =  require("mongoose");
const bcrypt = require("bcrypt");

const RegistrationSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    }
    ,
    email:{
        type:String,
        required:true,
        unique:true,

    },
    gender:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    }
})

RegistrationSchema.pre("save" ,async function(next){
    if(this.isModified("password")){
        console.log(`the current password : ${this.password}`);
        this.password  = await bcrypt.hash(this.password , 10);
        console.log(`the current password : ${this.password}`);
        this.confirmpassword = undefined;
    }
    next();      
});

// creating a collection

const Registration = new mongoose.model("Registration" , RegistrationSchema); 

module.exports = Registration;