import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import testdata from './Components/employees.json';


function App() {

const [inputvalue, setInputValue] = useState("")
const EmployeesArray = testdata.Employees
let FilteredEmployeesArray;
const handlefiltering = value => {
  FilteredEmployeesArray = EmployeesArray.filter(Employee => Employee.userId === value)
  return FilteredEmployeesArray
}
useEffect(()=>{handlefiltering(inputvalue)},[inputvalue])

console.log(FilteredEmployeesArray)
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <h1>Table Test</h1>
      {/* </header>] */}
      {/* This is to check that what we are importing from testdata is being rendered before we start mapping it out - make sure we can see it! */}
      {/* <pre>{JSON.stringify(testdata, null, 2)}</pre> */}
     <center>
      <table style={{ width: "100px" }}>
        <tr>
          <th>userId</th>
          <th>jobTitle</th>
          <th>firstName</th>
          <th>lastName</th>
          <th>employeeCode</th>
          <th>region</th>
          <th>phoneNumber</th>
          <th>emailAddress</th>
        </tr>
        <tr><td><input onChange={e => setInputValue(e.target.value)}/></td></tr>
        {FilteredEmployeesArray.map((Employee, index) =>
          <tr key={index}>
            <td>{Employee.userId}</td>
            <td>{Employee.jobTitle}</td>
            <td>{Employee.firstName}</td>
            <td>{Employee.lastName}</td>
            <td>{Employee.employeeCode}</td>
            <td>{Employee.region}</td>
            <td>{Employee.phoneNumber}</td>
            <td>{Employee.emailAddress}</td>
          </tr>)}
      </table>
      </center>

    </div>
  );
}

export default App;