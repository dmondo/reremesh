const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    id: 1,
    value: 'test',
  });
});

module.exports = router;
