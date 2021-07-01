const validateCardsInput = require("../../../validations/cardsReminder/cards");
//Load User Model
const Cards = require("../../../models/Cards");
const asyncHandler = require("../../../middlewares/async");
const ErrorResponse = require("../../utils/errorResponse");

exports.createCards = asyncHandler(async (req, res) => {
  console.log("req.body", req.body);
  const { errors, isValid } = validateCardsInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {

    const card = await Cards.find({name:req.body.name});
    console.log(' req.params.cardId', card);
    if (!card) {
      return next(
        new ErrorResponse(
          `Card already exist ${req.body.name}`,
          404
        )
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
    return next(
      new ErrorResponse(`cards failed to fetch`, 404)
    );
  }
  res.status(200).json({ success: true, data: cards });
});