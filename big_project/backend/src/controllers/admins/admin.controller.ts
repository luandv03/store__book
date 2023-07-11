import { Request, Response } from "express";

import { adminService } from "../../services/admins/auth.service";

export class AdminController {
    async getProfile(req: Request, res: Response): Promise<any> {
        try {
            const { admin_id } = res.locals.data;
            const data = await adminService.getProfileAdmin(admin_id);

            return res.status(data.statusCode).json(data);
        } catch (err) {
            res.status(500).json({
                statusCode: 500,
                message: err,
            });
        }
    }

    async login(req: Request, res: Response): Promise<any> {
        try {
            const { username, password } = req.body;

            const data = await adminService.loginAccount({
                username,
                password,
            });
            data.statusCode === 200 &&
                res.cookie("access_token_admin", data.data.access_token_admin, {
                    httpOnly: true,
                    maxAge: data.data.EXPIRES_ACCESS_TOKEN * 1000, // 1000 la 1 giay
                }) &&
                res.cookie(
                    "refresh_token_admin",
                    data.data.refresh_token_admin,
                    {
                        httpOnly: true,
                        maxAge: data.data.EXPIRES_REFRESH_TOKEN * 1000, // 3hrs
                    }
                );

            return res.status(data.statusCode).json(data);
        } catch (err) {
            console.log(err);
            res.status(500).json({ err: err });
        }
    }

    refreshToken(req: Request, res: Response) {
        const refresh_token = req.cookies.refresh_token;

        if (!refresh_token) {
            res.status(403).json({
                statusCode: 403,
                message: "Refresh token not valid",
            });
        }

        try {
            const data = adminService.refreshTokenService(refresh_token);

            data.statusCode === 201 &&
                res.cookie("access_token_admin", data.data.access_token, {
                    httpOnly: true,
                    maxAge: data.data.EXPIRES_ACCESS_TOKEN * 1000, // 3hrs
                });

            res.status(data.statusCode).json(data);
        } catch (err) {
            res.status(400).json({
                error: err,
            });
        }
    }

    logout(req: Request, res: Response) {
        try {
            res.clearCookie("access_token_admin");
            res.clearCookie("refresh_token_admin");

            return res.status(200).json({
                statusCode: 200,
                message: "Logout successfully",
            });
        } catch (err) {
            return res.status(500).json({
                statusCode: 500,
                message: err,
            });
        }
    }
}
