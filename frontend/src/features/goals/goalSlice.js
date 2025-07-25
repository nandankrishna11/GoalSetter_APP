import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import goalService from './goalService'
import { logout } from '../auth/authSlice'; // Import logout action


const initialState={
    goals:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
}

//create new goals
export const createGoal=createAsyncThunk('goals/create',async(goalData,thunkAPI)=>{
    try{
        const token=thunkAPI.getState().auth.user.token
       
        return await goalService.createGoal(goalData,token)
    }catch(error){
        const message=(error.response&&error.response.data&&error.response.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get goals
export const getGoals=createAsyncThunk('goals/get',async(_,thunkAPI)=>{
    try{
        const token=thunkAPI.getState().auth.user.token
        return await goalService.getGoals(token)
    }catch(error){
        const message=(error.response&&error.response.data&&error.response.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Delete goals
export const deleteGoal=createAsyncThunk('goals/delete',async(id,thunkAPI)=>{
    try{
        const token=thunkAPI.getState().auth.user.token
       
        return await goalService.deleteGoal(id,token)
    }catch(error){
        const message=(error.response&&error.response.data&&error.response.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const goalSlice=createSlice({
    name:'goal',
    initialState,
    reducers:{
        reset:(state) => {
            state.goals = []
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createGoal.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createGoal.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.goals.push(action.payload)
        })
        .addCase(createGoal.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(getGoals.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getGoals.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.goals=Array.isArray(action.payload) ? action.payload : []
        })
        .addCase(getGoals.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(deleteGoal.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteGoal.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.goals=state.goals.filter((goal)=> goal._id !== action.payload.id)
        })
        .addCase(deleteGoal.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(logout.fulfilled, (state) => {
            state.goals = [];
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
          });
    },
})


export const {reset}=goalSlice.actions
export default goalSlice.reducer







