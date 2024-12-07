import express from "express";
import {
	signup,
	login,
	logout,
	getUser
} from "./controllers/user.controller.js";
import cors from "cors";
import ApiResponse from "./ApiResponse.js";
import {
	addContact,
	fetchContacts,
	editContact,
	deleteContact
} from "./controllers/contact.controller.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api", (req, res) => {
	res.status(200).json(new ApiResponse({}));
});
app.post("/api/signup", signup);
app.post("/api/login", login);
app.post("/api/logout", logout);
app.post("/api/user", getUser);
app.post("/api/contact/add", addContact);
app.post("/api/contact/fetch", fetchContacts);
app.post("/api/contact/edit", editContact);
app.post("/api/contact/delete", deleteContact);

export default app;
