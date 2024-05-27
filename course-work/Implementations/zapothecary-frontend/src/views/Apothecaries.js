import { useState, useEffect } from "react";
import Apothecary from "../components/Apothecary";
import AddApothecary from '../components/AddApothecary';

export default function Apothecaries() {
    const [apothecaries, setApothecaries] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    async function fetchApothecaries() {
      const response = await fetch('https://localhost:7115/api/Apothecary');
      console.log(response);
      const data = await response.json();
      
      setApothecaries(data);
    }

    function addApothecary(apothecary) {
        setApothecaries([...apothecaries, apothecary]);
        setIsAdding(false);
    }


    useEffect(() => {
        fetchApothecaries();
    }, [])


    return (
      <main className="wrapper">
        <div class="action-buttons">
          <button class="green" onClick={() => setIsAdding(true)}>
            + Add
          </button>
        </div>
        {isAdding ? (
          <AddApothecary
            onCancel={() => setIsAdding(false)}
            onAdd={addApothecary}
          />
        ) : null}
        {apothecaries.map((apothecary) => {
          return (
            <Apothecary
              key={apothecary.id}
              data={apothecary}
              fetchCb={fetchApothecaries}
            ></Apothecary>
          );
        })}
      </main>
    );
}