const express = require('express');
const app = express();
const __path = process.cwd(); // Added semicolon and fixed variable declaration
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
let code = require('./pair'); 

require('events').EventEmitter.defaultMaxListeners = 500;

// Middleware should be defined before routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/code', code);

app.get('/pair', (req, res) => { // Changed to app.get for better practice
    res.sendFile(__path + '/pair.html');
});

app.get('/', (req, res) => { // Changed to app.get for better practice
    res.sendFile(__path + '/main.html');
});

app.listen(PORT, () => {
    console.log(`
Don't Forget To Give Star ‼️

ᴘᴏᴡᴇʀᴅ ʙʏ ʀᴏᴏᴛ_x

Server running on http://localhost:` + PORT);
}); // Added missing semicolon

module.exports = app;
