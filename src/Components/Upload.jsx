import { upload } from '@testing-library/user-event/dist/upload';
import { useEffect, useState, useContext } from 'react';
import { decrypt, encrypt } from '../utils/encrypt';
import { getPatientRecords, uploadDocuments, userAddress } from '../utils/helper';
import { storeFile, retrieve } from '../utils/ipfs';
import axios from 'axios';
import { AppContext } from '../contexts/AppContext';

function Upload() {
  const [privateKey, setPrivateKey] = useState('');
  const [fileDetails, setFileDetails] = useState({});
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [prescriptions, setPrescriptions] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [encryptedDetails, setEncryptedDetails] = useState('');

  const { wallet } = useContext(AppContext);

  const uploadAndEncrypt = async ({
    privateKey,
    fileDetails,
    patientName,
    age,
    prescriptions,
    diagnosis,
  }) => {
    const cid = await storeFile({ file: fileDetails });
    const encrptedDetails = await encrypt({
      privateKey,
      cid: cid,
      patientName,
      age,
      prescriptions,
      diagnosis,
    });

    setEncryptedDetails(encrptedDetails);
    return encrptedDetails;
  };


  const handleSubmit = async() => {
    const encryptedDetails = await uploadAndEncrypt({
      privateKey,
      fileDetails,
      patientName,
      age,
      prescriptions,
      diagnosis,
    });
    
    await uploadDocuments({ 
      patientAddress: wallet.address, 
      name: encryptedDetails.encryptedName,
      age: encryptedDetails.encryptedAge,
      prescription: encryptedDetails.encryptedPrescription,
      diagnosis: encryptedDetails.encryptedDiagnosis,
      data: encryptedDetails.encryptedCid
    });

    console.log("Upload handle Submit:", wallet.address)
  }

  const handleRetrieve = async() => {
    const records = await getPatientRecords(wallet.address);
    // console.log(decrypt(records[0], wallet.address))


    
  }

  const decryptAndRetrieve = async ({ encryptedDetails, privateKey }) => {
    console.log('decryptAndRetrieve', encryptedDetails, privateKey);
    const details = await decrypt({ encryptedDetails, privateKey });
    console.log('decrypted', details);
    if (details.cid) {
      const files = await retrieve({ cid: details.cid });
      console.log('f', files);
    }
  };

  useEffect(() => {
  }, [])

  return (
    <div className="App">
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <p>Private key</p>
        <input
          type="text"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        />
      </div>
      <div
        style={{
          display: 'flex',
          marginBottom: '10px',
          alignItems: 'center',
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
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <p>Name</p>
        <input
          type="text"
          value={patientName}
          onChange={(e) => {setPatientName(e.target.value)}}
        />
      </div>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <p>Age</p>
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <p>Prescription</p>
        <textarea
          value={prescriptions}
          onChange={(e) => setPrescriptions(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <p>Diagnosis</p>
        <textarea
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />
      </div>
      <button
        onClick={() => handleSubmit()}
      >
        Submit
      </button>
      <button
        onClick={handleRetrieve}
      >
        Retrieve
      </button>
    </div>
  );
}

export default Upload;
