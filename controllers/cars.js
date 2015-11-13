var express    = require('express'),
    router     = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var Car = require("../models/car");

router.get("/cars", function(req, res){
  Car.find({}, function (err, cars) { // cars = [{obj},{obj}]
    res.render('cars/index', { cars: cars });
  });
})

router.post("/cars", function(req, res){
  Car.create(req.body.car, function (err, car) {
    if (err){
      res.send("something wrong happened"+ err)
    } else {
      res.redirect('/cars');
    }
  });
})

router.delete("/cars/:id", function(req, res){
  Car.findById(req.params.id, function(err, car){
    if (!car || err) { res.send(err) }

    car.remove(function(err){
      if (err) { res.send(err) }

      res.json(car);
    })
  })
})


module.exports = router;

