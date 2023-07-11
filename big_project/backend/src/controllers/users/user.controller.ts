import { Request, Response } from "express";

import { userService } from "../../services/users/user.service";
import { IAdmin } from "../../types/admins/admins.type";
import { IRegisterAccount } from "../../types/admins/register-account.type";
import { LoginUserAccountDto } from "../../dtos/user/user.dto";
import { RegisterUserAccountDto } from "../../dtos/user/user.dto";
import { handleErrorDto } from "../../utils/handle_error_dto.util";
import { ResponseType } from "../../types/response.type";

export class UserController {
    async register(req: Request, res: Response): Promise<any> {
        try {
            const {
                username,
                password,
                phone_number,
                address,
                mail,
                birth_year,
            }: IRegisterAccount = req.body;

            // validate dữ liệu đầu vào nhờ DTO
            // const errorResult: ResponseType<any> = await handleErrorDto<{
            //     username: string;
            //     password: string;
            //     phone_number: string;
            //     address: string;
            //     mail: string;
            //     birth_year: string;
            // }>(
            //     { username, password, phone_number, address, birth_year, mail },
            //     new RegisterUserAccountDto()
            // );

            // if (errorResult.statusCode) {
            //     return res.status(errorResult.statusCode).json(errorResult);
            // }

            const data = await userService.registerAccount({
                username,
                password,
                phone_number,
                mail,
                birth_year,
                address,
            });
            return res.status(data.statusCode).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Internal Server Error",
                err,
            });
        }
    }

    async login(req: Request, res: Response): Promise<any> {
        try {
            const { mail, password } = req.body;

            // validate dữ liệu đầu vào nhờ DTO
            const errorResult: ResponseType<any> = await handleErrorDto<{
                mail: string;
                password: string;
            }>({ mail, password }, new LoginUserAccountDto());

            if (errorResult.statusCode) {
                return res.status(errorResult.statusCode).json(errorResult);
            }

            const data = await userService.loginAccount({
                mail,
                password,
            });
            data.statusCode === 200 &&
                res.cookie("access_token", data.data.access_token, {
                    httpOnly: true,
                    maxAge: data.data.EXPIRES_ACCESS_TOKEN * 1000, // 1000 la 1 giay
                }) &&
                res.cookie("refresh_token", data.data.refresh_token, {
                    httpOnly: true,
                    maxAge: data.data.EXPIRES_REFRESH_TOKEN * 1000, // 3hrs
                });

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
            const data = userService.refreshTokenService(refresh_token);

            data.statusCode === 201 &&
                res.cookie("access_token", data.data.access_token, {
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
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");

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

    async getProfile(req: Request, res: Response): Promise<any> {
        try {
            const { user_id } = res.locals.data;
            const data = await userService.getProfile(user_id);

            return res.status(data.statusCode).json(data);
        } catch (err) {
            res.status(500).json({
                statusCode: 500,
                message: err,
            });
        }
    }

    async getTranslators(req: Request, res: Response): Promise<any> {
        try {
            const data = await userService.getTranslators();

            return res.status(data.statusCode).json(data);
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: error,
            });
        }
    }
}
