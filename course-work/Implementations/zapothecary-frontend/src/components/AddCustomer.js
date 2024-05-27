import { useState } from 'react';

export default function AddCustomer({ onCancel, onAdd }) {
  const [customer, setCustomer] = useState({});

  async function submitHandler(e) {
    e.preventDefault();
    const newCustomer = {
      ...customer,
      createdOn: new Date(),
      updatedOn: new Date(),
    };
    const response = await fetch('https://localhost:7115/api/Customer', {
      method: 'POST',
      body: JSON.stringify(newCustomer),
      headers: {
        'Content-Type': 'application/json',
        accept: '*',
      },
    });

    if (response.status >= 200 && response.status < 300) {
      onAdd(newCustomer);
    }
  }

  return (
    <div className="card">
      <div className="left-part"></div>
      <form className="right-part" onSubmit={submitHandler}>
        <div className="form-group">
          <label>First name: </label>
          <input
            type="text"
            required={true}
            onChange={(e) =>
              setCustomer({ ...customer, firstName: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Last name: </label>
          <input
            type="text"
            required={true}
            onChange={(e) =>
              setCustomer({ ...customer, lastName: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Address: </label>
          <input
            type="address"
            required={false}
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Image URL: </label>
          <input
            type="url"
            required={false}
            onChange={(e) =>
              setCustomer({ ...customer, imgUrl: e.target.value })
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
