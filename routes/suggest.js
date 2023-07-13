var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
  const file = await import('../langchain/suggest/index.mjs')
  const { query } = file
  const { q } = req.query

  const result = await query(q)

  res.send(result);
});

module.exports = router;
