import express from 'express';
const cors = require('cors');
const app = express();

// 1. Middleware (MUST come first)
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// 2. Root endpoint
app.get('/', (req, res) => {
  res.send(`
    <h1>Decision App Backend</h1>
    <p>Try these working endpoints:</p>
    <ul>
      <li><a href="/api">/api</a> - API status</li>
      <li><a href="/api/decide/eat">/api/decide/eat</a> - Food suggestion</li>
      <li><a href="/api/decide/do">/api/decide/do</a> - Activity suggestion</li>
      <li><a href="/api/decide/wear">/api/decide/wear</a> - Outfit suggestion</li>
    </ul>
  `);
});

// 3. API endpoints
const choices = {
  eat: ['Pizza', 'Sushi', 'Burger'],
  do: ['Read', 'Hike', 'Watch Movie'],
  wear: ['Jeans', 'Sweater', 'Jacket']
};

app.get('/api', (req, res) => {
  res.json({ status: 'API working', endpoints: Object.keys(choices) });
});

app.get('/api/decide/:category', (req, res) => {
  const options = choices[req.params.category];
  if (!options) return res.status(400).json({ error: 'Try /eat, /do, or /wear' });
  res.json({ result: options[Math.floor(Math.random() * options.length)] });
});

// 4. Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`
  🚀 Backend fully working at http://localhost:${PORT}
  Test these in your browser:
  - http://localhost:5000 (root)
  - http://localhost:5000/api (API status)
  - http://localhost:5000/api/decide/eat (example endpoint)
  `);
});
