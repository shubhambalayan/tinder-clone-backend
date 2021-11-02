const express = require('express');
const mongoose = require('mongoose');
const Cors = require('cors')
const Cards = require('./dbcards');

// App config
const app = express();
const PORT = process.env.PORT || 8001
const connection_URL = `mongodb+srv://admin:fEFQVJ1D3r0bj4BM@cluster0.kauxv.mongodb.net/tinderdb?retryWrites=true&w=majority`

// Middleware
app.use(express.json())
app.use(Cors())

// db-config
mongoose.connect(connection_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

// API endpoints
app.get("/", (req, res)=> res.status(200).send("Hello world"))

app.post('/tinder/cards', (req, res)=> {
    const dbcards = req.body;
    Cards.create(dbcards, (err, data)=>{
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards', (req, res)=> {
    Cards.find((err, data)=>{
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})

// Listner
app.listen(PORT, () => console.log(`App is running on localhost:${PORT}`))