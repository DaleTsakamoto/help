const express = require('express');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

const { requireAuth } = require('../../utils/auth');
const { Testimony } = require('../../db/models');

const router = express.Router();

/****************** FIND TESTIMONIES **************************/

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const searchId = req.params.id
    let testimony = await Task.findAll({
      where: {
        'userId': searchId
      }
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

    const validateErrors = validationResult(req);
    if (validateErrors.isEmpty()) {
      await testimony.save();
      res.status(204)
      return res.json({
        testimony
      });
    } else {
      const errors = validateErrors.array().map(error => error.msg);
      return res.json({
        errors
      });
    }
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
        where: { id: primaryKey }
      })
      return res.json({
        message: "sucessfully deleted"
      });
  }));

module.exports = router;