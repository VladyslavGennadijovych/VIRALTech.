import express from 'express';
import TripController from '../controllers/TripController';

const router = express.Router();

router.get('/', TripController.getAllTrips);
router.get('/:id', TripController.getTripById);
router.post('/', TripController.createTrip);
router.put('/:id', TripController.updateTripById);
router.delete('/:id', TripController.deleteTripById);

export default router;