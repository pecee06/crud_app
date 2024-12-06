import { useState } from "react";
import { Input, Button } from "../components";
import { themeBlue, themeLightGray, host } from "../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/user.slice";

const Auth = () => {
	const [isSignupForm, setIsSignupForm] = useState(true);
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [sex, setSex] = useState(2);
	const [uname, setUname] = useState("");
	const [passwd, setPasswd] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const resetFields = () => {
		setName("");
		setPhone("");
		setSex(2);
		setUname("");
		setPasswd("");
	};

	const encapsulate = () => {
		return {
			name,
			phone,
			sex: sex == 0 ? "M" : sex == 1 ? "F" : "O",
			uname,
			passwd
		};
	};

	return (
		<section
			id="auth"
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh"
			}}
		>
			<div
				class="form"
				style={{
					border: `1px solid ${themeBlue}`,
					padding: "1vmax",
					minWidth: "40vw",
					borderRadius: "10px",
					minHeight: "65vh",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-around"
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-around"
					}}
				>
					<Button
						onclick={() => setIsSignupForm(true)}
						style={{
							width: "100%",
							backgroundColor: isSignupForm ? themeLightGray : "white"
						}}
					>
						Signup
					</Button>
					<Button
						onclick={() => setIsSignupForm(false)}
						style={{
							width: "100%",
							backgroundColor: isSignupForm ? "white" : themeLightGray
						}}
					>
						Login
					</Button>
				</div>
				<form
					style={{
						minHeight: "40vh",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
						alignItems: "center"
					}}
					onSubmit={(e) => {
						e.preventDefault();
						if (isSignupForm) {
							fetch(`${host}/api/signup`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify(encapsulate())
							})
								.then((res) => res.json())
								.then((data) => {
									if (data.success) setIsSignupForm(false);
									else alert(data.message);
								})
								.catch((error) => console.error(error));
						} else {
							fetch(`${host}/api/login`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify(encapsulate())
							})
								.then((res) => res.json())
								.then((data) => {
									if (data.success) dispatch(login(uname));
									else alert(data.message);
								})
								.catch((error) => console.error(error))
								.finally(() => navigate("/"));
						}
						resetFields();
					}}
				>
					{isSignupForm && (
						<>
							<Input
								placeholder="Full Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								style={{
									minWidth: "35vw"
								}}
								required
							/>
							<Input
								placeholder="Contact No"
								type="tel"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								style={{
									minWidth: "35vw"
								}}
								pattern="^\d{10}$|^$"
								title="Contact No must be 10 digit long"
							/>
							<div
								style={{
									display: "flex",
									gap: "1vmax"
								}}
							>
								<Input
									name="sex"
									type="radio"
									value={0}
									onChange={() => setSex(0)}
								>
									Male
								</Input>
								<Input
									name="sex"
									type="radio"
									value={1}
									onChange={() => setSex(1)}
								>
									Female
								</Input>
								<Input
									name="sex"
									type="radio"
									value={2}
									onChange={() => setSex(2)}
									defaultChecked
								>
									Other
								</Input>
							</div>
						</>
					)}
					<Input
						placeholder="Username"
						value={uname}
						onChange={(e) => setUname(e.target.value)}
						style={{
							minWidth: "35vw"
						}}
						required
					/>
					<Input
						placeholder="Password"
						type="password"
						value={passwd}
						onChange={(e) => setPasswd(e.target.value)}
						style={{
							minWidth: "35vw"
						}}
						pattern="^.{8,}$"
						title="Password must be at least 8 characters long"
					/>
					<Button
						type="submit"
						style={{
							backgroundColor: themeLightGray,
							width: "100%"
						}}
					>
						{isSignupForm ? "Signup" : "Login"}
					</Button>
				</form>
			</div>
		</section>
	);
};

export default Auth;
