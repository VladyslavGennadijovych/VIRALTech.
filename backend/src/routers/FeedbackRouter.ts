import express from 'express';
import FeedbackController from '../controllers/FeedbackController';

const router = express.Router();

router.get('/', FeedbackController.getAllFeedbacks);
router.get('/:id', FeedbackController.getFeedbackById);
router.post('/', FeedbackController.createFeedback);
router.put('/:id', FeedbackController.updateFeedbackById);
router.delete('/:id', FeedbackController.deleteFeedbackById);

export default router;