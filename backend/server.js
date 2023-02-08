const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URL; 
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
});

const batterProducts = require('./routes/batter-products');
const myProducts = require('./routes/my-products');
const usersRouter = require('./routes/users');

app.use('/barterproducts',batterProducts);
app.use('/myproducts',myProducts);
app.use('/users',usersRouter);

app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
});