import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import testdata from "./Components/employees.json";
import MyComponent from './Form';
import MultiSelect from "./Components/Dropdown_select";
import Select from 'react-select';

function App() {
  // Initialise a filtered array. The previous method of just initialising the empty array
  // is right. But assignment becomes a bit hard inside the useEffect hook. So to avoid that
  // setFilteredArray is a much cleaner approach
  const [filteredArray, setFilteredArray] = useState([]);
  // Assigning a input variable to save the value of the search item. Also initialising using
  // use state for the same reasons as above but this doesn't need to be re-assigned. Just has to be
  // set once it changes and pass around
  const [inputValue, setInputValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const employeesArray = testdata.Employees;
  // useCallback will return a memoized version of the callback that only changes if one of the
  // dependency inputs has changed.
  const setFilterLastName = useCallback(
    (val) => employeesArray.filter((employee) => employee.userId.includes(val)), // exact match is replaced. You can replace this with the === and see the changes
    [employeesArray] // ----> dependency inputs
  );

  const setFilterFirstName = useCallback(
    (val) => employeesArray.filter((employee) => employee.firstName.includes(val)), // exact match is replaced. You can replace this with the === and see the changes
    [employeesArray] // ----> dependency inputs
  );

  // const setFilterLastName = useCallback(
  //   (val) => employeesArray.filter((employee) => employee.lastName.includes(val)), // exact match is replaced. You can replace this with the === and see the changes
  //   [employeesArray] // ----> dependency inputs
  // );

  // This method is managing the text change
  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleFirstNameInputChange = (e) => { console.log(e); setFirstNameValue(e.target.value) };
  useEffect(() => {
    // Checking if the string for search exists
    // If yes, we search and show the values from response.
    // If not, we re assign the old employees array to the filtered array
    if (inputValue.length > 0) {
      const filArray = setFilterLastName(inputValue);
      setFilteredArray(filArray);
    } else {
      setFilteredArray(employeesArray);
    }
  }, [inputValue, employeesArray, setFilterLastName]);

  useEffect(() => {
    if (firstNameValue.length > 0) {
      const filArray = setFilterFirstName(firstNameValue);
      setFilteredArray(filArray);
    } else {
      setFilteredArray(employeesArray);
    }
  }, [firstNameValue, employeesArray, setFilterFirstName]);// ----> dependencies, if any of the dependencies change, the method will re run

  return (
    <div className="App">
      <h1>Table Test</h1>
      {/* <MultiSelect  options = 
                  {filteredArray.map((employee, index) => {return {label: employee.firstName , value: employee.firstName }})}/> */}

      <center>
        <table style={{ width: "100px" }}>
          <thead>
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
          </thead>
          <tbody>
            <tr>
              <td >

                <Select style={{ width: "100px" }} options=
                  {filteredArray.map((employee, index) => { return { label: employee.userId, value: employee.userId } })}
                />
              </td>
              <td>
                {/* <Select style={{width:"100px"}}  options = 
                  {filteredArray.map((employee, index) => {return {label: employee.firstName , value: employee.firstName }})}/> */}
              </td>
              <td>
                <Select onChange={handleFirstNameInputChange} options=
                  {filteredArray.map((employee, index) => { return { label: employee.firstName, value: employee.firstName } })} />

              </td>
              <td>
                {/* <Select style={{width:"100px"}}  options = 
                  {filteredArray.map((employee, index) => {return {label: employee.lastName , value: employee.lastName }})}/> */}
              </td>
              <td>
                <Select
                  options=
                  {filteredArray.map((employee, index) => { return { label: employee.firstName, value: employee.firstName } })}
                />
              </td>
              <td>
                <input onChange={handleInputChange} />
              </td>
              <td>
                <input onChange={handleInputChange} />
              </td>
              <td>
                <input onChange={handleInputChange} />
              </td>
            </tr>
            {filteredArray.map((employee, index) => (
              <tr key={index}>
                <td>{employee.userId}</td>
                <td>{employee.jobTitle}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.employeeCode}</td>
                <td>{employee.region}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.emailAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <MultiSelect />
      </center>
    </div>
  );
}
export default App;