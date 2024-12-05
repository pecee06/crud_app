import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import connectToDb from "./db.js";

const server = http.createServer(app);
const port = process.env.PORT || 3000;

connectToDb().then((res) => {
	if (res) {
		server.listen(port, () => {
			console.log(`Server live at http://localhost:${port}`);
		});
	}
});
