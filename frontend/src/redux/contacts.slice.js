import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
	name: "contacts",
	initialState: {
		list: new Array()
	},
	reducers: {
		renew(state, action) {
			state.list = action.payload;
		},
		edit(state, action) {
			// payload = {oldPhone, newPhone, newName}
			state.list = state.list.map((contact) => {
				if (contact.phone == action.payload.oldPhone) {
					return {
						phone: action.payload.newPhone,
						name: action.payload.newName
					};
				}
				return contact;
			});
		},
		del(state, action) {
			state.list = state.list.filter(
				(contact) => contact.phone != action.payload
			);
		}
	}
});

export const { renew, edit, del } = contactsSlice.actions;
export default contactsSlice.reducer;
