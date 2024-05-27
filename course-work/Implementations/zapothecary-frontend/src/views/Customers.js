import { useState, useEffect } from "react";
import Customer from "../components/Customer";
import AddCustomer from '../components/AddCustomer';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    async function fetchCustomers() {
      const response = await fetch('https://localhost:7115/api/Customer');
      const data = await response.json();
      
      setCustomers(data);
    }

    function addCustomer(customer) {
        setCustomers([...customers, customer]);
        setIsAdding(false);
    }


    useEffect(() => {
        fetchCustomers();
    }, [])


    return (
      <main className="wrapper">
        <div class="action-buttons">
          <button class="green" onClick={() => setIsAdding(true)}>
            + Add
          </button>
        </div>
        {isAdding ? (
          <AddCustomer
            onCancel={() => setIsAdding(false)}
            onAdd={addCustomer}
          />
        ) : null}
        {customers.map((customer) => {
          return (
            <Customer
              key={customer.id}
              data={customer}
              fetchCb={fetchCustomers}
            ></Customer>
          );
        })}
      </main>
    );
}