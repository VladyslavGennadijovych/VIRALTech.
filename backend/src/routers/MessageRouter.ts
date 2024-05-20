import express from 'express';
import MessageController from '../controllers/MessageController';

const router = express.Router();

router.get('/', MessageController.getAllMessages);
router.get('/:id', MessageController.getMessageById);
router.post('/', MessageController.createMessage);
router.put('/:id', MessageController.updateMessageById);
router.delete('/:id', MessageController.deleteMessageById);

export default router;