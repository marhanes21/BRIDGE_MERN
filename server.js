const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

// BodyParser Middleware
app.use(express.json());

//DB URI
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Mongo DB connect'))
    .catch(err => console.log(err));

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Use Routes
app.use('/api/items',  require('./routes/api/items'));
app.use('/api/users',  require('./routes/api/users'));

const port = process.env.PORT || 5000;

app.listen(port, ()=> {console.log('Server started')});


