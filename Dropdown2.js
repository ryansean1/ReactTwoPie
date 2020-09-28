import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import testdata from "./Components/employees.json";
import Select from "react-select";
export default function App() {
    
    const isClearable = {
        isClearable: false
      };



    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: '1px solid purple',
            color: state.isSelected ? 'red' : 'purple',
            padding: 3,
            width: 100
        }),
        menu: (provided, state) => ({
            ...provided,
            width: state.selectProps.width,
            // borderBottom: '1px dotted pink',
            color: state.selectProps.menuColor,
            padding: 1,

        }),
        control: () => ({
            // none of react-select's styles are passed to <Control />
            width: 100,
        }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 100ms';

            return { ...provided, opacity, transition };
        }
    }

    const [filteredArray, setFilteredArray] = useState([]);
    const [userIDValue, setUserIDValue] = useState("");
    const [firstNameValue, setFirstNameValue] = useState("");
    const employeesArray = testdata.Employees;
    const value1 = ""

    const getEmployeesWithName = useCallback(
        (val) => employeesArray.filter((employee) => employee.userId.includes(val)), // exact match is replaced. You can replace this with the === and see the changes
        [employeesArray] // ----> dependency inputs
    );

    const setFilterFirstName = useCallback(
        (val) => employeesArray.filter((employee) => employee.firstName.includes(val)), // exact match is replaced. You can replace this with the === and see the changes
        [employeesArray] // ----> dependency inputs
    );

    const handleUserIDInputChange = (e) => { console.log(e); setUserIDValue(e ? e.value : '')};
    useEffect(() => { console.log(userIDValue);
        if (userIDValue.length > 0) {
            const filArray = getEmployeesWithName(userIDValue);
            setFilteredArray(filArray);
        }
         else {
            setFilteredArray(employeesArray);
        }
    }, [userIDValue, employeesArray, getEmployeesWithName]); // ----> dependencies, if any of the dependencies change, the method will re run

    const handleFirstNameInputChange = (e) => { console.log(e); setFirstNameValue(e ? e.value : '')};
    useEffect(() => {
        if (firstNameValue.length > 0) {
            const filArray = setFilterFirstName(firstNameValue);
            setFilteredArray(filArray);
        }
        else {
            setFilteredArray(employeesArray);
        }
    }
        , [firstNameValue, employeesArray, setFilterFirstName]);


      
        
    return (
        <div className="App">
            <h1>Table Test</h1>
            <Select
                styles={customStyles}
                width='110px'
                menuColor='red'
                name="UserID"
                isClearable={isClearable}
                isMulti

                className="basic-multi-select"
                onChange={handleUserIDInputChange}
                options={filteredArray.map((employee, index) => {
                    return { label: employee.userId, value: employee.userId };
                })} />
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
                            <td>
                                {/* <Select
                                    onChange={handleInputChange}
                                    options={filteredArray.map((employee, index) => {
                                        return { label: employee.userId, value: employee.userId };
                                    })}
                                /> */}
                            </td>
                            <td>
                                <input onChange={handleFirstNameInputChange}

                                />
                            </td>
                            <td>
                                <Select onChange={handleFirstNameInputChange}
                                isClearable={isClearable}
                                    options={filteredArray.map((employee, index) => {
                                        return { label: employee.firstName, value: employee.firstName };
                                    })}
                                />
                            </td>
                            {/* <td>
                                <input onChange={handleFirstNameInputChange} />
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
                            <td>
                                <input onChange={handleInputChange} />
                            </td> */}
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
                {/* <Drop /> */}
            </center>
        </div>
    );
}