const express = require('express');
const router = express.Router();
const {createUser,loginUserCtrl,getAllUsers,getAuser,deleteUser,updateUserDetails,blockUser,unblockUser,handleRefreshToken,logout,updatePassword,forgetPasswordToken} = require('../controller/userCtrl');
const {sendEmail} = require('../controller/emailCtrl')
const {authMiddleware,isAdmin} = require('../middlewares/authMiddleWare');
router.post('/register',createUser);
router.post('/login',loginUserCtrl);
router.post('/forget-password',forgetPasswordToken);
router.get('/all-user',getAllUsers);
router.get('/refresh',handleRefreshToken);

router.get('/get-a-user/:id',authMiddleware,isAdmin,getAuser);
router.delete('/delete-a-user/:id',deleteUser)
router.put('/update-a-user',authMiddleware,isAdmin,updateUserDetails)
router.put('/block-user/:id',authMiddleware,isAdmin,blockUser);
router.put('/unblock-user/:id',authMiddleware,isAdmin,unblockUser);
router.put('/update-password/:id',authMiddleware,updatePassword);
router.get('/logout',logout);


module.exports = router;