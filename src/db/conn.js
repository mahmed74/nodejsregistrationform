const mongoose =  require("mongoose");

mongoose.connect("mongodb://localhost:27017/employeeRegistration" ,{
    useCreateIndex:true,
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology: true
    
}).then(()=>{
    console.log("connection to db success");
}).catch((err)=>{
    console.log("Connection to db failed due to ",err);
})