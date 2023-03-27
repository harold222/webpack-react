import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Iinfo, IUser} from "./IUser";
import {AppThunk} from "../store";

const initialState: IUser = {
    info: {
        typeOfDocument: 0,
        numberDocument: '',
        phone: '',
        email: '',
    },
    loading: false,
    error: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Iinfo>) => {
            state.info = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            console.log("response: ", action.payload);
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || 'Se ha generado un error';
        });
    }
});

// dos formas de realizar los thunks =

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (_argv, thunkAPI) => {
        const { info } = thunkAPI.getState() as IUser;
        const response = await fetch('http://localhost:5017/solicitud',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info)
        });
        return await response.json();
    }
)

// export const fetchUser = (): AppThunk => {
//     return async (dispatch, getState) => {
//         const currentInfo = getState().user.info;
//
//         try {
//             const response = await fetch('http://localhost:5017/solicitud',{
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(currentInfo)
//             });
//
//             await response.json();
//         } catch (error) {
//             const message = error instanceof Error ?
//                 error.message : 'Se ha generado un error';
//             dispatch(setError(message));
//         }
//     }
// }

export const { setUser, setError, setLoading } = userSlice.actions;
export default userSlice.reducer;