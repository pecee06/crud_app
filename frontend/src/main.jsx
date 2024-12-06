import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	Outlet
} from "react-router-dom";
import { Auth } from "./pages";
import { Provider } from "react-redux";
import store from "./redux/store.js";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<Outlet />}
		>
			<Route
				path=""
				element={<App />}
			/>
			<Route
				path="auth"
				element={<Auth />}
			/>
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
