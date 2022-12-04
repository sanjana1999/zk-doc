import React, {useState} from 'react';
import Card from './Card';
import Upload from './Upload';

function List() {
  const [list, setList] = useState(
    [{"name":"Sanjana", "age":"19", "diagnosis":"Insomania"}, 
    {"name":"Sanjana", "age":"20", "diagnosis":"Acute Chronic Disorder"},
    {"name":"Sanjana", "age":"22", "diagnosis":"Goitre"},
    {"name":"Sanjana", "age":"22", "diagnosis":"Bow Legs"}]
  );

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
        <Upload setList={setList} />
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
        {list.map((card, i) => (
          <div key={`card-${i}`}>
            <Card 
              card={card}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
