var express = require('express');
var router = express.Router();

// http://localhost:3000/zhicheng?q=%E5%A4%A9%E6%B4%A5%E5%B8%82%E8%BF%915%E5%B9%B4%E7%9A%84GDP%E6%95%B0%E6%8D%AE
router.get('/', async function (req, res, next) {
  const file = await import('../langchain/zhicheng/index.mjs')
  const { query } = file
  const { q } = req.query

  const result = await query(q)

  res.send(result);
});

module.exports = router;
