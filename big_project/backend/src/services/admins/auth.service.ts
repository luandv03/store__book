import { QueryResult } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { query } from "../../db/index.db";
import { IToken } from "../../types/admins/login-account.type";
import { ConfigService } from "../../configs/configService.config";
import { createToken } from "../../utils/create_token.util";
import { ResponseType } from "../../types/response.type";

interface IAdmin {
    admin_id: number;
    username: string;
    password: string;
    role: string;
}

interface ILogin {
    username: string;
    password: string;
}

const configService = new ConfigService();

class AdminService {
    async loginAccount(account: ILogin): Promise<IToken | any> {
        try {
            const { username, password }: ILogin = account;

            const result: QueryResult<any> = await query(
                `SELECT * FROM admins WHERE username = $1`,
                [username]
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

            const access_token_admin = createToken<{
                admin_id: string;
            }>(
                {
                    admin_id: result.rows[0]?.admin_id,
                },
                configService.getSecretKeyAccessToken(),
                {
                    expiresIn: configService.getExpiresInAccessToken(),
                }
            );

            const refresh_token_admin = createToken(
                {
                    admin_id: result.rows[0]?.admin_id,
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
                    access_token_admin,
                    refresh_token_admin,
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

    async getProfileAdmin(user_id: number): Promise<ResponseType<any>> {
        const results = await query(
            `SELECT admin_id, username FROM admins WHERE admin_id = $1`,
            [user_id]
        );

        if (!results.rows.length) {
            return {
                statusCode: 404,
                message: "Admin not exist",
            };
        }

        return {
            statusCode: 200,
            message: "Get Profile Successfull",
            data: results.rows[0],
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

        const access_token_admin = createToken<{
            admin_id: string;
            role: string;
        }>(
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
                access_token_admin,
                EXPIRES_ACCESS_TOKEN: configService.getExpiresInAccessToken(),
            },
        };
    }
}

export const adminService = new AdminService();
