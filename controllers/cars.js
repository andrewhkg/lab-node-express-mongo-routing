var express    = require('express'),
    router     = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var Car = require("../models/car");

//INDEX
router.get("/cars", function(req, res){
  Car.find({}, function (err, cars) { // cars = [{obj},{obj}]
    res.render('cars/index', { cars: cars });
  });
})

//CREATE
router.post("/cars", function(req, res){
  Car.create(req.body.car, function (err, car) {
    if (err){
      res.send("something wrong happened"+ err)
    } else {
      res.redirect('/cars');
    }
  });
})

//DELETE
router.delete("/cars/:id", function(req, res){
  Car.findByIdAndRemove(req.params.id, function(err, car){
    if (!car || err) { res.send(err) }
    res.redirect('/cars');
  })
})

//EDIT => renders a form to UPDATE
router.get("/cars/:id/edit", function(req, res){
  Car.findById(req.params.id, function (err, car) {
    console.log(car);
    res.render('cars/edit', { car: car });
  });
});

//UPDATE
router.put("/cars/:id", function(req, res){
  Car.findByIdAndUpdate(req.params.id, req.body.car ,function(err, car){
    if (!car || err) { res.send(err) }
    res.redirect('/cars');
  })
})

module.exports = router;

