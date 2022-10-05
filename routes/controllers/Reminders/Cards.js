const validateCardsInput = require('../../../validations/cardsReminder/cards');
const mongoose = require('mongoose');
const Cards = require('../../../models/Cards');
const asyncHandler = require('../../../middlewares/async');
const ErrorResponse = require('../../utils/errorResponse');
const Dynamic = require('../../../models/Dynamic');

exports.createCards = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateCardsInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const card = await Cards.find({ name: req.body.name });
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
        updatedAt: new Date(),
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

/*
 * @route : POST /api/reminders/dynamiCards
 * @desc : POST Single bootcamp
 * @access : PRIVATE
 */
exports.dynamiCards = asyncHandler(async (req, res, next) => {
  const year = req.body.year;
  const month = req.body.month;
  const isItemExist = await Dynamic.find({ year, month }).lean();
  if (isItemExist && isItemExist.length > 0) {
    res
      .status(401)
      .json({ success: false, data: 'Year and Month Already Exist' });
  } else {
    const dynamicCard = await Dynamic.create(req.body);
    res.status(200).json({ success: true, data: dynamicCard });
  }
});

/*
 * @route : PUT /api/reminders/dynamiCards
 * @desc : PUT Single bootcamp
 * @access : PRIVATE
 */
exports.updateDynamicCards = asyncHandler(async (req, res, next) => {
  const year = req.params.year;
  const month = req.params.month;
  const dynamicCard = await Dynamic.find({ year, month }).lean();

  if (dynamicCard && dynamicCard.length > 0) {
    const cards = Object.assign([], dynamicCard[0].cards);

    const cardIndex = cards.findIndex((c) => c.name === req.body.name);

    if (cardIndex !== -1) {
      cards[cardIndex] = req.body;
    } else {
      cards.push(req.body);
    }

    const statusUpdated = await Dynamic.updateOne(
      { year, month },
      {
        $set: { cards: cards },
      }
    );

    console.log('statusUpdated', statusUpdated);

    res.status(200).json({ success: true, data: statusUpdated });
  } else {
    res.status(404).json({ success: false, data: 'Failed to update' });
  }
});

/*
 * @route : GET /api/reminders/dynamiCards
 * @desc : GET Single bootcamp
 * @access : PUBLIC
 */
exports.getDynamiCards = asyncHandler(async (req, res, next) => {
  const year = req.params.year;
  const month = req.params.month;
  const dynamicCard = await Dynamic.find({ year, month }).lean();
  if (dynamicCard && dynamicCard.length > 0) {
    const cards = dynamicCard[0].cards;
    res.status(200).json({ success: true, data: cards });
  } else {
    res.status(404).json({ success: true, data: 'Details not Found' });
  }
});
