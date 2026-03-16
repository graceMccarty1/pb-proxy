const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const PB_TOKEN = process.env.PB_TOKEN;
const PB_BASE = "https://api.productboard.com";

app.get("/pb/*", async (req, res) => {
  const path = req.params[0];
  try {
    const response = await fetch(`${PB_BASE}/${path}`, {
      headers: {
        "Authorization": `Bearer ${PB_TOKEN}`,
        "X-Version": "1"
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000);
