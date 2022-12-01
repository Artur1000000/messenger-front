import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { IAuthUser, IInitialStateAuth } from "../../types";



const initialState: IInitialStateAuth = {
    userName: "",
    id: "",
    status: null,
    isLoading: false,
    message: null,
};

export const authUser = createAsyncThunk(
    "auth/authUser",
    async (userName: string) => {
        try {
            const { data } = await axios.post("/auth", { userName });
            return data;
        }
        catch (e) {
            console.log(e)
        }
    }
);


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state: any) => {
            state.id = "";
            state.userName = "";
            state.isLoading = false;
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authUser.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
                state.message = null;
            })
            .addCase(authUser.fulfilled, (state, action: PayloadAction<IAuthUser>) => {
                state.isLoading = false;
                state.status = "resolved";
                state.userName = action.payload.userName;
                state.id = action.payload.id;
            })
            .addCase(authUser.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.status = "rejected";
                state.message = action.payload.message;
            })
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
