import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		loggedIn: false,
		details: {}
	},
	reducers: {
		login(state, action) {
			state.loggedIn = true;
			localStorage.setItem("uname", action.payload);
		},
		logout(state) {
			state.loggedIn = false;
			state.uname = "";
			state.details = {};
			localStorage.removeItem("uname");
		},
		updateDets(state, action) {
			state.details = action.payload;
		}
	}
});

export const { login, logout, updateDets } = userSlice.actions;

export default userSlice.reducer;
