import express from "express";
import { signup, login, logout } from "./controllers/user.controller.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.status(200).send("OK");
});
app.post("/signup", signup);
app.post("/login", login);
app.post("/logout", logout);

export default app;
