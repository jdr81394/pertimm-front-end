Pertimm Front-End Report Page

1. Table of Contents:&nbsp;
    1. Description of Functionality
    2. Technical Description and Decision
    3. Best Practices Impleneted
    4. Installation
    5. Usage
    6. Final Words and Technical Recommendations

2. Description of Functionality:&nbsp;
    The purpose of this front-end is to provide a UI with the following functionality:
    1. List all Reports
    2. Create/Update a Report
    3. Delete a Report

3. Technical Description and Decision:&nbsp;
    1. This front-end was built in React.js
        1. React.js is a framework that is powerful, and also very quick to get started with!
        2. The developer has a deep knowledge of React
    2. No CSS framework was utilized
        1. No specific UI/UX design was given in the scope. Therefore, the developer determined there was a greater return on investment if his time was put into the functionality, rather than the aesthetic.
        2. The developer is not very skilled at design.
    3. Typescript is used.
        1. One word: Types. They're great! ( And they help catch and prevent bugs!! )

4. Best Practices Implemented:&nbsp;
    1. This project utilizes interfaces in order to maintain data typing throughout the project.
    2. Environment information such as the uri is contained in the .env file
    3. Reusability - a robust yet flexible Form component enables the listing, creation, updating and deleting of report(s).
    4. Readability - variables are given clear names if they are important, single letters if they last only within a small scope, and console.logs remain only for error handling and debugging purposes
    5. Prop drilling - This technique is used since the child component is only one level down from the parent. The usage of "Context" or another state management library like "Redux" was unnecessarily heavy so it was not considered.
    6. Function components were used over Class components due to their more performant nature. 

5. Installation:&nbsp;
    1. Download the code to a local folder
    2. If not already installed, please install node and npm from https://nodejs.org/en/download
    3. Navigate to the root directory of this project and run: "npm install"
    4. Aftewards, run "npm start"

6. Usage:&nbsp;
    1. List all reports:
        1. Upon page load, if the back-end server is operating, the page should request all the reports and display them on the screen. No user interaction is needed.
    2. Create a Report:
        2. To create a report, utilize the form located at the top of the page. Fill in all the requested data. 
        3. If there is not a field that is properly filled in, an error message will be displayed when you click on the submit button. 
        4. Click the submit button.
    3. Update a Report:
        1. Navigate to the report you wish to update.
        2. All the fields are editable, update the fields with the desired values.
        3. Click the submit button. 
    4. Delete a Report: ***WARNING*** ***THIS IS PERMANENT***
        1. Navigate to the report you wish to delete.
        2. Click on the delete button

7. Final Words and Recommendations:&nbsp;
    There were some features that were not implemented in this project due to it being out of the project's scope. However, if the developer would like to continue to build it out, there are some features that are recommended to be created next. They are:&nbsp;
    1. Create a check to make sure every value in the form is filled in and no blank values can be sent up
    2. Create a check to make sure it is a valid email address that is passed in
    3. Erase the form after a success request has been made to the server and the reports data structure has been updated properly
    4. Add a date check for the bottom date field as well.
    5. Add a notification that signals to the user that the request successfully went through on POST
    6. Add a notification that signals to the user that the request sucecssfully went through on PATCH

    