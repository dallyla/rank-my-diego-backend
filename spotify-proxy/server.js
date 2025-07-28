// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PORT = process.env.PORT;


// Gerar token via client_credentials
app.get('/spotify-token', async (req, res) => {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    res.json(response.data); // { access_token, token_type, expires_in }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter token', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy Spotify rodando em http://localhost:${PORT}`);
});
