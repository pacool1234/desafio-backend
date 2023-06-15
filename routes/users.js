const express = require('express');
const router = express.Router()
const {uploadUserImg} = require('../middlewares/upload'); 
const UserController = require('../controllers/UserController');
const { authentication } = require("../middlewares/authentication");


router.post('/register',uploadUserImg.single('img'),UserController.register)
router.put('/update/:_id',authentication, uploadUserImg.single('img'), UserController.update)
router.post('/login',UserController.login)
router.delete('/logout',authentication , UserController.logout)
router.get('/getAll', authentication, UserController.getAll)
router.get('/getUser', authentication, UserController.getUser)
router.get('/confirm/:emailToken', UserController.confirm)
router.get("/getById/:_id", authentication, UserController.getById);
router.get("/getByUsername/:username", authentication, UserController.getByUsername);
router.put('/suscription/:_id', authentication, UserController.suscription);
router.put('/likesnotices/:_id', authentication, UserController.likesnotices);
router.put('/unlikenotices/:_id', authentication, UserController.unlikenotices);
router.put('/likescomments/:_id', authentication, UserController.likescomments);
router.put('/unlikecomments/:_id', authentication, UserController.unlikecomments);
router.put('/follow/:_id', authentication, UserController.follow);
router.put('/unfollow/:_id', authentication, UserController.unfollow);
router.get("/getUserFollowers", authentication, UserController.getUserFollowers);
router.get("/getUserFollowersInfo", authentication, UserController.getUserFollowersInfo);
router.get('/recoverPassword/:email', UserController.recoverPassword);
router.put('/resetPassword/:recoverToken', UserController.resetPassword);
router.post('/addcontact', authentication, UserController.addContact);
router.post('/removecontact', authentication, UserController.removeContact);
router.put('/updateimg/:_id',uploadUserImg.single('img'), UserController.updateImage)

module.exports = router;