const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./control/SessionController');
const SpotController = require('./control/SpotController');
const DashBoardController = require('./control/DashboardController');
const BookingController = require('./control/BookingController');
const ApprovalController = require('./control/ApprovalController');
const RejectionController = require('./control/RejectionController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);

routes.post('/spots',upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashBoardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = routes;