import React from 'react';
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

export default Search;