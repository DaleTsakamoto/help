const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const NodeGeocoder = require('node-geocoder');

const { User, Sequelize, Task } = require('../../db/models');

const Op = Sequelize.Op


/****************** GEOCODER ************************/

async function geocodeAddress (address) {
  const options = {
    provider: 'google',
    apiKey: process.env.GOOGLE_API,
    formatter: null
  };
  
  const geocoder = NodeGeocoder(options);
  
  const result = await geocoder.geocode(address);
  const point = { lat: result[0].latitude, lng: result[0].longitude }
  return point;
}

/****************** SEARCH DATABASE **************************/

router.post(
  '/',
  asyncHandler(async (req, res, next) => {

    const { keywordSearch, locationSearch } = req.body;

    let locals;

    if (locationSearch) {
      let { lat, lng } = await geocodeAddress(locationSearch)
      lat = parseFloat(lat, 10)
      lng = parseFloat(lng, 10)
      locals = await User.findAll({
        where: {
          lat: {
            [Op.between]: [(lat - .5), (lat + .5)]
          },
          lng: {
            [Op.between]: [(lng - .5), (lng + .5)]
          },
          [Op.or]: [{
            username: {
              [Op.iLike]: '%' + keywordSearch + '%'
            }
          }, {
            firstName: {
              [Op.iLike]: '%' + keywordSearch + '%'
            }
          }, {
            lastName: {
              [Op.iLike]: '%' + keywordSearch + '%'
            }
          }]
        },
      })
    } else {
      locals = await User.findAll({
        where: {
          [Op.or]: [{username: {
            [Op.iLike]: '%'+keywordSearch+'%'
          }}, {firstName: {
            [Op.iLike]: '%'+keywordSearch+'%'
          }}, {lastName: {
            [Op.iLike]: '%'+keywordSearch+'%'
          }}]
        }
      })
    }

    if (locals.length === 0) {
      let err = 'No results found'
      return res.json({
        err,
      });
    }

    return res.json({
      locals,
      apiKey: process.env.GOOGLE_API,
    });

  }),
);

module.exports = router;