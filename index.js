import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import events from 'events';

// Import the 'pair' module
import code from './pair.js';

const app = express();

// Resolve the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;

// Increase event emitter limit
events.EventEmitter.defaultMaxListeners = 500;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public'))); // Move pair.html & home.html inside a "public" folder

// Routes
app.use('/code', code);
app.get('/pair', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pair.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Instagram: @abby kiddy\nGitHub: @Tohidkhan6332\nServer running on http://localhost:${PORT}`);
});

export default app;
