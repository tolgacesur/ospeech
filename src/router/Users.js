var express = require('express');
var router = express.Router()

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

  router.get('/', function (req, res) {
    let id = "id12312";
    var body = {"id":id};
    var myJSON = JSON.stringify(body);
    res.json(myJSON);
})

module.exports = router;
