import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Upload from "./Components/Upload";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route exact path="/" element={<Login/>} />
					<Route exact path="/upload" element={<Upload />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
