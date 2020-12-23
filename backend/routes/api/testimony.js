const express = require('express');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

const { requireAuth } = require('../../utils/auth');
const { Testimony, User } = require('../../db/models');

const router = express.Router();

/****************** FIND TESTIMONIES **************************/

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const searchId = req.params.id
    let testimony = await Testimony.findAll({
      where: {
        'userId': searchId
      },
    })
    return res.json({
      testimony
    });
  }),
);

/****************** ADD TESTIMONY **************************/

router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const { userId, commenterId, comment} = req.body;
    const testimony = Testimony.build({
      userId: userId,
      commenterId: commenterId,
      comment: comment,
    });
    console.log("THIS IS THE TESTIMONY", testimony)
    await testimony.save();
    return res.json({
      testimony
    });
}));

/****************** FIND TESTIMONY **************************/

/****************** UPDATE TESTIMONY **************************/
  
  router.patch('/', requireAuth, asyncHandler(async (req, res) => {
    const { primaryKey, comment} = req.body;
      let testimony = await Task.update({ comment: comment }, {
        where: {
          id: primaryKey
        }
      });
      return res.json({
        testimony
      });
  }));

  /****************** REMOVE TESTIMONY **************************/

  router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const primaryKey = req.params.id
      await Testimony.destroy({
        where: { "id": primaryKey }
      })
      return res.json({
        message: "sucessfully deleted"
      });
  }));

module.exports = router;