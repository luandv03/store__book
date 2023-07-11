import { QueryResult } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { query } from "../../db/index.db";
import { IAdmin } from "../../types/admins/admins.type";
import { IRegisterAccount } from "../../types/admins/register-account.type";
import { ILoginAccount } from "../../types/admins/login-account.type";
import { IToken } from "../../types/admins/login-account.type";
import { ConfigService } from "../../configs/configService.config";
import { createToken } from "../../utils/create_token.util";
import { ResponseType } from "../../types/response.type";
import { UserProfileType } from "../../types/users/user.type";
import { HttpStatusCode } from "../../configs/httpStatusCode.config";

const configService = new ConfigService();

class UserService {
    async getTranslators(): Promise<ResponseType<any[]>> {
        const result: QueryResult<any> = await query(
            `SELECT DISTINCT user_id, mail, username, phone_number address 
            FROM users JOIN novel ON users.user_id = novel.trans_id`
        );

        return {
            statusCode: HttpStatusCode.OK,
            message: "Get Translator Success",
            data: result.rows,
        };
    }

    async loginAccount(account: ILoginAccount): Promise<IToken | any> {
        try {
            const { mail, password }: ILoginAccount = account;

            const result: QueryResult<any> = await query(
                `SELECT * FROM users WHERE mail = $1`,
                [mail]
            );

            // rowCount: số lượng bản ghi trả về từ câu truy vấn
            if (!result.rowCount) {
                return {
                    statusCode: 404,
                    message: "Not found",
                };
            }

            const isMatch = await bcrypt.compare(
                password,
                result.rows[0]?.password
            );

            if (!isMatch) {
                return {
                    statusCode: 404,
                    message: "Username or Password not matches",
                };
            }

            const access_token = createToken<{
                user_id: string;
            }>(
                {
                    user_id: result.rows[0]?.user_id,
                },
                configService.getSecretKeyAccessToken(),
                {
                    expiresIn: configService.getExpiresInAccessToken(),
                }
            );

            const refresh_token = createToken(
                {
                    user_id: result.rows[0]?.user_id,
                },
                configService.getSecretKeyRefreshToken(),
                {
                    expiresIn: configService.getExpiresInRefreshToken(),
                }
            );

            return {
                statusCode: 200,
                message: "Login successfull",
                data: {
                    access_token,
                    refresh_token,
                    EXPIRES_ACCESS_TOKEN:
                        configService.getExpiresInAccessToken(),
                    EXPIRES_REFRESH_TOKEN:
                        configService.getExpiresInRefreshToken(),
                },
            };
        } catch (err) {
            return err;
        }
    }

    async registerAccount(
        account: IRegisterAccount
    ): Promise<ResponseType<any>> {
        const { mail, password, phone_number, birth_year, username, address } =
            account;

        const results = await query(`SELECT * FROM users WHERE mail = $1`, [
            mail,
        ]);

        if (results.rows.length) {
            return {
                statusCode: 406,
                message: "Mail already exist",
            };
        }

        const hashPassword: string = await bcrypt.hash(password, 10);

        await query(
            `INSERT INTO users( mail, username, password, phone_number, birth_year, address) VALUES ($1, $2, $3, $4, $5, $6)`,
            [mail, username, hashPassword, phone_number, birth_year, address]
        );

        return {
            statusCode: 201,
            message: "You have registed successfully",
        };
    }

    refreshTokenService(token: string): any {
        const decoded: any = jwt.verify(
            token,
            configService.getSecretKeyRefreshToken()
        );

        if (!decoded) {
            return {
                statusCode: 401,
                message: "Invalid token",
            };
        }

        const access_token = createToken<{ admin_id: string; role: string }>(
            {
                admin_id: decoded.admin_id,
                role: decoded.role,
            },
            configService.getSecretKeyAccessToken(),
            {
                expiresIn: configService.getExpiresInAccessToken(),
            }
        );

        return {
            statusCode: 201,
            message: "refesh token successfull",
            data: {
                access_token,
                EXPIRES_ACCESS_TOKEN: configService.getExpiresInAccessToken(),
            },
        };
    }

    async getProfile(user_id: number): Promise<ResponseType<UserProfileType>> {
        const results = await query(
            `SELECT user_id, mail, username, address, phone_number, birth_year FROM users WHERE user_id = $1`,
            [user_id]
        );

        if (!results.rows.length) {
            return {
                statusCode: 404,
                message: "User not exist",
            };
        }

        return {
            statusCode: 200,
            message: "Get Profile Successfull",
            data: results.rows[0],
        };
    }
}

export const userService = new UserService();
