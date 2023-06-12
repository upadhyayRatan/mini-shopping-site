import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios';
export const productList = createAsyncThunk('productlist',async(thunkAPI)=>{
    try{
        let response =await axios.get('/products/getProducts')
        let data=response.data
        if(data.message==="success"){
            return data.payload;
        }
        else{
            return thunkAPI.rejectWithValue(data)
        }
    }
    catch(err){
        console.log("Error",err)
    }
    
})
let productSlice = createSlice({
    name:'products',
    initialState:{
        productObj:[],
        isSuccess:false,
        isLoading:true,
        isError:false,
    },
    reducers:{
        updateProduct: (state, action) => {
            let arr=JSON.parse(localStorage.getItem('productList'));
            console.log("pdt arr",arr);
            arr[action.payload].productInCart=true;
            localStorage.setItem('productList',JSON.stringify(arr));
            console.log("action pload preducer",action.payload)
            state.productObj[action.payload].productInCart=true;
            return state;
        },
    },
    extraReducers:{
        [productList.fulfilled]:(state,action) =>{
            console.log("action payload message is",action.payload)//action.payload gives whatever is returned from AsyncThunk
            localStorage.setItem("productList",JSON.stringify(action.payload))
            state.productObj=action.payload
            state.isSuccess=true;
            state.isLoading=false;
            state.invalidLoginMessage = "";
            state.isError=false;
        },
        [productList.pending]:(state,action) => {
            state.isLoading=true;
        },
        [productList.rejected]:(state,action) =>{
            console.log("Action payload in reject",action.payload)
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;

        }
    }
})
export const {updateProduct}=productSlice.actions;
export default productSlice.reducer;