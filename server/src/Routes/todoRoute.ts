import express from 'express';
import * as todoController from '../Controller/todoController';
import { authenticateUser } from '../middleware/auth';
const router = express.Router();

router.route('/create')
            .post(authenticateUser,todoController.createTodo);

router.route('/all/:id')
            .get(todoController.getAllTodo);

router.route('/update/:id')
            .put(authenticateUser,todoController.updateTodo);

export default router;   