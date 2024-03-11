import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


interface AuthState {
    isAuthenticated: boolean;
    authUser: any;
}
const url='http://192.168.1.5:3001';

export const registerUser= createAsyncThunk(
    'auth/registerUser',
    async(form:object)=>{
        console.log(form)
        try{
            const res= await axios.post(`${url}/auth/register`,form);
            return res.data
        }catch (err:any){
            const errorMessage = err?.response?.data?.message ||
            'please double check your credentials';
            console.error(errorMessage);
            throw err;
        } 
    }
);

export const loginUser= createAsyncThunk(
    'auth/loginUser',
    async(values:object)=>{
        console.log(values)
        try{
            const res= await axios.post(`${url}/auth/login`,values);
            return res.data
        }catch (err:any){
            const errorMessage = err?.response?.data?.message ||
                                'please double check your credentials';
            console.error(errorMessage);
            throw err;
        } 
    }
);

const authSlice = createSlice({
    name:"authUser",
    initialState:{
        isAuthenticated: false,
        authUser: {}
    }as AuthState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.authUser = action.payload;
                console.log("pending");
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.authUser = action.payload;
                console.log("fulfilled");
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.authUser = action.payload;
                console.log("rejected");
            })
            .addCase(loginUser.pending, (state, action) => {
                state.authUser = action.payload;
                console.log("pending");
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isAuthenticated=true;
                const userId = action.payload.data.id;
                const token = action.payload.token;
                AsyncStorage.setItem('token', JSON.stringify(token));
                AsyncStorage.setItem('userId', JSON.stringify(userId));
                console.log("fulfilled");
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.authUser = action.payload;
                console.log("rejected");
            });
    },
});


export default authSlice.reducer;