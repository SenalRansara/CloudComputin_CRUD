const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require ("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

const PORT = process.env.PORT || 8080;
const URL = process.env.MONGODB_URL;

//Book management - Senal
const Book = require("./controller/BookController");
app.use("/api", Book);

const loginRouter = require("./controller/Login.js");
app.use("/login", loginRouter);



mongoose.connect(URL).then(()=> {
    console.log('DB Connected Successfully');
})
.catch((err) => console.log('DB Connection Error',err));

app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`);
});
