import { useState } from 'react';

export default function AddDrug({ onCancel, onAdd }) {
  const [drug, setDrug] = useState({});

  async function submitHandler(e) {
    e.preventDefault();
    const newDrug = {
      ...drug,
      createdOn: new Date(),
      updatedOn: new Date(),
    };
    const response = await fetch('https://localhost:7115/api/Drug', {
      method: 'POST',
      body: JSON.stringify(newDrug),
      headers: {
        'Content-Type': 'application/json',
        accept: '*',
      },
    });

    if (response.status >= 200 && response.status < 300) {
      onAdd(newDrug);
    }
  }

  return (
    <div className="card">
      <div className="left-part"></div>
      <form className="right-part" onSubmit={submitHandler}>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            required={true}
            onChange={(e) =>
              setDrug({ ...drug, name: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Price: </label>
          <input
            type="number"
            required={true}
            onChange={(e) =>
              setDrug({ ...drug, price: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Image URL: </label>
          <input
            type="url"
            required={false}
            onChange={(e) =>
              setDrug({ ...drug, imgUrl: e.target.value })
            }
          />
        </div>
       

        <div className="crud-action-buttons">
          <button className="red" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className="green">Submit</button>
        </div>
      </form>
    </div>
  );
}
