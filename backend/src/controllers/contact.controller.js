import { connection } from "../server.js";
import ApiResponse from "../ApiResponse.js";

const createContactTable = async () => {
	await connection.query(`
        create table if not exists contact(
            username varchar(15),
            name varchar(25) not null,
            phone char(10),
            primary key (username, phone),
            foreign key (username) references user(username)
        );
    `);
};

export const addContact = async (req, res) => {
	await createContactTable();
	const { uname, name, phone } = req.body;
	try {
		await connection.query(`
            insert into contact (username, name, phone) values(
                '${uname}', '${name}', '${phone}'
            );
        `);
		res
			.status(200)
			.json(new ApiResponse({ message: "Added contact successfully" }));
	} catch (error) {
		res.status(400).json(
			new ApiResponse({
				success: false,
				message: error.message
			})
		);
	}
};

export const fetchContacts = async (req, res) => {
	const { uname } = req.body;
	try {
		const [rows, _] = await connection.query(`
            select name, phone from contact where username = '${uname}';
        `);
		let response;
		if (rows.length == 0) {
			response = new ApiResponse({
				message: "No contacts found"
			});
		} else {
			response = new ApiResponse({
				message: "Contacts fetched successfully",
				dets: rows
			});
		}
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json(
			new ApiResponse({
				success: false,
				message: error.message
			})
		);
	}
};

export const editContact = async (req, res) => {
	const { uname, newName, oldPhone, newPhone } = req.body;
	try {
		await connection.query(`
			update contact set name = '${newName}', phone = '${newPhone}'
			where username = ${uname} and phone = ${oldPhone};
		`);
		res.status(200).json(
			new ApiResponse({
				message: "Contact updated successfully",
				success: true
			})
		);
	} catch (error) {
		res.status(400).json(
			new ApiResponse({
				success: false,
				message: error.message
			})
		);
	}
};

export const deleteContact = async (req, res) => {
	const { uname, phone } = req.body;
	try {
		await connection.query(`
			delete from contact where username = '${uname}' and phone = '${phone}';	
		`);
		res.status(200).json(
			new ApiResponse({
				message: "Contact deleted successfully",
				success: true
			})
		);
	} catch (error) {
		res.status(400).json(
			new ApiResponse({
				success: false,
				message: error.message
			})
		);
	}
};
