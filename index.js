import dotenv from 'dotenv';
import express from "express";

dotenv.config();
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', (req, res) => {
  res.send("<h1>Login at Backend.</h1>")
})

app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})