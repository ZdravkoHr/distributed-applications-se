import { useState, useEffect } from 'react';
import convertToDateString from '../utils/convertToDateString';
export default function Drug({ data, fetchCb }) {
  const [showMode, setShowMode] = useState('default');

  return (
    <div className="card">
      <div className="left-part">
        <img src={data.imgUrl} alt="no-image" />
      </div>

      <div className="right-part">
        {showMode === 'editing' ? (
          <EditingDrug
            data={data}
            fetchCb={fetchCb}
            onCancel={() => setShowMode('default')}
          />
        ) : null}
        {showMode === 'default' ? (
          <DrugDetails
            data={data}
            fetchCb={fetchCb}
            onEdit={() => setShowMode('editing')}
            onBuy={() => setShowMode('buying')}
          />
        ) : null}
        {showMode === 'buying' ? (
          <BuyDrug data={data} fetchCb={fetchCb} onCancel={() => setShowMode('default')} />
        ) : null}
      </div>
    </div>
  );
}

function EditingDrug({ data, fetchCb, onCancel }) {
  const [drug, setDrug] = useState(data);

  async function submitHandler(e) {
    e.preventDefault();

    const response = await fetch('https://localhost:7115/api/Drug/' + data.id, {
      method: 'PUT',
      body: JSON.stringify({
        name: drug.name,
        price: drug.price,
        imgUrl: drug.imgUrl,
      }),
      headers: {
        'Content-Type': 'application/json',
        accept: '*',
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
        <label>Name: </label>
        <input
          type="text"
          required={true}
          value={drug.name}
          onChange={(e) => setDrug({ ...drug, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Price: </label>
        <input
          type="number"
          value={drug.price}
          required={true}
          onChange={(e) => setDrug({ ...drug, price: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Image URL: </label>
        <input
          type="url"
          required={false}
          value={drug.imgUrl}
          onChange={(e) => setDrug({ ...drug, imgUrl: e.target.value })}
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

function BuyDrug({ data, fetchCb, onCancel }) {
  const [drugData, setDrugData] = useState({drugID: data.id});
  const [apothecaries, setApothecaries] = useState([]);
  const [customers, setCustomers] = useState([]);

  async function fetchPeople() {
    const apothecariesResponse = await fetch(
      'https://localhost:7115/api/Apothecary'
    );
    const customersResponse = await fetch(
      'https://localhost:7115/api/Customer'
    );
    const apothecaries = await apothecariesResponse.json();
    const customers = await customersResponse.json();

    setApothecaries(apothecaries);
    setCustomers(customers);

    setDrugData({
        ...drugData,
        apothecaryID: apothecaries[0].id,
        customerID: customers[0].id,
    })
  }
  
  useEffect(() => {
    fetchPeople();
  }, [])

  async function submitHandler(e) {
    e.preventDefault();

    const response = await fetch('https://localhost:7115/api/Drug/buy', {
      method: 'POST',
      body: JSON.stringify(drugData),
      headers: {
        'Content-Type': 'application/json',
        accept: '*',
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
        <label>Apothecary: </label>
        <select
          onChange={(e) =>
            setDrugData({ ...drugData, apothecaryID: +e.target.value })
          }
        >
          {apothecaries.map((apothecary) => {
            return (
              <option
                key={apothecary.id}
                value={apothecary.id}
              >{`${apothecary.firstName} ${apothecary.lastName}`}</option>
            );
          })}
        </select>
      </div>

      <div className="form-group">
        <label>Customer: </label>
        <select
          onChange={(e) =>
            setDrugData({ ...drugData, customerID: +e.target.value })
          }
        >
          {customers.map((customer) => {
            return (
              <option
                key={customer.id}
                value={customer.id}
              >{`${customer.firstName} ${customer.lastName}`}</option>
            );
          })}
        </select>
      </div>

      <div className="form-group">
        <label>Amount: </label>
        <input
          type="number"
          value={drugData.amount}
          required={true}
          onChange={(e) => setDrugData({ ...drugData, amount: +e.target.value })}
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

function DrugDetails({ data, fetchCb, onEdit, onBuy }) {
  async function deleteHandler() {
    const confirmed = window.confirm('Are you sure?');
    if (!confirmed) return;

    const response = await fetch('https://localhost:7115/api/Drug/' + data.id, {
      method: 'DELETE',
    });

    if (response.status >= 200 && response.status < 300) {
      fetchCb();
    }
  }

  return (
    <>
      <p>
        <b>Name: </b>
        {data.name}
      </p>
      <p>
        {' '}
        <b>Price: </b>
        {Number(data.price).toFixed(2)}
      </p>
      <p>
        {' '}
        <b>Bought amounts: </b>
        {data.boughtTimes}
      </p>

      <p>
        <b>Added to the system: </b> {convertToDateString(data.createdOn)}
      </p>
      <p>
        <b>Last updated: </b> {convertToDateString(data.updatedOn)}
      </p>

      <div className="crud-action-buttons">
        <button className="green" onClick={onBuy}>
          Buy
        </button>
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
