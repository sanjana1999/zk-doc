import React from 'react';
import { FileTextOutlined } from '@ant-design/icons';

function Card({card}) {
  return (
    <div className="card">
      <div>
        <div className="heading">{card.name} ({card.age} yrs)</div>
        <div>{card.diagnosis}</div>
      </div>
      <div style={{ cursor: 'pointer' }}>
        <FileTextOutlined />
      </div>
    </div>
  );
}

export default Card;
