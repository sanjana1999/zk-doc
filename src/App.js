import { useState } from "react";
import { decrypt, encrypt, storeFile } from "./logic/encrypt";
import { retrieve } from "./logic/ipfs";

function App() {
	const [publicKey, setPublicKey] = useState("");
	const [privateKey, setPrivateKey] = useState("");
	const [fileName, setFileName] = useState("");
	const [fileDetails, setFileDetails] = useState({});
	const [patientName, setPatientName] = useState("");
	const [age, setAge] = useState("");
	const [prescriptions, setPrescriptions] = useState("");
	const [diagnosis, setDiagnosis] = useState("");

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
				<p>Private key</p>
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
					onChange={(e) => {
						// encrypt({ fileDetails: e.target.files });
						// decrypt({ files: e.target.files });
						setFileDetails(e.target.files);
					}}
				/>
			</div>
			{/* name, , age, prescriptions, diagnosis */}
			<div style={{ display: "flex", marginBottom: "10px" }}>
				<p>Name</p>
				<input
					type="text"
					value={patientName}
					onChange={(e) => setPatientName(e.target.value)}
				/>
			</div>
			<div style={{ display: "flex", marginBottom: "10px" }}>
				<p>Age</p>
				<input
					type="text"
					value={age}
					onChange={(e) => setAge(e.target.value)}
				/>
			</div>
			<div style={{ display: "flex", marginBottom: "10px" }}>
				<p>Prescription</p>
				<textarea
					value={prescriptions}
					onChange={(e) => setPrescriptions(e.target.value)}
				/>
			</div>
			<div style={{ display: "flex", marginBottom: "10px" }}>
				<p>Diagnosis</p>
				<textarea
					value={diagnosis}
					onChange={(e) => setDiagnosis(e.target.value)}
				/>
			</div>
			<button
				onClick={() => {
					encrypt({
						publicKey,
						privateKey,
						fileDetails,
						patientName,
						age,
						prescriptions,
						diagnosis,
					});
				}}
			>
				Submit
			</button>
			<button
				onClick={() => {
					retrieve(
						"bafybeielxbhcuymuzq5sjrqzpkvcpk5xczdivssk2voyceoiqlj34umxci"
					);
				}}
			>
				Retrieve
			</button>
		</div>
	);
}

export default App;
