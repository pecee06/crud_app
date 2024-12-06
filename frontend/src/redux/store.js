import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";
import contactReducer from "./contacts.slice";

// reducer key should match with slice name
const store = configureStore({
	reducer: {
		user: userReducer,
		contacts: contactReducer
	}
});

export default store;
