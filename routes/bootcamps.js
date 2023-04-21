/**
 * This has all the routes for bootcamps
 */
const express = require('express');
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius
} = require('../controllers/bootcamps');

// Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

// Re-raute into other resource routers
router.use('/:bootcampId/courses', courseRouter);

// This makes a get request to getBootcampsInRadius
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

// This route makes get or post requests
router.route('/').get(getBootcamps).post(createBootcamp);

// This route makes get, put or delete requests
router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;
