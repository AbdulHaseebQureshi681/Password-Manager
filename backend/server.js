import express from "express";
import 'dotenv/config'
import mongoose from 'mongoose';
import Pass from "./models/Password.js";
import bodyParser from 'body-parser';
import cors from "cors";

const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/Passwords')
  .then(() => console.log('Connected!'));
app.get('/', async (req, res) => {
  const findresult = await Pass.find({});
  res.json(findresult);
});
app.post('/', async (req, res) => {
  const password = req.body;
  try {
    const result = await Pass.insertOne(password);
    res.json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
app.delete('/', async (req, res) => {
  const password = req.body;
  try {
    const result = await Pass.deleteOne(password);
    res.json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
