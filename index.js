const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("../shoplotAPI/routes/user");
const authRoute = require("../shoplotAPI/routes/auth");


dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO_URL).then(()=>
    console.log("DB Connection Successful!")
).catch((err)=>{
    console.log(err);
});

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);


app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend is starting");
})