import React, { useEffect, useState, Fragment } from 'react';
import Form from "./Components/Form";
import logo from './logo.svg';
import {Observation, Report} from "./Interfaces/interfaces";
import './App.css';




let uri = process.env.REACT_APP_API_URL;
uri = "http://localhost:3000/api";
console.log("URI: " , uri);

function App() {

  
  const [obs, setObs] = useState<Observation[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchObs = async () => await fetch(uri+"/observations", {
      headers: undefined,
      method: "GET"
    }).then(async (res) => setObs(await res.json() ));

    const fetchAllReports = async () => await fetch(uri+"/reports", {
      headers: undefined,
      method: "GET"
    }).then(async (res) => setReports(await res.json()));

    fetchObs();
    fetchAllReports();
  },
  [])


  const handleSetReport = (r: Report): void =>{
    const newReports = [...reports, r]
    setReports(newReports);  
  }


  return (
    <Fragment>

    <Form displayReport={undefined} handleSetReport={handleSetReport} uri={uri} obs={obs}></Form>

    {reports && reports.map((report, i) => {
      return (
        <div>
          <br></br>
          <br></br>
      <Form key={i} displayReport={report} handleSetReport={handleSetReport} uri={uri} obs={obs}></Form> 
      </div>
      )

    })}

   </Fragment>
  );
}

export default App;
