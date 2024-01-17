import React, { useEffect, useState, Fragment } from 'react';
import Form from "./Components/Form";
import logo from './logo.svg';
import {Observation, Report} from "./Interfaces/interfaces";
import './App.css';




let uri = process.env.REACT_APP_API_URL;

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
    }).then(async (res) =>  {

        setReports(await res.json())
    }
    );

    fetchObs();
    fetchAllReports();
  },
  [])


  const handleSetReport = (r: Report): void =>{
    const newReports = [...reports, r]
    setReports(newReports);  
  }

  const handleDeleteReport = (id : number): void => {
    
    const index = reports.findIndex((report) => report.id === id);

    if(index === -1) {
      console.error("Id of: " + id + " could not be found in the front end business logic");
      // Handle it another way
      return;
    }

    fetch(uri+"/reports/"+ id.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "DELETE",
    }).then(async (res) => {
        const status = await res.status;
        console.log("status: " , status);
        if(status === 200) {

          let newReports = reports.filter((report, i) => {
              console.log("REPORT " , report.id , " vs target ID: " , id)
            return report.id !== id})
          console.log("newReports: " , newReports);

          // newReports = newReports.slice(0 ,index).concat(newReports.slice(index + 1));
          // console.log("new reports: " , newReports);
          setReports(newReports);
        } else {
          console.error("Id of: " + id + " could not be deleted in server");
        }
    })
  }


  return (
    <Fragment>
    <h1 id="title"> Report Page </h1>
    <hr className="separator"/>
    <h3 className="styled-header"> Add Report</h3>


    <Form displayReport={undefined} handleSetReport={handleSetReport} uri={uri} obs={obs}></Form>

    {reports && reports.map((report, i) => {
          {reports && console.log(reports)}

      return (
        <div key={report.id} >
          <hr className="separator"/>
          <h3 className="styled-header"> Report #{i + 1}</h3>
          <Form  handleDeleteReport={handleDeleteReport} displayReport={report} handleSetReport={handleSetReport} uri={uri} obs={obs}></Form> 
      </div>
      )

    })}

   </Fragment>
  );
}

export default App;
