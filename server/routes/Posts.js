import express from 'express';
const router=express.Router();
import { createpost, getPosts, getpostdetails, getpostsbyusername, likepost } from '../controllers/Postcontroller.js';

router.get('/',getPosts);
router.post('/createpost',createpost);
router.get('/byusername/:username',getpostsbyusername);
router.post('/likepost/:id',likepost)
router.get(`/getpostdetails/:id`,getpostdetails);
export default router;