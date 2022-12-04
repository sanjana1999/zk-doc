import React from 'react';
import Card from './Card';
import Upload from './Upload';

function List() {
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div>
        <Upload />
      </div>
      <div
        style={{
          width: '60%',
          padding: '80px 50px 50px 50px',
          margin: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            marginBottom: '10px',
            justifyContent: 'space-between',
            padding: '10px 20px',
          }}
        >
          <div className="heading">Details</div>
          <div className="heading">PDF</div>
        </div>
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div key={`card-${i}`}>
            <Card />
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
