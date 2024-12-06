import { Dashboard, ContactList } from "../components";

const Home = () => {
	return (
		<section
			id="home"
			style={{
				display: "flex",
				flexDirection: "column",
				minHeight: "80vh",
				justifyContent: "space-around",
				alignItems: "center"
			}}
		>
			<Dashboard />
			<ContactList />
		</section>
	);
};

export default Home;
