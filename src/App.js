import { useState } from "react";
import { encrypt } from "./logic/encrypt";

function App() {
	const [publicKey, setPublicKey] = useState("");
	const [privateKey, setPrivateKey] = useState("");
	const [fileDetails, setFileDetails] = useState("");
	const [textDetails, setTextDetails] = useState("");

	return (
		<div className="App">
			<div style={{ display: "flex", marginBottom: "10px" }}>
				<p>Public key</p>
				<input
					type="text"
					value={publicKey}
					onChange={(e) => setPublicKey(e.target.value)}
				/>
			</div>
			<div style={{ display: "flex", marginBottom: "10px" }}>
				<p>private key</p>
				<input
					type="text"
					value={privateKey}
					onChange={(e) => setPrivateKey(e.target.value)}
				/>
			</div>
			<div
				style={{
					display: "flex",
					marginBottom: "10px",
					alignItems: "center",
				}}
			>
				<p>File</p>
				<input
					type="file"
					value={fileDetails}
					onChange={(e) => setFileDetails(e.target.value)}
				/>
			</div>
			<div style={{ display: "flex", marginBottom: "10px" }}>
				<p>Text details</p>
				<textarea
					value={textDetails}
					onChange={(e) => setTextDetails(e.target.value)}
				/>
			</div>

			<button
				onClick={() => {
					encrypt({
						publicKey,
						privateKey,
						fileDetails,
						textDetails,
					});
				}}
			>
				Submit
			</button>
		</div>
	);
}

export default App;
