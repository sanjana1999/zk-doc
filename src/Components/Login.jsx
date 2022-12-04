import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { createWallet } from '../utils/helper';
import { MEDICAL_RECORDS_CONTRACT_ADDRESS } from '../utils/config';
import CONTRACT_ABI from '../utils/recordABI.json';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Typography, Button } from 'antd';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
function Login({ showLogin }) {
  const [otp, setOTP] = useState(null);
  const [docAddress, setDocAddress] = useState(null);

  const [otpRes, setOtpRes] = useState();
  const { wallet, setWallet, phone, setPhone } = useContext(AppContext);
  const prevShowLogin = usePrevious(showLogin);
  const { Title } = Typography;

  const [form] = Form.useForm();

  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;

  let navigate = useNavigate();

  const getOtpVerification = async () => {
    let response = await fetch(
      'http://localhost:18781/utils/send-notification',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: '+91' + phone }),
      }
    ).catch((e) => console.log(e));

    console.log(response);
    setOtpRes(response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("Twilio Notification Sent: ", response);
    const data = {
      to: '+91' + phone,
      code: otp,
    };

    const response = await fetch('http://localhost:18781/utils/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    }).catch((e) => console.log(e));

    if (response.ok) {
      const _wallet = createWallet();
      console.log(_wallet);
      setWallet(_wallet);

      let res = await axios
        .post('http://localhost:8080/save-user', {
          phone_number: phone,
          private_key: _wallet.privateKey,
        })
        .then((res) => res.data)
        .catch((err) => console.log('IN ERR:', err));

      console.log('User Added Successfully', res);
      // }

      navigate('/upload');
    }
    // window.param
    // window.location = '/upload';
  };

  useEffect(() => {});

  const onFinish = (values) => {
    console.log('Success:', values);
    navigate('/list');
  };

  {
    /* <input placeholder='Enter login phone number' onChange={(e) => setPhone(e.target.value)} type="tel" />
      <input placeholder='Enter OTP' onChange={(e) => setOTP(e.target.value)} type="number" />
      <button onClick={handleSubmit}>Login</button>
      <button onClick={() => getOtpVerification()}>Get OTP</button> */
  }

  return (
    <div
      className={`slide-up ${
        prevShowLogin !== undefined && prevShowLogin !== showLogin && showLogin
          ? 'open'
          : prevShowLogin !== undefined &&
            prevShowLogin !== showLogin &&
            !showLogin
          ? 'close'
          : ''
      }`}
    >
      <div style={{ padding: '27% 80px' }}>
        <Title
          level={2}
          style={{
            color: 'rgb(0 32 70)',
            fontSize: '700',
            textAlign: 'center',
          }}
        >
          Log in
        </Title>

        <Form
          form={form}
          layout="vertical"
          style={{ paddingTop: '30px' }}
          onFinish={onFinish}
        >
          <Form.Item name="phone">
            <Input
              style={{
                width: '100%',
                height: '50px',
                boxShadow: '2px 1px 4px -2px',
              }}
              placeholder="Phone number"
            />
          </Form.Item>
          <Form.Item name="password">
            <Input
              style={{
                width: '100%',
                height: '50px',
                boxShadow: '2px 1px 4px -2px',
              }}
              placeholder="OTP"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
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
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
