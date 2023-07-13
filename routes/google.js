var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
  const file = await import('../langchain/google/index.mjs')
  const { googleSearch } = file
  const { q } = req.query

  const result = await googleSearch(q)

  res.send(result);
});

module.exports = router;
