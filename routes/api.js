const express = require('express');
const analytics = require('../lib/analytics');

const router = express.Router();

router.get('/messages', (req, res) => {
  analytics.test()
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
