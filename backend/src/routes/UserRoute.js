// routes/userRoutes.js
import express from 'express';
import {

    getUserCyclesController,
    updateUserController,
    deleteUserController
} from '../controllers/UserController.js';

const router = express.Router();



router.get('/:userId/cycles', getUserCyclesController);

router.put('/:userId', updateUserController);

router.delete('/:userId', deleteUserController);

export default router;
