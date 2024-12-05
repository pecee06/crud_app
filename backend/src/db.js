import mysql from "mysql2/promise";

export default async () => {
	try {
		const connection = await mysql.createConnection({
			host: "localhost",
			user: "root",
			database: "project",
			port: process.env.DB_PORT,
			password: process.env.DB_PASSWORD
		});
		console.log("Connection successfully established with DB");
		return connection;
	} catch (error) {
		console.error(error);
		return null;
	}
};
