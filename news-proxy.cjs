const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/news', async (req, res) => {
  try {
    const today = new Date();
    const to = today.toISOString().split('T')[0];
    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - 7); // 7 days ago
    const from = fromDate.toISOString().split('T')[0];

    const url = `https://newsapi.org/v2/everything?q=artificial+intelligence&from=${from}&to=${to}&sortBy=popularity&apiKey=0eb559ebfe404cf4825049ab74671134`;

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
