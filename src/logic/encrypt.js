import { Web3Storage } from "web3.storage";
import { AES } from "crypto-js";

export function encrypt({
	publicKey,
	privateKey,
	fileDetails,
	patientName,
	age,
	prescriptions,
	diagnosis,
}) {
	console.log(
		publicKey,
		privateKey,
		fileDetails,
		patientName,
		age,
		prescriptions,
		diagnosis
	);

	const encryptedText = AES.encrypt(
		JSON.stringify(
			fileDetails + patientName + age + prescriptions + diagnosis
		),
		privateKey
	);

	// storeFile({ file: e.target.files });

	return encryptedText;
}

export async function storeFile({ file }) {
	const web3StorageAPIKey =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI4NTBFMTFEQUEzNmIwZTkwZkEzMTVFMDgwYjliRTk0QzUxOWM4MzciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njk5OTg5OTM3MDUsIm5hbWUiOiJ6ay1kb2MifQ.GGxBL8zKjGD0ZBh-DMLiyf8ucq7YXPyC30gIhEJcltQ";

	const web3Client = new Web3Storage({ token: web3StorageAPIKey });

	console.log(file[0]);
	try {
		const cid = await web3Client.put(file);
		console.log("stored files with cid:", cid);
		return cid;
	} catch (err) {
		console.log(err);
	}
}
