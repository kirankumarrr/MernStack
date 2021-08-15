const validateCardsInput = require('../../../validations/cardsReminder/cards');
const mongoose = require('mongoose');
const Cards = require('../../../models/Cards');
const asyncHandler = require('../../../middlewares/async');
const ErrorResponse = require('../../utils/errorResponse');

exports.createCards = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateCardsInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const card = await Cards.find({ name: req.body.name });
    console.log('card :', card);
    if (card.length > 0) {
      return next(
        new ErrorResponse(`Card already exist ${req.body.name}`, 404)
      );
    }

    const createdCard = await Cards.create(req.body);

    res.status(200).json({
      success: true,
      data: createdCard,
    });
  }
});

/*
 * @route : GET /api/reminders/cards
 * @desc : Get Single bootcamp
 * @access : PUBLIC
 */
exports.fetchCards = asyncHandler(async (req, res, next) => {
  const cards = await Cards.find();
  if (!cards) {
    return next(new ErrorResponse(`cards failed to fetch`, 404));
  }
  res.status(200).json({ success: true, data: cards });
});

/*
 * @route : PUT /api/v1/bootcamps/:id
 * @desc : Update bootcamp
 * @access : Private
 */
exports.updateCards = asyncHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(
      new ErrorResponse(`Invalid MongoDb id : ${req.params.id}`, 404)
    );
  }

  const cards = await Cards.findById(req.params.id);
  if (!cards) {
    return next(
      new ErrorResponse(`Card not found with id of ${req.params.id}`, 404)
    );
  }

  const { errors, isValid } = validateCardsInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const updatedCard = await Cards.findOneAndUpdate(
      { _id: req.params.id },
      {
        amount: req.body.amount,
        avaiable: req.body.avaiable,
        date: req.body.date,
      },
      { new: true }
    );
    if (!updatedCard) {
      return next(
        new ErrorResponse(
          `Card failed to update with id of ${req.params.id}`,
          400
        )
      );
    }
    res.status(200).json({ success: true, data: updatedCard });
  }
});
