import express from 'express';
const router=express.Router();
import { createpost, getPosts, getpostsbyusername } from '../controllers/Postcontroller.js';

router.get('/',getPosts);
router.post('/createpost',createpost);
router.get('/byusername/:username',getpostsbyusername);

export default router;