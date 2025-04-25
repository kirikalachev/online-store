//user.routes.ts
import express from 'express';
import { updateUser, deleteUser } from './user.controller';

const router = express.Router();

router.put('/:userId', updateUser);

router.delete('/:userId', deleteUser);

export default router;