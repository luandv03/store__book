import { createSlice, AsyncThunk } from "@reduxjs/toolkit";

import { login } from "../../thunks/login.thunk";
import { getProfile } from "./getProfile";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export interface IUser {
    user_id: number;
    mail: string;
    username: string;
    address: string;
    phone_number: string;
    birth_year: number;
    accessToken?: string;
    refreshToken?: string;
}

interface IAuthState {
    user: IUser;
    loading: boolean;
    isLogined: boolean;
    currentRequestId: string; // xu ly abort huy call API , lam mat loading
}

const initialState: IAuthState = {
    user: {
        user_id: 0,
        mail: "",
        username: "",
        address: "",
        phone_number: "",
        birth_year: 0,
    },
    loading: false,
    isLogined: false,
    currentRequestId: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state) => {
                state.isLogined = true;
                localStorage.setItem(
                    "isLogined",
                    JSON.stringify(state.isLogined)
                );
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                if (!JSON.parse(localStorage.getItem("isLogined") as string)) {
                    state.isLogined = true;
                    localStorage.setItem(
                        "isLogined",
                        JSON.stringify(state.isLogined)
                    );
                }

                state.user.user_id = action.payload.user_id;
                state.user.mail = action.payload.mail;
                state.user.username = action.payload.username;
                state.user.address = action.payload.address;
                state.user.phone_number = action.payload.phone_number;
            })
            .addCase(getProfile.rejected, (state) => {
                state.isLogined = false;
                localStorage.setItem(
                    "isLogined",
                    JSON.stringify(state.isLogined)
                );
            })
            .addMatcher<PendingAction | RejectedAction>(
                (action) => action.type.endsWith("pending"),
                (state, action) => {
                    state.loading = true;
                    state.currentRequestId = action.meta.requestId;
                }
            )
            .addMatcher<RejectedAction | FulfilledAction>(
                (action) =>
                    action.type.endsWith("fulfilled") ||
                    action.type.endsWith("rejected"),
                (state, action) => {
                    if (
                        state.loading &&
                        action.meta.requestId === state.currentRequestId
                    )
                        state.loading = false;
                }
            );
    },
});

const authReducer = authSlice.reducer;
export default authReducer;
