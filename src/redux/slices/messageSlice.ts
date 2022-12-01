import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { IAuthUser, IData, IInitialState } from "../../types";


interface ISendProps {
    from: string,
    to: string,
    theme: string,
    text: string
}

const initialState: IInitialState = {
    data: null,
    status: null,
    isLoading: false,
    message: null
};

export const getMessages = createAsyncThunk("messages/getMessages", async ({ userName, id }: IAuthUser) => {
    const { data } = await axios.get("/getMessages", { params: { userName, id } });
    return data;
});

export const writeMessage = createAsyncThunk("messages/writeMessage", async (ids: string[]) => {
    const { data } = await axios.patch("/changeStatus", { ids });
    return data;
});

export const sendMessage = createAsyncThunk(
    "messages/sendMessage",
    async ({ from, to, theme, text }: ISendProps) => {
        const { data } = await axios.post("/create", { from, to, theme, text });
        return data;
    }
);

export const messages = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
            })
            .addCase(getMessages.fulfilled, (state, action: PayloadAction<IData>) => {
                state.isLoading = false;
                state.status = "resolved";
                state.data = action.payload;
            })
            .addCase(getMessages.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.status = "rejected";
                state.message = action.payload.message;
            })
    },
});
export default messages.reducer;
