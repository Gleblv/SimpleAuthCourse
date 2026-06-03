const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/auth', authRouter);

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://leus:kPYymKlWrIAC25hL@cluster0.i7kfehn.mongodb.net/?appName=Cluster0');

        app.listen(PORT, () => console.log('Server start'));
    } catch (err) {
        console.log(err);
    }
}

start();