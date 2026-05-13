import  { Router } from "express";
import { validate } from "../middleware/validate";
import { registerSchema } from "../validators/auth/registerValidator";
import { authController } from "../../di/authContainer";
import { loginSchema } from "../validators/auth/loginValidator";
import { verifyAccessToken } from "../middleware/verifyAccessToken";
const router=Router();

router.post("/register",validate(registerSchema),authController.registerUser)
router.post("/login",validate(loginSchema),authController.loginUser);
router.post("/refresh-token",authController.refreshAcessToken)
router.get("/me",verifyAccessToken,authController.me)
router.post("/logout",authController.logoutUser)
export default router;