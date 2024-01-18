import { useState, Fragment, useEffect } from "react";
import { FormProps, ErrorObject, Report, Gender } from "../Interfaces/interfaces";

/*
  Recommendations (Front End):

  Recommendations (Back End):
  1. Check the date to make sure there is no NAN errors.
  2. Create business logic that would update the email if the user updated their email
  
  */

const emptyReport: Report = {
    id: undefined,
    author: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: undefined, // Assuming 'Male' is a default value for gender
      email: '',
    },
    productCode: '',
    observations: [],
    description: '',
    date: '',
};

const Form = ({obs, uri, handleSetReport, displayReport, handleDeleteReport}: FormProps) => {


    const [error, setError] = useState<ErrorObject | undefined>(undefined);

    const [newReport, setNewReport] = useState<Report>(
        displayReport ? displayReport : emptyReport
    );
    
    
    const handleChangeNewReport = (key: string, value: any) => {

      // Reset email error
      setError({...error, email: undefined});

      const nR : Report = {...newReport};

      if(key === "firstName" || key === "lastName" || key  === "dateOfBirth" || key === "gender" || key === "email") {

        nR.author[key] = value;
      } else {
        if(key === "observations") {
          // Check if observation is inside the array
          let newObs = newReport.observations as number[];  // coerce to make it explicit for build

          const index = newObs.findIndex((ob) => ob == value); // does implicit conversion since it can be a string
          // it exists, remove it
          if(index !== -1) {
              newObs = newObs.slice(0, index).concat(newObs.slice(index + 1));
          }  else {
              const id = value * 1; // convert to number
              newObs.push(id as number);
          }
          
            nR[key] = newObs;
          } else {
            nR[key] = value;
          }

        }

      setNewReport(nR);
      }

    const handleErrorDisplay = (): boolean => {
        // Perform error checking:
        const {firstName, lastName, dateOfBirth, gender,email} = newReport.author;
        const {productCode, observations, description, date } = newReport;
    
        const newErrorObject = {...error};
    
        if(firstName.length > 50) {
          setError({...newErrorObject, firstName: "The first name field is greater than 50 characters"});
          return false;
        } else {
          delete newErrorObject.firstName;
          setError({...newErrorObject});
        }
    
        if(lastName.length > 50) {
          setError({...newErrorObject, lastName: "The last name field is greater than 50 characters"});
          return false;
        } else {
          delete newErrorObject.lastName;
          setError({...newErrorObject});
        }
    
        const birthday = new Date(dateOfBirth);  // Determine how many years the date of birth is from today
        const currentDate = new Date();     // Get the current date
        const ageInYears = currentDate.getFullYear() - birthday.getFullYear(); // Calculate the difference in years
     
        
        if(ageInYears > 100 ) {    
            setError({...newErrorObject, dateOfBirth: "The Date of Birth is greater than 100 years."});
            return false;
        } else {
          delete newErrorObject.dateOfBirth;
          setError({...newErrorObject});
        }
    
        if(gender !== undefined) {
          const g = gender.toLowerCase();
          if (!(g === "male" || g === "female" || g === "non-binary")) {    // tested 
            setError({...newErrorObject, gender: "Please select one of the given genders."});
            return false;
          } else {
            delete newErrorObject.gender;
            setError({...newErrorObject});
      
          }
        } else {
          setError({...newErrorObject, gender: "Please select one of the given genders."});
        }
    
    
        if(productCode.length < 10 || productCode.length > 13) {
          setError({...newErrorObject, productCode: "Please enter a correct product code. "});
          return false;
        }else {        
          delete newErrorObject.productCode
          setError({...newErrorObject});
        }
        
    
    
    
    
        return true;
    
    }

    const createReport = () => {
        if(handleErrorDisplay()) {
            // If its a PUT
            if(displayReport) {
                fetch(uri+"/reports", {
                    headers: {
                        'Content-Type': 'application/json',
                      },
                      method: "PATCH",
                      body: JSON.stringify(newReport)
                }).then( async (res) => {
                    const status = await res.status;

                    if(status === 200) {
                       // State is already synchronized at this point, can do perhaps something else
                       // if desired later.
                    } else {
                      const obj = await res.json();
                      setError( {...error, email: obj.author.email[0]});
                    }

                })
            }
            // Create new entry
            else {

                fetch(uri+"/reports", {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    method: "POST",
                    body: JSON.stringify(newReport)
                  }).then(async (res) => { 
                    const status = await res.status;
                    if(status === 200) {
                        const report = await res.json();
                        handleSetReport(report); 
                    } else {
                      const obj = await res.json();
                      setError( {...error, email: obj.author.email[0]});
                    }
                  });
            }

        }
    }
    

    return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="author-details">
          <input onChange={(e) => handleChangeNewReport("firstName" , e.target.value)} type='string' value={newReport.author?.firstName} placeholder="Enter the Author's name"/>
         
          <input onChange={(e) => handleChangeNewReport("lastName" ,e.target.value)} type='string' value={newReport.author?.lastName} placeholder="Enter the Author's last name"/>
          

          {error ? <div className={"error-message"}>{error.firstName}</div> : <div></div>}
          {error ? <div className={"error-message"}>{error.lastName}</div>: <div></div>}
          <input onChange={(e) => handleChangeNewReport("dateOfBirth" , e.target.value)} type='string' value={newReport.author?.dateOfBirth} placeholder="Enter the Author's birthdate (YYYY-MM-DD) :"/>


          <select onChange={(e) => handleChangeNewReport("gender", e.target.value)}>
            {newReport.author?.gender === undefined && <option value="">Select an option</option> }
            <option selected={newReport.author?.gender === Gender.Male} value={Gender.Male}> {Gender.Male}</option>
            <option selected={newReport.author?.gender === Gender.Female} value={Gender.Female}> {Gender.Female}</option>
            <option selected={newReport.author?.gender === Gender.NonBinary} value={Gender.NonBinary}> {Gender.NonBinary}</option>
          </select>
          {error ? <div className={"error-message"}>{error.dateOfBirth}</div>: <div></div>}
          {error ? <div className={"error-message"}>{error.gender}</div> : <div></div>}

          <input onChange={(e) => handleChangeNewReport("email" , e.target.value)} type='string' value={newReport.author?.email} placeholder="Enter the Author's email"/>
          <input onChange={(e) => handleChangeNewReport("productCode" , e.target.value)} type='string' value={newReport.productCode} placeholder="Enter the Product Code"/>
          
          {error ? <div className={"error-message"}>{error.email}</div> : <div></div>}
          {error ? <div className={"error-message"}>{error.productCode}</div> : <div></div>}
      </div>

      <div className="observations">
      {
        obs && obs.map((observation, i) => { 
      
          return (
            <Fragment key={i}>
            <label> {observation.name} </label>
            <input checked={newReport.observations.findIndex((ob) => ob === observation.id) !== -1 ? true : false} id={observation.name} key={i} onChange={(e) => handleChangeNewReport("observations", e.target.value)} type="checkbox" value={observation.id}></input>
            </Fragment>
          )
          })
        }
      </div> 
      <div className="description-date">
        <textarea onChange={(e) => handleChangeNewReport("description" ,e.target.value)} value={newReport.description} placeholder="Description"> </textarea>
        {/* Recommendation, do ceheck on this date field as well */}
        <input onChange={(e) => handleChangeNewReport("date" , e.target.value)} type='string' value={newReport.date} placeholder="Enter the Date (YYYY-MM-DD):"/> 
      </div>

      <button className="submit-button" onClick={(e) => createReport()}> Submit</button>
      {displayReport && <button className="submit-button" onClick={(e)=> handleDeleteReport(newReport.id)}> Delete</button>}
  </form>)

}

export default Form;