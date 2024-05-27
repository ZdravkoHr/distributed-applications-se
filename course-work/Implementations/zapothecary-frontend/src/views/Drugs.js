import { useState, useEffect } from "react";
import Drug from "../components/Drug";
import AddDrug from '../components/AddDrug';

export default function Customers() {
    const [drugs, setDrugs] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    async function fetchDrugs() {
      const response = await fetch('https://localhost:7115/api/Drug');
      const data = await response.json();
      
      setDrugs(data);
    }

    function addDrug(drug) {
        setDrugs([...drugs, drug]);
        setIsAdding(false);
    }


    useEffect(() => {
        fetchDrugs();
    }, [])


    return (
      <main className="wrapper">
        <div class="action-buttons">
          <button class="green" onClick={() => setIsAdding(true)}>
            + Add
          </button>
        </div>
        {isAdding ? (
          <AddDrug
            onCancel={() => setIsAdding(false)}
            onAdd={addDrug}
          />
        ) : null}
        {drugs.map((drug) => {
          return (
            <Drug
              key={drug.id}
              data={drug}
              fetchCb={fetchDrugs}
            ></Drug>
          );
        })}
      </main>
    );
}