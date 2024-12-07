import { Input, Button } from "./";
import { useState } from "react";
import { useSelector } from "react-redux";
import { host, themeBlue, themeGreen } from "../constants";

const Dashboard = () => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const userState = useSelector((state) => state.user);

	return (
		<div
			className="form"
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "1vmax",
				minHeight: "25vh",
				justifyContent: "center"
			}}
		>
			<h3
				style={{
					color: themeBlue,
					fontSize: "1.3vmax"
				}}
			>
				Welcome {userState.details.name}
			</h3>
			<form
				style={{
					display: "flex",
					gap: "0.5vmax"
				}}
				onSubmit={(e) => {
					e.preventDefault();
					const obj = {
						uname: localStorage.getItem("uname"),
						name,
						phone
					};
					fetch(`${host}/api/contact/add`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(obj)
					})
						.then(() => location.reload())
						.catch((error) => console.error(error));
					setName("");
					setPhone("");
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "0.1vmax"
					}}
				>
					<Input
						placeholder="Name"
						style={{
							minWidth: "20vw"
						}}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						style={{
							minWidth: "20vw"
						}}
						placeholder="Contact No"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
				</div>
				<Button
					type="submit"
					style={{
						backgroundColor: themeGreen
					}}
				>
					Add
				</Button>
			</form>
		</div>
	);
};

export default Dashboard;
