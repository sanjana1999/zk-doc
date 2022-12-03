import { MEDICAL_RECORDS_CONTRACT_ADDRESS } from './config';
import { abi, data } from './recordABI.json';

var ethers = require('ethers');  
var crypto = require('crypto');


function createWallet() {
    var id = crypto.randomBytes(32).toString('hex');
    var privateKey = "0x"+id;

    var wallet = new ethers.Wallet(privateKey);
    console.log("Address: " + wallet.address);

    return {
        privateKey,
        wallet
    }
}

// Get Patients Records
async function getPatientRecords(wallet){
    try {
        const { ethereum } = window;
  
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();

            const recordContract = new ethers.Contract(
                MEDICAL_RECORDS_CONTRACT_ADDRESS,
                abi,
                signer
            );
            
            const result = await recordContract.getRecordsOfPatient(wallet.address);
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

            const recordContract = new ethers.Contract(
                MEDICAL_RECORDS_CONTRACT_ADDRESS,
                abi,
                signer
            );
            
            let transaction = await recordContract.publishRecord(patientAddress, name, age, prescription, diagnosis, data);
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
    uploadDocuments
};