import axios, { AxiosInstance } from "axios";
import { API_URL_BASE } from "../configs/routes.config";
import jwtInterceptor from "../interceptors/jwt.interceptor";

export const http = axios.create({
    baseURL: API_URL_BASE,
    withCredentials: true,
});

export class BaseService {
    protected httpClientPublic: AxiosInstance;
    protected httpClientPrivate: AxiosInstance;

    constructor() {
        this.httpClientPublic = http;
        this.httpClientPrivate = jwtInterceptor;
    }
}
