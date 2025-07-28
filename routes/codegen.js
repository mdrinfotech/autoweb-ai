const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Generate HTML, CSS and JS for: ${prompt}` }],
      temperature: 0.6,
      max_tokens: 2000
    });

    res.json({ code: completion.choices[0].message.content });
  } catch (err) {
  console.error("OpenAI Error:", err?.response?.data || err.message || err);
  res.status(500).json({ error: "AI code generation failed" });
}


module.exports = router;
