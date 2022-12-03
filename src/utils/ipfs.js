import { Web3Storage } from "web3.storage";
import { decrypt } from "./encrypt";

function makeStorageClient() {
	const web3StorageAPIKey =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI4NTBFMTFEQUEzNmIwZTkwZkEzMTVFMDgwYjliRTk0QzUxOWM4MzciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njk5OTg5OTM3MDUsIm5hbWUiOiJ6ay1kb2MifQ.GGxBL8zKjGD0ZBh-DMLiyf8ucq7YXPyC30gIhEJcltQ";

	return new Web3Storage({ token: web3StorageAPIKey });
}

export async function storeFile({ file }) {
	console.log(file[0]);
	try {
		const web3Client = makeStorageClient();
		const cid = await web3Client.put(file);
		console.log("stored files with cid:", cid);
		return cid;
	} catch (err) {
		console.log(err);
	}
}

export async function retrieve({ cid }) {
	console.log(cid);
	const web3Client = makeStorageClient();
	const res = await web3Client.get(cid);

	if (!res.ok) {
		throw new Error(`failed to get ${cid}`);
	}
	const files = await res.files();
	return files[0];
	// request succeeded! do something with the response object here...
}
