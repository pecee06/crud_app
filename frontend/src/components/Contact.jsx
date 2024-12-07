import { Button } from "./";
import { themeBlue } from "../constants";
import { host } from "../constants";
import { useDispatch } from "react-redux";
import { edit, del } from "../redux/contacts.slice";

const Contact = ({ name, phone }) => {
	const dispatch = useDispatch();

	return (
		<div
			style={{
				display: "flex",
				padding: "0.5vmax 1vmax",
				border: `1px solid ${themeBlue}`,
				justifyContent: "space-between",
				marginRight: "0.5vmax",
				borderRadius: "10px",
				alignItems: "center"
			}}
		>
			<span>{name}</span>
			<span>{phone}</span>
			<Button
				onclick={() => {
					const newName = prompt("New name of contact");
					const newPhone = prompt("New phone no of contact");
					fetch(`${host}/api/contact/edit`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							uname: localStorage.getItem("uname"),
							newName: newName ? newName : name,
							newPhone: newPhone ? newPhone : phone,
							oldPhone: phone
						})
					})
						.then(() => {
							dispatch(
								edit({
									oldPhone: phone,
									newPhone: newPhone ? newPhone : phone,
									newName: newName ? newName : name
								})
							);
						})
						.catch((error) => console.error(error));
				}}
			>
				Edit
			</Button>
			<Button
				onclick={() => {
					fetch(`${host}/api/contact/delete`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							uname: localStorage.getItem("uname"),
							phone
						})
					})
						.then(() => {
							dispatch(del(phone));
						})
						.catch((error) => console.error(error));
				}}
				style={{
					backgroundColor: "red"
				}}
			>
				Delete
			</Button>
		</div>
	);
};

export default Contact;
