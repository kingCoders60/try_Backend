const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4005;

app.use(express.json());

require("./config/database").connect();

const user = require("./routes/user");

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use("/api/v1",user);

app.listen(PORT,()=>{
    console.log(`App is listening at ${PORT}`);
})