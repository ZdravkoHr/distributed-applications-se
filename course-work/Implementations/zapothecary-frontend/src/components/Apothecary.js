import { useState } from 'react';
import convertToDateString from '../utils/convertToDateString';
export default function Apothecary({ data, fetchCb }) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="card">
      <div className="left-part">
        <img src={data.imgUrl} alt="no-image" />
      </div>

      <div className="right-part">
        {editing ? (
          <EditingApothecary
            data={data}
            fetchCb={fetchCb}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <ApothecaryDetails
            data={data}
            fetchCb={fetchCb}
            onEdit={() => setEditing(true)}
          />
        )}
      </div>
    </div>
  );
}

function EditingApothecary({ data, fetchCb, onCancel }) {
  const [apothecary, setApothecary] = useState(data);

  async function submitHandler(e) {
      e.preventDefault();
        const response = await fetch('https://localhost:7115/api/Apothecary/' + data.id , {
          method: 'PUT',
          body: JSON.stringify({firstName: apothecary.firstName, lastName: apothecary.lastName, imgUrl: apothecary.imgUrl}),
          headers: {
           'Content-Type': 'application/json',
           'accept': '*'
          },
        });

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
          value={apothecary.firstName}
          onChange={(e) =>
            setApothecary({ ...apothecary, firstName: e.target.value })
          }
        />
      </div>
      <div className="form-group">
        <label>Last name: </label>
        <input
          type="text"
          value={apothecary.lastName}
          required={true}
          onChange={(e) =>
            setApothecary({ ...apothecary, lastName: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>Image URL: </label>
        <input
          type="url"
          required={false}
          value={apothecary.imgUrl}
          onChange={(e) =>
            setApothecary({ ...apothecary, imgUrl: e.target.value })
          }
        />
      </div>
      <div className="form-group">
        <label>Start date: </label>
        <input
          type="date"
          required={true}
          value={convertToDateString(apothecary.startDate)}
          onChange={(e) =>
            setApothecary({
              ...apothecary,
              startDate: new Date(e.target.value),
            })
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

function ApothecaryDetails({ data, fetchCb, onEdit }) {

  async function deleteHandler() {
    const confirmed = window.confirm('Are you sure?');
    if (!confirmed) return;

    const response = await fetch(
      'https://localhost:7115/api/Apothecary/' + data.id,
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
        <b>Sold drugs: </b>
        {data.soldCount}
      </p>
      <p>
        <b>Start date: </b> {convertToDateString(data.startDate)}
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
