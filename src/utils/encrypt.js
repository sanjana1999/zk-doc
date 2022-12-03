import CryptoJS, { AES } from "crypto-js";
export function wordToByteArray(wordArray) {
	console.log(wordArray);
	var byteArray = [],
		word,
		i,
		j;
	for (i = 0; i < wordArray.length; ++i) {
		word = wordArray[i];
		for (j = 3; j >= 0; --j) {
			byteArray.push((word >> (8 * j)) & 0xff);
		}
	}
	return byteArrayToString(byteArray);
}

export function byteArrayToString(byteArray) {
	console.log(byteArray);

	var str = "",
		i;
	for (i = 0; i < byteArray.length; ++i) {
		str += escape(String.fromCharCode(byteArray[i]));
	}
	return str;
}

export async function encrypt({
	privateKey,
	cid,
	patientName,
	age,
	prescriptions,
	diagnosis,
}) {
	console.log(privateKey, cid, patientName, age, prescriptions, diagnosis);

	const encryptedCid = AES.encrypt(cid, privateKey).toString();
	const encryptedName = AES.encrypt(patientName, privateKey).toString();
	const encryptedAge = AES.encrypt(age, privateKey).toString();
	const encryptedPrescription = AES.encrypt(
		prescriptions,
		privateKey
	).toString();
	const encryptedDiagnosis = AES.encrypt(diagnosis, privateKey).toString();
	return {
		encryptedCid,
		encryptedName,
		encryptedAge,
		encryptedPrescription,
		encryptedDiagnosis,
	};
}

export async function decrypt({ encryptedDetails, privateKey }) {
	console.log("decrypt", encryptedDetails, privateKey);
	const {
		encryptedCid,
		encryptedName,
		encryptedAge,
		encryptedPrescription,
		encryptedDiagnosis,
	} = encryptedDetails || {};

	var cid = CryptoJS.AES.decrypt(encryptedCid, privateKey).toString(
		CryptoJS.enc.Utf8
	);
	var name = CryptoJS.AES.decrypt(encryptedName, privateKey).toString(
		CryptoJS.enc.Utf8
	);
	var age = CryptoJS.AES.decrypt(encryptedAge, privateKey).toString(
		CryptoJS.enc.Utf8
	);
	var prescription = CryptoJS.AES.decrypt(
		encryptedPrescription,
		privateKey
	).toString(CryptoJS.enc.Utf8);
	var diagnosis = CryptoJS.AES.decrypt(
		encryptedDiagnosis,
		privateKey
	).toString(CryptoJS.enc.Utf8);

	return { cid, name, age, prescription, diagnosis };
}
