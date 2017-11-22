const express = require('express');
const analytics = require('../lib/analytics');

const router = express.Router();

router.get('/messages', (req, res) => {
  analytics.test()
    .then(data => res.send(data));
});

module.exports = router;
