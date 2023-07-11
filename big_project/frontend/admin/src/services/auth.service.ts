import { BaseService } from "./base.service";

class AuthService extends BaseService {
    async loginUser({ mail, password }: { mail: string; password: string }) {
        try {
            const response = await this.httpClientPublic.post(
                "/auth/user/login",
                { mail: mail, password: password }
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async logoutUser() {
        try {
            const response = await this.httpClientPublic.post(
                "/auth/user/logout"
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async getProfileUser() {
        try {
            const response = await this.httpClientPrivate.get(
                "/auth/user/get_profile"
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async loginAdmin({
        username,
        password,
    }: {
        username: string;
        password: string;
    }) {
        try {
            const response = await this.httpClientPublic.post(
                "/admin/account/login",
                { username, password }
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async getProfileAdmin() {
        try {
            const response = await this.httpClientPrivate.get(
                "/admin/account/get_profile"
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async logoutAdmin() {
        try {
            const response = await this.httpClientPrivate.post(
                "/admin/account/logout"
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async getTrans() {
        try {
            const response = await this.httpClientPrivate.get(
                "/users/translator/view"
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }
}

export const authService = new AuthService();
