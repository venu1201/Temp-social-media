import express from 'express';
import {getuserdetails, getgoogleuser, getusers, signin,signup, request, getallpendingusers, acceptanddeleteuser, updateuserdetails, remove } from '../controllers/usercontroller.js';
const router=express.Router();
router.post('/signin',signin);
router.post('/signup',signup);
router.post('/users',getusers)
router.get('/googleverify/:email',getgoogleuser);
router.get('/details/:username',getuserdetails);
router.post('/request/:username',request)
router.post('/getallpendingusers',getallpendingusers);
router.post('/acceptance/:username',acceptanddeleteuser);
router.post('/updateuserdetails/:username',updateuserdetails);
router.post('/remove/:type/:username',remove);

export default router;