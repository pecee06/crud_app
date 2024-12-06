import express from "express";
import {
	signup,
	login,
	logout,
	getUser
} from "./controllers/user.controller.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api", (req, res) => {
	res.status(200).send("OK");
});
app.post("/api/signup", signup);
app.post("/api/login", login);
app.post("/api/logout", logout);
app.post("/api/user", getUser);

export default app;
