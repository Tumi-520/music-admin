import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const url = 'http://localhost:4000'

export const hotApi =createAsyncThunk(
  'hot',
  async ()=> {
    const res =await axios.post(`${url}/playlist/hot`)
    return res.data
  }
)
export const playApi =createAsyncThunk(
  'play',
  async (params:any)=> {
    const {id} =params
    const res =await axios.post(`${url}/playlist/detail`,{
      id
    })
    return res.data
  }
)
 
export const Playlist = createAsyncThunk(
  'list',
  async (params:any) => {
    const {cat,limit}=params
    const res =await axios.post(`${url}/top/playlist/highquality?cat=${cat}&limit=${limit}`)
    return res.data
  }
)
export const Singer = createAsyncThunk(
  'singer',
  async (params:any) => {
    const {limit} = params
    const res =await axios.get(`${url}/top/artists?limit=${limit}`)
    return res.data
  }
)
export const Disc = createAsyncThunk(
  'disc',
  async () => {
    const res =await axios.get(`${url}/album/new?area=ZH&limit=30`)
    return res.data
  }
)
export const MusicSlice =createSlice({
  name:"music",
  initialState:{
    hot:[],
    playlist:[],
    singers:[],
    newDisc:[]
  },
  reducers:{},
  extraReducers:{
    // @ts-ignore
    [hotApi.fulfilled](state,{payload}){
      state.hot=payload.tags
    },
    // @ts-ignore
    [playApi.fulfilled](state,{payload}){
      console.log(payload);
    },
     // @ts-ignore
     [Playlist.fulfilled](state,{payload}){
      state.playlist=payload.playlists
    },
     // @ts-ignore
     [Singer.fulfilled](state,{payload}){
      state.singers=payload.artists      
    },
    // @ts-ignore
    [Disc.fulfilled](state,{payload}){
      state.newDisc=payload.albums 
      console.log(payload);
           
    }
  }
})

// export const {} =MusicSlice.actions;
export default MusicSlice.reducer;