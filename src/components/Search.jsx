import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    <input
        type="text"
        value={value}
        onChange={onChange}
    />
    <Button type="submit">
      {children}
    </Button>
  </form>

  Search.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    children: PropTypes.node,
  }
  
export default Search;