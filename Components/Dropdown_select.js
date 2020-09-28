import React, { Component, Fragment } from 'react';
import Select from 'react-select';

const Checkbox = props => <input type="checkbox" {...props} />;

const colourOptions = [
    { value: 'userId', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  
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

export default class MultiSelect extends Component {
  state = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: true,
  };


  toggleClearable = () =>
    this.setState(state => ({ isClearable: !state.isClearable }));
  toggleDisabled = () =>
    this.setState(state => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState(state => ({ isLoading: !state.isLoading }));
  toggleRtl = () => this.setState(state => ({ isRtl: !state.isRtl }));
  toggleSearchable = () =>
    this.setState(state => ({ isSearchable: !state.isSearchable }));
  render() {
    const {
      isClearable,
      isSearchable,
      isDisabled,
      isLoading,
      isRtl,
    } = this.state;

    return (
      <Fragment>
        <Select
         styles={customStyles}
         width='110px'
         menuColor='red'
        //  defaultValue={Strawberry}
         isMulti
        //  name="colors"
         options={colourOptions}
         className="basic-multi-select"
        //  classNamePrefix= ""
        />
      </Fragment>
    );
  }
}