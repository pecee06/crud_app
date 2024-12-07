import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renew } from "../redux/contacts.slice";
import { host } from "../constants";
import { Contact } from "./";

const ContactList = () => {
	let contactsState = useSelector((state) => state.contacts);
	const dispatch = useDispatch();

	useEffect(() => {
		fetch(`${host}/api/contact/fetch`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				uname: localStorage.getItem("uname")
			})
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) dispatch(renew(data.dets));
				//else alert(data.message);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "60vh",
				overflowY: "scroll",
				gap: "0.2vmax",
				minWidth: "65vw"
			}}
		>
			{Array.isArray(contactsState.list) &&
				contactsState.list.map((contact, index) => (
					<Contact
						key={index}
						name={contact.name}
						phone={contact.phone}
					/>
				))}
		</div>
	);
};

export default ContactList;
