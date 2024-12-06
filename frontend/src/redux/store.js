import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";
import contactReducer from "./contact.slice";

// reducer key should match with slice name
const store = configureStore({
	reducer: {
		user: userReducer,
		contact: contactReducer
	}
});

export default store;
