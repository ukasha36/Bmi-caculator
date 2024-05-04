import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {

  const inputref = useRef();
  const inputref1 = useRef();
  const nameref = useRef();

  const [bmiData, Setbmidata] = useState([]);

  const handlesubmit = () => {
    let name = nameref.current.value;
    let height = parseInt(inputref.current.value);
    let heightMeters = height / 100;
    let weight = parseInt(inputref1.current.value);
    let result = weight / (heightMeters * heightMeters);
    let bmi = Math.round(result);

    const newData = { id: Date.now(), name, height, weight, bmi };

    const updatedData = [...bmiData, newData];
    Setbmidata(updatedData);
    localStorage.setItem("bmi", JSON.stringify(updatedData));

    nameref.current.value = "";
    inputref1.current.value = "";
    inputref.current.value = "";
  };


  useEffect(() => {
    const storedData = localStorage.getItem("bmi");
    if (storedData) {
      Setbmidata(JSON.parse(storedData));
    }
  }, []); // Empty dependency array to run only once on mount

  return (
    <>
      <div className="main">
        <h2>BMI Calculator </h2>
        <div className="box">
          <div>
            <label> Enter Name : </label>
            <input type="text" ref={nameref} />
          </div>
          <div>
            <label> Enter height : </label>
            <input type="text" ref={inputref} />
          </div>
          <div>
            <label> Enter weight : </label>
            <input type="text" ref={inputref1} />
          </div>
          <button onClick={handlesubmit}>Add</button>
        </div>
        <div className="bmi">
          {bmiData.map((data) => (
            <ul key={data.id}>
              <li> Name : {data.name}</li>
              <li> Height : {data.height}</li>
              <li> weight : {data.weight}</li>
              <li> BMI : {data.bmi}</li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
