const express = require('express');
const asyncHandler = require('express-async-handler');

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
      order: [
        ['createdAt', 'ASC'],
    ],
    })

    let commenters = [];
    for (let i = 0; i < testimony.length; i++) {
      console.log(parseInt(testimony[i].commenterId))
      let person = await User.findByPk(testimony[i].commenterId)
      commenters.push(person.firstName)
    }

    console.log(commenters)
    return res.json({
      testimony,
      commenters
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
    const { primaryKey, comment } = req.body;
    console.log("HERE IS THE EDIT INFO", primaryKey, comment)
      let succeededUpdate = await Testimony.update({ comment: comment }, {
        where: {
          id: primaryKey
        }
      });
    let upTestimony = await Testimony.findByPk(primaryKey)
    const id = upTestimony.id
    const upComment = upTestimony.comment
    return res.json({
      id,
      upComment
      });
  }));

  /****************** REMOVE TESTIMONY **************************/

  router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const primaryKey = req.params.id
      await Testimony.destroy({
        where: { "id": primaryKey }
      })
      console.log(primaryKey)
      return res.json({
        primaryKey
      });
  }));

module.exports = router;