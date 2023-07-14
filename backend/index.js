import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limig: "50mb" }));

app.get('/', (_req, res) => {
  res.status(200).json({ message: "Hello from Ritul Singh" })
})

app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;

    const options = {
      method: 'POST',
      url: process.env.API_URL,
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': process.env.API_HOST
      },
      data: {
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json'
      }
    };
    const response = await axios.request(options);
    console.log(response.data);
    const image = response.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
  }
})

app.listen(8080, () => console.log('Server has started on port 8080'))