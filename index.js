const express = require("express")
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')
const mongoose = require("mongoose")
const app = express();
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, ()=>{
    console.log("Database connection initiated")
})

//middlwares
app.use(express.json());

//routes middlewares
app.use('/api/user', authRoutes)
app.use('/api/posts', postRoutes)

//Route does not exist
app.use((req, res) => {
    res.status(404).json({ status: false, message: 'Route does not exist' })
})

//listen to request from port
app.listen(process.env.port || 3000, () => {
    console.log('listening for requests on port 3000')
})