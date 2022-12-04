import { useEffect, useState, useContext } from 'react';
import { Button, Modal, Form, InputNumber, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { decrypt, encrypt } from '../utils/encrypt';
import {
  getPatientRecords,
  uploadDocuments,
  userAddress,
} from '../utils/helper';
import { storeFile, retrieve } from '../utils/ipfs';
import axios from 'axios';
import { AppContext } from '../contexts/AppContext';

function UploadDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [privateKey, setPrivateKey] = useState('');
  const [fileDetails, setFileDetails] = useState({});
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [prescriptions, setPrescriptions] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [encryptedDetails, setEncryptedDetails] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

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

  const handleSubmit = async () => {
    setIsLoading(true);
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
      data: encryptedDetails.encryptedCid,
    });
    setIsLoading(false);
    console.log('Upload handle Submit:', wallet.address);
    setShowUploadModal((prev) => !prev)
  };

  const handleRetrieve = async () => {
    const records = await getPatientRecords(wallet.address);
    // console.log(decrypt(records[0], wallet.address))
  };

  const decryptAndRetrieve = async ({ encryptedDetails, privateKey }) => {
    console.log('decryptAndRetrieve', encryptedDetails, privateKey);
    const details = await decrypt({ encryptedDetails, privateKey });
    console.log('decrypted', details);
    if (details.cid) {
      const files = await retrieve({ cid: details.cid });
      console.log('f', files);
    }
  };

  return [
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        width: '60%',
        margin: '10px auto',
      }}
    >
      <Button
        type="primary"
        // shape="round"
        size="large"
        style={{
          backgroundColor: 'rgb(0 32 70)',
          color: '#f9f5eb',
          padding: '3px 60px',
          fontSize: '20px',
          marginTop: '10px',
          height: '50px',
          fontWeight: '500',
        }}
        onClick={() => setShowUploadModal((prev) => !prev)}
      >
        Upload
      </Button>
    </div>,
    showUploadModal ? (
      <Modal
        title="Upload details"
        centered
        open={showUploadModal}
        onOk={() => setShowUploadModal()}
        onCancel={() => setShowUploadModal()}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={handleSubmit}
            style={{
              backgroundColor: 'rgb(0 32 70)',
              color: '#f9f5eb',
              height: '50px',
              borderRadius: '30px',
              width: '100%',
              fontSize: '20px',
            }}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 4 }}
          layout="vertical"
          initialValues={{ size: 'large' }}
        >
          <Form.Item label="Name" style={{ marginTop: '20px' }}>
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Age">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Diagnosis">
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Presription">
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="File" valuePropName="fileList">
            <Upload
              action="/upload.do"
              listType="picture-card"
              style={{ width: '100%' }}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    ) : // <div className="upload-form">
    //   <div style={{ display: 'flex', marginBottom: '10px' }}>
    //     <p>Private key</p>
    //     <input
    //       type="text"
    //       value={privateKey}
    //       onChange={(e) => setPrivateKey(e.target.value)}
    //     />
    //   </div>
    //   <div
    //     style={{
    //       display: 'flex',
    //       marginBottom: '10px',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <p>File</p>
    //     <input
    //       type="file"
    //       onChange={(e) => {
    //         // encrypt({ fileDetails: e.target.files });
    //         // decrypt({ files: e.target.files });
    //         setFileDetails(e.target.files);
    //       }}
    //     />
    //   </div>
    //   {/* name, , age, prescriptions, diagnosis */}
    //   <div style={{ display: 'flex', marginBottom: '10px' }}>
    //     <p>Name</p>
    //     <input
    //       type="text"
    //       value={patientName}
    //       onChange={(e) => setPatientName(e.target.value)}
    //     />
    //   </div>
    //   <div style={{ display: 'flex', marginBottom: '10px' }}>
    //     <p>Age</p>
    //     <input
    //       type="text"
    //       value={age}
    //       onChange={(e) => setAge(e.target.value)}
    //     />
    //   </div>
    //   <div style={{ display: 'flex', marginBottom: '10px' }}>
    //     <p>Prescription</p>
    //     <textarea
    //       value={prescriptions}
    //       onChange={(e) => setPrescriptions(e.target.value)}
    //     />
    //   </div>
    //   <div style={{ display: 'flex', marginBottom: '10px' }}>
    //     <p>Diagnosis</p>
    //     <textarea
    //       value={diagnosis}
    //       onChange={(e) => setDiagnosis(e.target.value)}
    //     />
    //   </div>
    //   <button
    //     onClick={() => {
    //       uploadAndEncrypt({
    //         privateKey,
    //         fileDetails,
    //         patientName,
    //         age,
    //         prescriptions,
    //         diagnosis,
    //       });
    //     }}
    //   >
    //     Submit
    //   </button>
    //   <button
    //     onClick={() => {
    //       decryptAndRetrieve({
    //         encryptedDetails: encryptedDetails,
    //         // :
    //         // 	"1393559994,1584734251,213537950,2036572798,237449791,-972991580,212258633,-327337757,-696429603,2090238998,-1314295724,-2118243240,970551248,-736863103,-1957447798,1144415180,769655609,-812511922,345950238,703239729,-1290403500,1493458022,1890738082,1225416646,-740198445,-1973343929,1482055718,-2097015555,877802241,659180937,1220985787,-432097147,849938290,-218861997,-1966921293,-61960949",
    //         // cid: "bafybeielxbhcuymuzq5sjrqzpkvcpk5xczdivssk2voyceoiqlj34umxci",
    //         privateKey: privateKey,
    //       });
    //     }}
    //   >
    //     Retrieve
    //   </button>
    // </div>
    null,
  ];
}

export default UploadDetails;
