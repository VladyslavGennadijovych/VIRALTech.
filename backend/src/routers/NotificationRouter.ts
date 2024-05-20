import express from 'express';
import NotificationController from '../controllers/NotificationController';

const router = express.Router();

router.get('/', NotificationController.getAllNotifications);
router.get('/:id', NotificationController.getNotificationById);
router.post('/', NotificationController.createNotification);
router.put('/:id', NotificationController.updateNotificationById);
router.delete('/:id', NotificationController.deleteNotificationById);

export default router;