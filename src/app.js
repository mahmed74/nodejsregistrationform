const express =  require("express");
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcrypt");

const app =  express();
require("./db/conn");
const Registration = require("./models/registers");

const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname , "../public");
const templatescPath = path.join(__dirname , "../templates/views");
const partialsPath = path.join(__dirname , "../templates/partials");
app.use(express.static(staticPath));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine", "hbs");
app.set("views",templatescPath);
hbs.registerPartials(partialsPath);


app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/signup", (req,res)=>{
    res.render("signup");
});

app.get("/login",(req,res)=>{
    res.render("login");
});


// creating a new user in database

app.post("/signup", async(req,res)=>{
    try {

        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerEmployee = new Registration({
                firstname:req.body.fname,
                lastname:req.body.lname,
                email:req.body.email,
                gender:req.body.gender,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword,
            });


            const Registered = await registerEmployee.save();
            res.status(201).render("index");

        }else{
            res.send("Passwords are not matching")
        }


    } catch (error) {
        res.status(400).send(error);
    }
});

//login post request

app.post("/login",async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Registration.findOne({email:email});

        const isMatch = await bcrypt.compare(password , useremail.password);
        
        if(isMatch){
            res.render("index");
        }
        else{
            res.send("Invalid Email or Password!");
        }



    } catch (error) {
        res.status(400).send("Invalid Email or Password");
    }
});

app.listen(port , ()=>{
    console.log("listening to http://localhost:3000");
});