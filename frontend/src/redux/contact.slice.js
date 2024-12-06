import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
	name: "contact",
	initialState: [
		// {}, {}, {}, ...
	],
	reducers: {
		renew(state, action) {
			state = action.payload;
		},
		edit(state, action) {
			// payload = {oldPhone, newPhone}
			for (contact of state) {
				if (contact.phone == action.payload.oldPhone) {
					contact.phone = action.payload.newPhone;
					break;
				}
			}
		},
		del(state, action) {
			state = state.filter((contact) => contact.phone != action.payload);
		}
	}
});

export const { renew, edit, del } = contactSlice.actions;
export default contactSlice.reducer;
