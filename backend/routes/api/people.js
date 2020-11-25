const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const NodeGeocoder = require('node-geocoder');

const { User, Sequelize } = require('../../db/models');
const { distance, quickSort } = require ('../utils/mathEquations')

const router = express.Router();

const Op = Sequelize.Op;

/****************** GET PEOPLE ************************/

router.post(
  '/',
  asyncHandler(async (req, res) => {
    let { lat, lng } = req.body;
    lat = parseFloat(lat)
    lng = parseFloat(lng)
  
    let users = await User.findAll({
      where: {
        lat: {
          [Op.between]: [(lat - .5), (lat + .5)]
        },
        lng: {
          [Op.between]: [(lng - .5), (lng + .5)]
        },
      }
    })
    let usersArr = [];

    users.forEach((user) => {
      let peopleDistance = distance(user, lat, lng, user.dataValues.lat, user.dataValues.lng)
      if (peopleDistance > 20) return;
      else (usersArr.push({user: peopleDistance}))
    });

    console.log(usersArr)

    if (usersArr.length === 0) users = ["No one in your area"]
    let finalArr = quickSort(usersArr)
    users = finalArr;
    
    console.log(finalArr)

    return res.json({
      users,
    });
  }),
);

module.exports = router;