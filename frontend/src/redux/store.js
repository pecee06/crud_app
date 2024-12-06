import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";

// reducer key should match with slice name
const store = configureStore({
	reducer: {
		user: userReducer
	}
});

export default store;
