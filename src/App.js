import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Upload from "./Components/Upload";
import "./index.css";
import Dashboard from "./Components/Dashboard";
import List from "./Components/List";
import UploadDetails from "./Components/Upload";

function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route exact path="/" element={<Dashboard />} />
					<Route exact path="/list" element={<List />} />
					<Route exact path="/upload" element={<UploadDetails />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
