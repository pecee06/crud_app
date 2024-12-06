import { connection } from "../server.js";
import bcrypt from "bcryptjs";

const createUserTable = async () => {
	await connection.query(`
        create table if not exists user(
            username varchar(15) primary key,
            name varchar(25) not null,
            phone char(10) unique,
            sex enum('M', 'F', 'O'),
            password tinytext not null,
            online tinyint default 0
        );
    `);
};

export const signup = async (req, res) => {
	await createUserTable();
	const { uname, passwd, name, phone, sex } = req.body;
	const hashedPassword = bcrypt.hashSync(passwd, 10);
	try {
		await connection.execute(
			`
            insert into user (username, password, name, phone, sex) values(
                '${uname}', '${hashedPassword}', '${name}', ?, '${sex}'
            );
        `,
			[phone ? phone : null]
		);
		res.status(200).json({
			success: true,
			message: "User registered successfully"
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
};

export const login = async (req, res) => {
	const { uname, passwd } = req.body;
	try {
		const [rows, _] = await connection.query(`
            select password, online from user where username='${uname}';
        `);
		if (rows.length == 0) throw new Error("No such user exists");
		const hash = rows[0].password;
		if (!bcrypt.compareSync(passwd, hash)) throw new Error("Invalid Password");

		if (rows[0].online == 1) throw new Error("User already logged in");
		await connection.query(`
            update user set online = 1 where username = '${uname}';
        `);

		res.status(200).json({
			success: true,
			message: "User logged in successfully"
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
};

export const logout = async (req, res) => {
	const { uname } = req.body;
	try {
		const [rows, _] = await connection.query(`
            select online from user where username = '${uname}';
        `);
		if (rows.length == 0) throw new Error("Unauthorized request");
		if (rows[0].online == 0) throw new Error("Unauthenticated request");
		await connection.query(`
            update user set online = 0 where username = '${uname}'
        `);

		res.status(200).json({
			success: true,
			message: "User logged out successfully"
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
};

export const getUser = async (req, res) => {
	const { uname } = req.body;
	try {
		const [rows, _] = await connection.query(`
			select name, phone, sex from user where username = '${uname}';
		`);
		if (rows.length == 0) throw new Error("No such user exists");
		res.status(200).json({
			dets: { ...rows[0], uname },
			message: "User fetched successfully"
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
};
