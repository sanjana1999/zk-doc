import { MEDICAL_RECORDS_CONTRACT_ADDRESS } from './config';
import CONTRACT_ABI from './recordABI.json';
import { ethers } from 'ethers';
// import crypto from 'crypto-js'

var userAddress;

function genHexString(len) {
    const hex = '0123456789ABCDEF';
    let output = '';
    for (let i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
}

function createWallet() {
    const id = genHexString(64);
    const privateKey = "0x"+id;

    console.log(privateKey);

    const wallet = new ethers.Wallet(privateKey);
    console.log("Address: " + wallet.address);

    userAddress = wallet.address;

    return wallet
}

// Get Patients Records
async function getPatientRecords(address){
    try {
        const { ethereum } = window;
  
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();

            const recordContract = new ethers.Contract(
                MEDICAL_RECORDS_CONTRACT_ADDRESS,
                CONTRACT_ABI.abi,
                signer
            );
            const result = await recordContract.getRecordsOfPatient(address);
            console.log(result);
            return result;
        }
    } catch (err) {
        console.log('In error: ' + err);
    }
}

// Upload the patient's records on-chain
async function uploadDocuments({ patientAddress, name, age, prescription, diagnosis, data }){
    try {
        const { ethereum } = window;
  
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();

            console.log("Before Record Contract")

            const recordContract = new ethers.Contract(
                MEDICAL_RECORDS_CONTRACT_ADDRESS,
                CONTRACT_ABI.abi,
                signer
            );

            console.log("After Record Contract");
            
            console.log(userAddress, name, age, prescription, diagnosis, data);
            let transaction = await recordContract.publishRecord(userAddress, name, age, prescription, diagnosis, data);
            let tx = await transaction.wait();
            console.log("Documents uploaded Successfully");
        }
    } catch (err) {
        console.log('In error: ' + err);
    }
}

export {
    createWallet,
    getPatientRecords,
    uploadDocuments,
    userAddress
};