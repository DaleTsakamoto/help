const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const NodeGeocoder = require('node-geocoder');

const { User } = require('../../db/models');
const distance = require ('../utils/mathEquations')

const router = express.Router();



/****************** GEOCODER ************************/

async function geocodeAddress (address) {
  const options = {
    provider: 'google',
    apiKey: process.env.GOOGLE_API,
    formatter: null
  };
  
  const geocoder = NodeGeocoder(options);
  
  const result = await geocoder.geocode(address);
  console.log(result[0].latitude)

}

/****************** GET PEOPLE ************************/

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { lat, lng } = req.body;
    console.log("IM WORKING!!!!!!!!!!!!!!!!!!!!!", lat, lng);
  
    users = await User.findAll({
      where: {
        username: {
          [Sequelize.Op.iLike]: '%'+keywordSearch+'%'
        },
      }
    })


    // return res.json({
    //   user,
    // });
  }),
);

module.exports = router;