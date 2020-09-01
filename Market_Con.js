import React, { useEffect, useState, useCallback } from 'react';
import '../../App.css';
// import Select from 'react-select';
import testdata from '../Data/market_con.json';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
export default function Market_Con() {
  const isClearable = {
    isClearable: false,
  };
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid purple',
      color: state.isSelected ? 'red' : 'purple',
      padding: 2,
      width: 100,
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
    },
  };
  const [filteredArray, setFilteredArray] = useState([]);
  const [stateCdValue, setStateCdValue] = useState([]);
  // const [firstNameValue, setFirstNameValue] = useState([]);
  const marketArray = testdata.MarketConcentration;
  // const [lastNames, setLastNames] = useState([]);
  // const getEmployeesWithName = useCallback(
  //         (val) => marketArray.filter((employee) => employee.userId.includes([]), // exact match is replaced. You can replace this with the === and see the changes
  //     [marketArray] // ----> dependency inputs
  // );
  const setFilterStateCd = useCallback(
    stateCdValue =>
      stateCdValue.map(({ value }) => marketArray.find(market => market.StateCd === value)),
    [marketArray],
  );
  // const setFilterFirstName = useCallback(
  //   val => marketArray.filter(employee => employee.firstName.includes(val)), // exact match is replaced. You can replace this with the === and see the changes
  //   [marketArray], // ----> dependency inputs
  // );
  const handleStateCdInputChange = e => {
    setStateCdValue(e ? e : []);
  };
  // if (e) is selected return e and if nothing is selected return the empty aray
  useEffect(() => {
    console.log(stateCdValue);
    if (stateCdValue.length > 0) {
      const filArray = setFilterStateCd(stateCdValue);
      console.log(filArray);
      setFilteredArray(filArray);
    } else {
      setFilteredArray(marketArray);
    }
  }, [stateCdValue, marketArray, setFilterStateCd]); // ----> dependencies, if any of the dependencies change, the method will re run

  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const classes = withStyles();

  // const handleFirstNameInputChange = e => {
  //   console.log(e);
  //   setFirstNameValue(e ? e.value : '');
  // };
  // const handleLastNameChange = lastNameArr => setLastNames(lastNameArr || []);
  // useEffect(() => {
  //   if (lastNames.length > 0) {
  //     const filteredArray = lastNames.map(lastName =>
  //       marketArray.find(employee => employee.lastName === lastName.value),
  //     );
  //     setFilteredArray(filteredArray);
  //   } else {
  //     setFilteredArray(marketArray);
  //   }
  // }, [lastNames, marketArray, setLastNames]);
  // useEffect(() => {
  //   if (firstNameValue.length > 0) {
  //     const filArray = setFilterFirstName(firstNameValue);
  //     setFilteredArray(filArray);
  //   } else {
  //     setFilteredArray(marketArray);
  //   }
  // }, [firstNameValue, marketArray, setFilterFirstName]);

  const lastNameOptions = marketArray.map(market => {
    return {
      label: market.StateCd,
      value: market.StateCd,
    };
  });

  // uniqueOptions = (marketArray, objectKey) => {
  //   var a = marketArray.map((o, i) => {
  //     return o[marketArray];
  //   });
  //   return a.filter(function (i, index) {
  //     return a.indexOf(i) >= index;
  //   });
  // };

  return (
    <div className="App">
      <h1>Market Concentration</h1>
      {/* <Select */}
      className={classes.row}
      styles={customStyles}
      width="120px" menuColor="red" name="StateCd" isClearable={isClearable}
      closeMenuOnSelect={false}
      isMulti={true}
      className="basic-multi-select" onChange={handleStateCdInputChange}
      options=
      {marketArray.map((market, index) => {
        return { label: market.StateCd, value: market.StateCd };
      })}
      />
      <center>
        <Table stickyHeader id="header-fixed" style={{ width: '110px' }}>
          <Paper variant="outlined" elevation={2} style={{ maxHeight: 600, overflow: 'auto' }}>
            {/* <Table stickyHeader style={{ backgroundColor: 'white' }}> */}
            <TableHead style={{ color: 'purple' }}>
              <thead>
                <tr>
                  <th>RprtDt</th>
                  <th>StateCd</th>
                  <th>SrvcDstrctNm</th>
                  <th>SuppClass</th>
                  <th>PymntShareOfTop10</th>
                  <th>PymntBnd</th>
                  <th>PrvdrCnt</th>
                  <th>PrtcpntCnt</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {/* <Select
                  onChange={handleRprtDtInputChange}
                  options={filteredArray.map((market, index) => {
                    return { label: market.rprtDt, value: market.rprtDt };
                  })} */}
                    {/* /> */}
                  </td>
                  <td>{/* <input onChange={handleFirstNameInputChange} /> */}</td>
                  <td>
                    {/* <Select
                  onChange={handleFirstNameInputChange}
                  isClearable={isClearable}
                  isMulti={true}
                  options={filteredArray.map((employee, index) => {
                    return {
                      label: employee.firstName,
                      value: employee.firstName,
                    };
                  })}
                /> */}
                  </td>
                  <td>
                    {/* <Select
                  onChange={handleLastNameChange}
                  isClearable={isClearable}
                  isMulti={true}
                  options={lastNameOptions}
                /> */}
                  </td>
                </tr>
                {filteredArray.map((market, index) => (
                  <tr key={index}>
                    <td>{market.RprtDt}</td>
                    <td>{market.StateCd}</td>
                    <td>{market.SrvcDstrctNm}</td>
                    <td>{market.SuppClass}</td>
                    <td>{market.PymntShareOfTop10}</td>
                    <td>{market.PymntBnd}</td>
                    <td>{market.PrvdrCnt}</td>
                    <td>{market.PrtcpntCnt}</td>
                  </tr>
                ))}
              </tbody>
            </TableHead>
            {/* </Table> */}
          </Paper>
        </Table>
      </center>
    </div>
  );
}
