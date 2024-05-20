import express from 'express';
import ReservationController from '../controllers/ReservationController';

const router = express.Router();

router.get('/', ReservationController.getAllReservations);
router.get('/:id', ReservationController.getReservationById);
router.post('/', ReservationController.createReservation);
router.put('/:id', ReservationController.updateReservationById);
router.delete('/:id', ReservationController.deleteReservationById);

export default router;