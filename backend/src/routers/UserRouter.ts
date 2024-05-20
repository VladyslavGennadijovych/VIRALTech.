import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUserById);
router.delete('/:id', UserController.deleteUserById);
router.post('/login', UserController.loginUser);
router.post('/signup', UserController.signupUser);

export default router;