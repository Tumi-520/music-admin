import { configureStore} from '@reduxjs/toolkit'
import loginSlice from './login'
import  MusicSlice  from './music';
     

export default configureStore({
    reducer: {
      login:loginSlice,
      music:MusicSlice
    },
})
