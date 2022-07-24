var express = require("express");
var bodyParser = require("body-parser");

var router = express.Router();

const connect = require("./db_pool_connect");

/**
 * Listar todas las mascotas, su tipo y su juguete.
 */
router.get("/", function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error("error fetching client from pool", err);
    }

    //use the client for executing the query
    client.query(
      "SELECT * FROM type_ AS t JOIN pet AS pe ON t.type_id= pe.typeid JOIN toy AS toys ON toys.pet_id=pe.pid;",
      function (err, result) {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);

        if (err) {
          return console.error("error running query", err);
        }
        res.send(JSON.stringify(result.rows));
      }
    );
  });
});

/**
 * Buscar un usuario dado su id_usuario
 */
router.get("/:id", function (req, res, next) {
  connect(function (err, client, done) {
    if (err) {
      return console.error("error fetching client from pool", err);
    }

    //use the client for executing the query
    client.query(
      `SELECT * FROM type_ AS t JOIN pet AS pe ON t.type_id= pe.typeid JOIN toy AS toys ON toys.pet_id=pe.pid
      WHERE type_id=${req.params.id};`,
      function (err, result) {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);

        if (err) {
          return console.error("error running query", err);
        }
        res.send(JSON.stringify(result.rows[0]));
      }
    );
  });
});

module.exports = router;
