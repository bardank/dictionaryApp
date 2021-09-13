require('dotenv').config()
const express = require('express')
const app = express();
const connectDB = require('./server/configDB/dbconnect');
const PORT = process.env.PORT || 5000;
const path = require('path');
connectDB();
app.use(express.json({ extended: false }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/api/dictonary', require('./server/routes/dictonary'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "client", "build")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}
app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))