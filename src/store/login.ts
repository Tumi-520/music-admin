import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const url = 'http://localhost:4000'

export const loginApi = createAsyncThunk(
  "login",
  async (params:any) => {
    const {type,username,password} =params
    if(type==="cellphone"){
        const res= await axios.post(`${url}/login/${type}`, {
          phone:username,
          password,
        });
        if(res.status===200){
          return res
        }
    }else{
      return await axios.post(`${url}/login`, {
         email:username,
         password,
       });
    }
  }
);
export const logout =createAsyncThunk(
  "logout",
  async ()=>{
    const res =await axios.get(`${url}/logout`)
    console.log(res);
    return res
    
  }
)

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    show: false,
    login: false,
    user:{}
  },
  reducers: {
    changeShow(state, { payload }) {
      state.show = payload;
    },
  },
  extraReducers: {
    // @ts-ignore
    [loginApi.fulfilled](state, { payload }) {
      console.log(payload);
      const {account,token,profile,bindings,cookie}=payload.data
      state.user={
        account,
        token,
        profile,
        bindings,
        cookie
      }
      state.login = true;
      state.show=false
    },
    // @ts-ignore
    [logout.fulfilled](state){
      state.user={}
      state.login=false
    }
  },
});

export const { changeShow } = loginSlice.actions;
export default loginSlice.reducer;
