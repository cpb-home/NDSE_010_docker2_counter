const express = require('express');
const redis = require('redis');
const app = express();

const PORT = process.env.PORT || 3001;

const REDIS_URL = process.env.REDIS_URL || "redis://localhost";
const client = redis.createClient({ url: REDIS_URL });

(async () => {
  await client.connect();
})()


app.get('/counter/:bookId', async (req, res) => {
  const { bookId } = req.params;

  try {
    const cnt = await client.get(bookId);
    res.json({cnt});
  } catch (e) {
    res.json({errCode: 500, errMsg: `Ошибка redis: ${e}`});
  }
})


app.post('/counter/:bookId/incr', async (req, res) => {
  const { bookId } = req.params;

  //res.json({message: `Returned id ${bookId}`});

  try {
    const cnt = await client.incr(bookId);
    res.json({cnt});
  } catch (e) {
    res.json({errCode: 500, errMsg: `Ошибка redis: ${e}`});
  }
})


app.listen(PORT, () => {
  console.log(`Counter app started at port ${PORT}`);
})