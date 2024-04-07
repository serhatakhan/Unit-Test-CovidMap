import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './dataSlice';

// * bunun içine gerekli ayarları vereceğiz. bunun içinde 
// slice dosyasına ihtiyacımız var. onu da redux klasörünün
// içinde dataSlice.js diye oluşturduk.
export default configureStore({
    reducer: dataReducer
})