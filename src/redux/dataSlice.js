import { createSlice } from "@reduxjs/toolkit";
import { getData } from "./actions";

// ülkenin bilgilerini tuttuk
const initialState = {
  data: null,
  isLoading: true,
  error: null,
};

const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  // api isteği sonucu veriye erişeceğimiz için redux toolkit thunk kullanabiliriz ve kullandık. extrareducers ile.
  extraReducers: (builder)=>{
    builder.addCase(getData.pending, (state)=> {
      state.isLoading = true
    })
    builder.addCase(getData.rejected, (state, action)=> {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(getData.fulfilled, (state, action)=> {
      state.isLoading = false
      state.error = false // null da olur farketmez ikisi de olumsuz bir değer
      state.data = action.payload
    })
  }
});

export default dataSlice.reducer
