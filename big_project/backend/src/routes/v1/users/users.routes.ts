import { Router } from "express";
const userRoutes: Router = Router();

import { UserController } from "../../../controllers/users/user.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { authMiddlewareAdmin } from "../../../middlewares/auth.middleware-admin";

const userController: UserController = new UserController();

userRoutes.post("/auth/user/login", userController.login);
userRoutes.post("/auth/user/register", userController.register);
userRoutes.post("/auth/user/logout", userController.logout);
userRoutes.get(
    "/auth/user/get_profile",
    authMiddleware,
    userController.getProfile
);

// get translator
userRoutes.get(
    "/users/translator/view",
    authMiddlewareAdmin,
    userController.getTranslators
);

export default userRoutes;
