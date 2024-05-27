import { useState } from 'react';
import convertToDateString from '../utils/convertToDateString';
export default function Customer({ data, fetchCb }) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="card">
      <div className="left-part">
        <img src={data.imgUrl} alt="no-image" />
      </div>

      <div className="right-part">
        {editing ? (
          <EditingCustomer
            data={data}
            fetchCb={fetchCb}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <CustomerDetails
            data={data}
            fetchCb={fetchCb}
            onEdit={() => setEditing(true)}
          />
        )}
      </div>
    </div>
  );
}

function EditingCustomer({ data, fetchCb, onCancel }) {
  const [customer, setCustomer] = useState(data);

  async function submitHandler(e) {
    e.preventDefault();
    const response = await fetch(
      'https://localhost:7115/api/Customer/' + data.id,
      {
        method: 'PUT',
        body: JSON.stringify({
          firstName: customer.firstName,
          lastName: customer.lastName,
          address: customer.address,
          imgUrl: customer.imgUrl,
        }),
        headers: {
          'Content-Type': 'application/json',
          accept: '*',
        },
      }
    );

    if (response.status >= 200 && response.status < 300) {
      fetchCb();
      onCancel();
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label>First name: </label>
        <input
          type="text"
          required={true}
          value={customer.firstName}
          onChange={(e) =>
            setCustomer({ ...customer, firstName: e.target.value })
          }
        />
      </div>
      <div className="form-group">
        <label>Last name: </label>
        <input
          type="text"
          value={customer.lastName}
          required={true}
          onChange={(e) =>
            setCustomer({ ...customer, lastName: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>Address: </label>
        <input
          type="text"
          value={customer.address}
          required={true}
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
          value={customer.imgUrl}
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
  );
}

function CustomerDetails({ data, fetchCb, onEdit }) {
  async function deleteHandler() {
    const confirmed = window.confirm('Are you sure?');
    if (!confirmed) return;

    const response = await fetch(
      'https://localhost:7115/api/Customer/' + data.id,
      {
        method: 'DELETE',
      }
    );

    if (response.status >= 200 && response.status < 300) {
      fetchCb();
    }
  }

  return (
    <>
      <p>
        <b>First name: </b>
        {data.firstName}
      </p>
      <p>
        {' '}
        <b>Last name: </b>
        {data.lastName}
      </p>
      <p>
        {' '}
        <b>Address: </b>
        {data.address}
      </p>
      <p>
        {' '}
        <b>Bought drugs: </b>
        {data.boughtCount}
      </p>
      <p>
        <b>Added to the system: </b> {convertToDateString(data.createdOn)}
      </p>
      <p>
        <b>Last updated: </b> {convertToDateString(data.updatedOn)}
      </p>

      <div className="crud-action-buttons">
        <button className="blue" onClick={onEdit}>
          Edit
        </button>
        <button className="red" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </>
  );
}
