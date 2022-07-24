var express = require("express");
var router = express.Router();
const connect = require("./db_pool_connect");
var bodyParser = require("body-parser");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("crear", { title: "Express" });
});

router.post("/", function (req, res, next) {
  var pet_name = req.body.pet_name;
  var pet_age = req.body.pet_age;
  var pet_type = req.body.pet_type;
  var description = req.body.description;
  var breed = req.body.breed;
  var toy = req.body.toy;
  var color = req.body.color;
  connect(function (err, client, done) {
    if (err) {
      return console.error("error fetching client from pool", err);
    }
    client.query(
      `INSERT INTO type_(dtype, breed, type_description) VALUES ('${req.body.pet_type}', '${req.body.breed}', '${req.body.description}');`
    );
    client.query(
      `INSERT INTO pet(pet_name, age, typeid) VALUES ('${req.body.pet_name}', '${req.body.pet_age}',
        (SELECT type_id FROM type_ ORDER BY type_id DESC LIMIT 1));`
    );
    client.query(`INSERT INTO toy(toy_name, color, pet_id) VALUES('${req.body.toy}', '${req.body.color}',
      (SELECT pid FROM pet ORDER BY pid DESC LIMIT 1))`);
  });
});

module.exports = router;
