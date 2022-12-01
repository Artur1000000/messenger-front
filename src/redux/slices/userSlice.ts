import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { IAuthUser, IInitialStateUsers, IUserData } from "../../types";

const initialState: IInitialStateUsers = {
    data: [],
    status: "",
    isLoading: false
}


export const getUsers = createAsyncThunk("users/getUsers", async ({ userName, id }: IAuthUser) => {
    const { data } = await axios.get("/users", {params:{userName, id}});
    return data;
});

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state: IInitialStateUsers) => {
                state.isLoading = true;
                state.status = "loading";
            })
            .addCase(getUsers.fulfilled, (state, action: PayloadAction<IUserData[]>) => {
                state.isLoading = false;
                state.status = "resolved";
                state.data = action.payload.map((i) => { return { cheked: false, ...i } });
            })
            .addCase(getUsers.rejected, (state) => {
                state.isLoading = false;
                state.status = "rejected";
            })
    }
})


export default userSlice.reducer;