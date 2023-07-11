import { Router } from "express";
const adminRoutes: Router = Router();

import { authMiddlewareAdmin } from "../../../middlewares/auth.middleware-admin";
import { AdminController } from "../../../controllers/admins/admin.controller";
const adminController: AdminController = new AdminController();

//login account
adminRoutes.post("/admin/account/login", adminController.login);

//refresh token account
adminRoutes.get(
    "/admin/account/refresh_token",
    authMiddlewareAdmin,
    adminController.refreshToken
);

//logout
adminRoutes.post(
    "/admin/account/logout",
    authMiddlewareAdmin,
    adminController.logout
);

// get profile admin
adminRoutes.get(
    "/admin/account/get_profile",
    authMiddlewareAdmin,
    adminController.getProfile
);

export default adminRoutes;
