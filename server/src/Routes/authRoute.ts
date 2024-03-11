import express from 'express';
import * as authController from '../Controller/authController';
const router = express.Router();

router.route('/register')
            .post(authController.register);

router.route('/login')
            .post(authController.login);


export default router;   