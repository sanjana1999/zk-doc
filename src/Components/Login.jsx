import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { createWallet } from '../utils/helper'
import { MEDICAL_RECORDS_CONTRACT_ADDRESS } from '../utils/config';
import CONTRACT_ABI from '../utils/recordABI.json';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [otp, setOTP] = useState(null);
  const [docAddress, setDocAddress] = useState(null);

  const [otpRes, setOtpRes] = useState();
  const { wallet, setWallet, phone, setPhone } = useContext(AppContext);

  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  
  let navigate = useNavigate();

  const getOtpVerification = async() => {
    let response = await fetch('http://localhost:18781/utils/send-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({to : "+91" + phone })
    }).catch(e => console.log(e));

    console.log(response);
    setOtpRes(response);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    // console.log("Twilio Notification Sent: ", response);
    const data = {
      to: "+91" + phone, 
      code: otp
    };
    
    const response = await fetch('http://localhost:18781/utils/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }).catch(e => console.log(e));

    if(response.ok){
        const _wallet = createWallet();
        console.log(_wallet);
        setWallet(_wallet);

        let res = await axios.post('http://localhost:8080/save-user', {
            phone_number: phone,
            private_key: _wallet.privateKey
          }
        ).then((res) => res.data)
        .catch((err) => console.log("IN ERR:", err));

        console.log("User Added Successfully", res);
      // }
        
      navigate('/upload')
    }
    // window.param
      // window.location = '/upload';
  }

  useEffect(() => {
  })

  return (
    <div>
      Login: 
      <input placeholder='Enter login phone number' onChange={(e) => setPhone(e.target.value)} type="tel" />
      <input placeholder='Enter OTP' onChange={(e) => setOTP(e.target.value)} type="number" />
      <button onClick={handleSubmit}>Login</button>
      <button onClick={() => getOtpVerification()}>Get OTP</button>
    </div>
  );
}

export default Login;
