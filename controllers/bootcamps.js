const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');

/**
 * @description Get all bootcamps
 * @route GET /api/v1/bootcamps
 * @access Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});

/**
 * @description Get single bootcamp
 * @route GET /api/v1/bootcamps/:id 
 * @access Public
 */
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) { //This to handle correctly formatted id but not in db, ErrorResponse is util
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: bootcamp });
});

/**
 * @description Create new bootcamp
 * @route POST /api/v1/bootcamps
 * @access Private
 */
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp
  })
});

/**
 * @description Update bootcamp
 * @route PUT /api/v1/bootcamps/:id
 * @access Private
 */
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!bootcamp) { //This to handle correctly formatted id but not in db
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: bootcamp });
});

/**
 * @description Delete bootcamp
 * @route DELETE /api/v1/bootcamps/:id
 * @access Private
 */
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) { //This to handle correctly formatted id but not in db
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: {} });
});
