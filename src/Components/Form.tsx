import { useState } from "react";
import { FormProps, ErrorObject, Report, Gender } from "../Interfaces/interfaces";

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

const Form = ({obs, uri, handleSetReport, displayReport}: FormProps) => {


    const [error, setError] = useState<ErrorObject | undefined>(undefined);

    const [newReport, setNewReport] = useState<Report>(
        displayReport ? displayReport : emptyReport
    );
    
    
    const handleChangeNewReport = (key: string, value: any) => {

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

    handleErrorDisplay();

    setNewReport(nR);
    }

    const handleErrorDisplay = (): boolean => {
        // console.log("HERE: " , error);
        // Perform error checking:
        const {firstName, lastName, dateOfBirth, gender,email} = newReport.author;
        // console.log("AUTHOR: " , newReport.author);
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
                        const report = await res.json();
                        handleSetReport(report);
                    } else {
                      const obj = await res.json();
                      console.log("OBJ: " , await obj.author.email[0]);
                      const {email} = await obj.author;
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
                      console.log("OBJ: " , await obj.author.email[0]);
                      const {email} = await obj.author;
                      setError( {...error, email: obj.author.email[0]});
                    }
                  });
            }

        }
    }
    
                        // console.log("new report: " , newReport);

    return (<form onSubmit={(e) => e.preventDefault()}>
    <input onChange={(e) => handleChangeNewReport("firstName" , e.target.value)} type='string' value={newReport.author?.firstName} placeholder="Enter the Author's name"/>
    {error && <div className={"error-message"}>{error.firstName}</div>}
    <input onChange={(e) => handleChangeNewReport("lastName" ,e.target.value)} type='string' value={newReport.author?.lastName} placeholder="Enter the Author's last name"/>
    {error && <div className={"error-message"}>{error.lastName}</div>}

    <input onChange={(e) => handleChangeNewReport("dateOfBirth" , e.target.value)} type='string' value={newReport.author?.dateOfBirth} placeholder="Enter the Author's birthdate (YYYY-MM-DD) :"/>
    {error && <div className={"error-message"}>{error.dateOfBirth}</div>}

    <select onChange={(e) => handleChangeNewReport("gender", e.target.value)}>
      {newReport.author?.gender === undefined && <option value="">Select an option</option> }
      <option selected={newReport.author?.gender === Gender.Male} value={Gender.Male}> {Gender.Male}</option>
      <option selected={newReport.author?.gender === Gender.Female} value={Gender.Female}> {Gender.Female}</option>
      <option selected={newReport.author?.gender === Gender.NonBinary} value={Gender.NonBinary}> {Gender.NonBinary}</option>
    </select>
    {error && <div className={"error-message"}>{error.gender}</div>}

    <input onChange={(e) => handleChangeNewReport("email" , e.target.value)} type='string' value={newReport.author?.email} placeholder="Enter the Author's email:"/>
    {error && <div className={"error-message"}>{error.email}</div>}

    <input onChange={(e) => handleChangeNewReport("productCode" , e.target.value)} type='string' value={newReport.productCode} placeholder="Enter the Product Code:"/>
    {error && <div className={"error-message"}>{error.productCode}</div>}

    {
      obs && obs.map((observation, i) => { 
        return (
          <div key={i}>
          <label> {observation.name} </label>
          <input id={observation.name} key={i} onChange={(e) => handleChangeNewReport("observations", e.target.value)} type="checkbox" value={observation.id}></input>
        </div>
        )
        })
      } 
    <textarea onChange={(e) => handleChangeNewReport("description" ,e.target.value)} value={newReport.description} placeholder="Description"> </textarea>
    <input onChange={(e) => handleChangeNewReport("date" , e.target.value)} type='string' value={newReport.date} placeholder="Enter the Date (YYYY-MM-DD):"/>
    <button onClick={(e) => createReport()}> Submit</button>
  </form>)

}

export default Form;