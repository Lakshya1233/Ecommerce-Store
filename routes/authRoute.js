import express from 'express'
import { registerController, loginContoller, testController, forgotPasswordController } from '../config/controllers/authController.js'
import { requireSignIn, isAdmin } from '../config/middlewares/authMiddleware.js'

const router = express.Router()


router.post("/register", registerController)

router.post("/login", loginContoller)

//forgot passwd
router.post("/forgot-password", forgotPasswordController);

router.get("/test", requireSignIn, isAdmin, testController)

//protected route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });

})
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });

})
export default router;