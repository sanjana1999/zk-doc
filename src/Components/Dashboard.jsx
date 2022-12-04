import React, { useState } from 'react';
import { Typography, Button, Image } from 'antd';
import Login from './Login';
import logo from '../assets/1.png';
import background from '../assets/dashboard.jpg';

const { Title } = Typography;

function Dashboard() {
  const [showLogin, setShowLogin] = useState(false);
  console.log(showLogin);
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div style={{ float: 'right', margin: '-20px 40px' }}>
        <img width={150} src={logo} />
      </div>
      <div style={{ position: 'absolute', top: '20%', paddingLeft: '7%' }}>
        <Title
          style={{
            color: '#F9F5EB',
            fontSize: '80px',
            marginBottom: '0.3em',
          }}
        >
          Consult, Share,<br></br>Documents<br></br>with trust.
        </Title>
        <Title
          level={4}
          style={{
            color: 'rgb(249, 245, 235, 0.8)',
            fontSize: '20px',
            fontWeight: 'normal',
            margin: '1em 0',
          }}
        >
          Access your entire medical history with your phone number.<br></br>
          Access your entire medical history with number.
        </Title>
        <Button
          type="primary"
          // shape="round"
          size="large"
          style={{
            backgroundColor: 'rgb(234, 227, 210, 0.8)',
            color: 'rgb(0 32 70)',
            padding: '3px 60px',
            fontSize: '20px',
            marginTop: '10px',
            height: '50px',
            fontWeight: '500',
          }}
          onClick={() => setShowLogin((prev) => !prev)}
        >
          Get Started
        </Button>
      </div>
      <Login showLogin={showLogin} />
    </div>
  );
}

export default Dashboard;
