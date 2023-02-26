import { configureStore } from "@reduxjs/toolkit";
import nameTrainer  from "./slice/nameTrainer.slice";

export default configureStore({
  reducer:{
    nameTrainer
  },
})

