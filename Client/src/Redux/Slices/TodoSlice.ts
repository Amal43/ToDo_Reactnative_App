import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


interface TodoState {
    todo: any;
}
const url='http://192.168.1.5:3001';

export const getAllTasks= createAsyncThunk(
    'todo/getAllTasks',
    async()=>{
        const id =await AsyncStorage.getItem("userId");
        if(id){
            const parsedId =JSON.parse(id)
            try{
                const res= await axios.get(`${url}/todo/all/${parsedId}`,);
                return res.data
            }catch (err:any){
                const errorMessage = err?.response?.data?.message ||
                'please double check your credentials';
                console.error(errorMessage);
                throw err;
            } 
        }    
    }
);

export const createTask= createAsyncThunk(
    'todo/createTask',
    async(values:object)=>{
        const token =await AsyncStorage.getItem('token');
        if(token){
            const parsedToken= JSON.parse(token);
            try{
                const res= await axios.post(`${url}/todo/create`,
                    values,
                    {
                        headers: {
                            authorization: `Bearer ${parsedToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                return res.data
            }catch (err:any){
                const errorMessage = err?.response?.data?.message ||
                'please double check your credentials';
                console.error(errorMessage);
                throw err;
            } 
        }
    }
);

export const updateTask= createAsyncThunk(
    'todo/updateTask',
    async(values:any)=>{
        console.log(values)
        const token =await AsyncStorage.getItem('token');
        if(token){
            const parsedToken= JSON.parse(token);
            const {value,item}=values
            try{
                const token =await AsyncStorage.getItem("token");
                const res= await axios.put(`${url}/todo/update/${item.id}`,
                    value,
                    {
                        headers: {
                            authorization: `Bearer ${parsedToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                return res.data
            }catch (err:any){
                const errorMessage = err?.response?.data?.message ||
                'please double check your credentials';
                console.error(errorMessage);
                throw err;
            } 
        }
    }
);



const todoSlice = createSlice({
    name:"todo",
    initialState:{
        todo: {}
    }as TodoState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTasks.pending, (state, action) => {
                state.todo = action.payload;
                console.log("pending");
            })
            .addCase(getAllTasks.fulfilled, (state, action) => {
                state.todo = action.payload;
                // console.log(state.todo)
                console.log("fulfilled");
            })
            .addCase(getAllTasks.rejected, (state, action) => {
                state.todo= action.payload;
                console.log("rejected");
            })
            .addCase(createTask.pending, (state, action) => {
                state.todo = action.payload;
                console.log("pending");
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.todo = action.payload;
                console.log(state.todo)
                console.log("fulfilled");
            })
            .addCase(createTask.rejected, (state, action) => {
                state.todo= action.payload;
                console.log("rejected");
            })
            .addCase(updateTask.pending, (state, action) => {
                state.todo = action.payload;
                console.log("pending");
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.todo = action.payload;
                console.log(state.todo)
                console.log("fulfilled");
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.todo= action.payload;
                console.log("rejected");
            })
            
    },
});


export default todoSlice.reducer;