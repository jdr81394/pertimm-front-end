Pertimm Front-End Report Page

1. Table of Contents:
    2. Description of Functionality
    3. Technical Description and Decision
    4. Best Practices Impleneted
    5. Installation
    6. Usage
    7. Final Words and Technical Recommendations

2. Description of Functionality:
    The purpose of this front-end is to provide a UI with the following functionality:
        1. List all Reports
        2. Create/Update a Report
        3. Delete a Report

3. Technical Description and Decision
    3a. This front-end was built in React.js
        i. React.js is a framework that is powerful, and also very quick to get started with!
        ii. The developer has a deep knowledge of React
    3b. No CSS framework was utilized
        i. No specific UI/UX design was given in the scope. Therefore, the developer determined there was a greater return on investment if his time was put into the functionality, rather than the aesthetic.
        ii. The developer is not very skilled at design.
    3c. Typescript is used.
        i. One word: Types. They're great! ( And they help catch and prevent bugs!! )

4. Best Practices Implemented:
    1. This project utilizes interfaces in order to maintain data typing throughout the project.
    2. Environment information such as the uri is contained in the .env file
    3. Reusability - a robust yet flexible Form component enables the listing, creation, updating and deleting of report(s).
    4. Readability - variables are given clear names if they are important, single letters if they last only within a small scope, and console.logs remain only for error handling and debugging purposes
    5. Prop drilling - This technique is used since the child component is only one level down from the parent. The usage of "Context" or another state management library like "Redux" was unnecessarily heavy so it was not considered.
    6. Function components were used over Class components due to their more performant nature. 



5. Installation:
    5a. Download the code to a local folder
    5b. If not already installed, please install node and npm from https://nodejs.org/en/download
    5c. Navigate to the root directory of this project and run: "npm install"
    5d. Aftewards, run "npm start"

6. Usage:
    5a. List all reports:
        i. Upon page load, if the back-end server is operating, the page should request all the reports and display them on the screen. No user interaction is needed.
    5b. Create a Report:
        i. To create a report, utilize the form located at the top of the page. Fill in all the requested data. 
        ii. If there is not a field that is properly filled in, an error message will be displayed when you click on the submit button. 
        iii. Click the submit button.
    5c. Update a Report:
        i. Navigate to the report you wish to update.
        ii. All the fields are editable, update the fields with the desired values.
        iii. Click the submit button. 

    5d. Delete a Report: ***WARNING*** ***THIS IS PERMANENT***
        i. Navigate to the report you wish to delete.
        ii. Click on the delete button 


7. Final Words and Recommendations:
    There were some features that were not implemented in this project due to it being out of the project's scope. However, if the developer would like to continue to build it out, there are some features that are recommended to be created next. They are:
    6a. Create a check to make sure every value in the form is filled in and no blank values can be sent up
    6b. Create a check to make sure it is a valid email address that is passed in
    6c. Erase the form after a success request has been made to the server and the reports data structure has been updated properly
    6d. Add a date check for the bottom date field as well.
    6e. Add a notification that signals to the user that the request successfully went through on POST
    6f. Add a notification that signals to the user that the request sucecssfully went through on PATCH
  
  