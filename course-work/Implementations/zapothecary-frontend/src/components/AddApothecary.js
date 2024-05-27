import {useState} from 'react';

export default function AddApothecary({onCancel, onAdd}) {
    const [apothecary, setApothecary] = useState({});

    async function submitHandler(e) {
        e.preventDefault();
        const newApothecary = {...apothecary, createdOn: new Date(), updatedOn: new Date()};
        const response = await fetch('https://localhost:7115/api/Apothecary', {
          method: 'POST',
          body: JSON.stringify(newApothecary),
          headers: {
           'Content-Type': 'application/json',
           'accept': '*'
          },
        });

        if (response.status >= 200 && response.status < 300) {
            onAdd(newApothecary);
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
                setApothecary({ ...apothecary, firstName: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Last name: </label>
            <input
              type="text"
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
              onChange={(e) =>
                setApothecary({ ...apothecary, startDate: new Date(e.target.value) })
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