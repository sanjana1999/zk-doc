import React from 'react';
import { FileTextOutlined } from '@ant-design/icons';

function Card() {
  return (
    <div className="card">
      <div>
        <div className="heading">Sanjana Kumari(24 yrs)</div>
        <div>Insomnia</div>
      </div>
      <div style={{ cursor: 'pointer' }}>
        <FileTextOutlined />
      </div>
    </div>
  );
}

export default Card;
